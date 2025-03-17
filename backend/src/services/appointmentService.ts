import prisma from "../prisma";
import { Status } from "@prisma/client";
import { AppError } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";
import crypto from "node:crypto";
import { sendNotification } from "./notificationService";
import { ENV } from "../config/env";

// 📌 Vérification et récupération de l'email de l'opticien depuis .env
const OPTICIAN_EMAIL =
	ENV.OPTICIAN_EMAIL ??
	(() => {
		throw new Error(
			"OPTICIAN_EMAIL is not defined in the environment variables.",
		);
	})();

/**
 * 🔹 Vérifie si un rendez-vous existe
 */
export const getAppointmentById = async (id: number) => {
	logger.info(`🔍 Recherche du rendez-vous ID: ${id}`);
	const appointment = await prisma.appointment.findUnique({
		where: { id },
		include: { client: true },
	});

	if (!appointment) {
		logger.warn(`❌ Rendez-vous non trouvé ID: ${id}`);
		throw new AppError("Rendez-vous non trouvé.", 404);
	}

	return appointment;
};

/**
 * 🔹 Récupère tous les rendez-vous confirmés avec des filtres optionnels
 */
export const getAppointments = async (
	filters: { status?: string; startDate?: string; endDate?: string } = {},
) => {
	logger.info("📅 Récupération des rendez-vous confirmés avec filtres");

	return await prisma.appointment.findMany({
		where: {
			status: "confirmed",
			appointment_date: {
				gte: filters.startDate ? new Date(filters.startDate) : undefined,
				lte: filters.endDate ? new Date(filters.endDate) : undefined,
			},
		},
		orderBy: { appointment_date: "asc" },
	});
};

/**
 * 🔹 Crée un rendez-vous
 */
export const createAppointment = async (data: {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	appointment_date: string;
	preferred_notification: "email" | "sms" | "both";
	isOptician?: boolean;
}) => {
	logger.info("📅 Vérification du client avant création du rendez-vous...");

	// 🔍 Vérifier si un client existe déjà
	let client = await prisma.client.findFirst({
		where: {
			OR: [{ email: data.email }, { phone: data.phone }],
		},
	});

	// 🔹 Si le client n'existe pas, on le crée
	if (!client) {
		logger.info(
			`🆕 Création d'un nouveau client : ${data.first_name} ${data.last_name}`,
		);
		client = await prisma.client.create({
			data: {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				phone: data.phone,
			},
		});
	} else {
		logger.info(
			`✅ Client existant trouvé : ${client.first_name} ${client.last_name}`,
		);
	}

	// 🔍 Vérifier si le client a déjà un rendez-vous à la même date/heure
	const existingAppointment = await prisma.appointment.findFirst({
		where: {
			client_id: client.id,
			appointment_date: new Date(data.appointment_date),
		},
	});

	if (existingAppointment) {
		throw new AppError(
			"Vous avez déjà un rendez-vous à cette date et heure.",
			400,
		);
	}

	// 🔑 Génération du token d'annulation
	const cancellation_token = crypto.randomBytes(32).toString("hex");
	logger.info(`🔑 Token d'annulation généré: ${cancellation_token}`);

	// ✅ Définition du statut selon le créateur du RDV
	const status = data.isOptician ? "confirmed" : "pending";

	const appointment = await prisma.appointment.create({
		data: {
			client_id: client.id,
			appointment_date: new Date(data.appointment_date),
			preferred_notification: data.preferred_notification,
			cancellation_token,
			status,
		},
	});

	// 📩 Envoyer la notification à l'opticien si RDV créé par un client
	if (!data.isOptician) {
		await sendNotification(
			"appointment_created_by_client",
			client,
			OPTICIAN_EMAIL,
			{
				...appointment,
				optician_notes: appointment.optician_notes ?? undefined,
			},
			data.preferred_notification,
		);
	}

	logger.info(
		`✅ Rendez-vous créé avec succès, ID: ${appointment.id}, Status: ${status}`,
	);
	return appointment;
};

/**
 * 🔹 Met à jour un rendez-vous existant (notification au client)
 */
export const updateAppointment = async (
	id: number,
	data: Partial<{
		appointment_date: string;
		preferred_notification: "email" | "sms" | "both";
		optician_notes?: string;
	}>,
) => {
	logger.info(`🛠 Mise à jour du rendez-vous ID: ${id}`);

	const appointment = await getAppointmentById(id);

	const updatedAppointment = await prisma.appointment.update({
		where: { id },
		data,
	});

	// 📩 Notifier le client que son rendez-vous a été modifié
	await sendNotification(
		"appointment_modified",
		appointment.client,
		OPTICIAN_EMAIL,
		{
			...updatedAppointment,
			optician_notes: updatedAppointment.optician_notes ?? undefined,
		},
		appointment.preferred_notification,
	);

	logger.info(`✅ Rendez-vous mis à jour ID: ${id}`);
	return updatedAppointment;
};

/**
 * 🔹 Annulation d'un rendez-vous via un token sécurisé (notification à l'opticien)
 */
export const cancelAppointmentWithToken = async (cancellationToken: string) => {
	logger.info(
		`🔹 Annulation du rendez-vous avec le token: ${cancellationToken}`,
	);

	const appointment = await prisma.appointment.findUnique({
		where: { cancellation_token: cancellationToken },
		include: { client: true },
	});

	if (!appointment) {
		throw new AppError("Aucun rendez-vous trouvé avec ce token.", 404);
	}

	const updatedAppointment = await prisma.appointment.update({
		where: { id: appointment.id },
		data: { status: "cancelled" },
	});

	// 📩 Notifier l'opticien de l'annulation
	await sendNotification(
		"appointment_cancelled_by_client",
		appointment.client,
		OPTICIAN_EMAIL,
		{
			...updatedAppointment,
			optician_notes: updatedAppointment.optician_notes ?? undefined,
		},
		appointment.preferred_notification,
	);

	logger.info(`✅ Rendez-vous ID ${appointment.id} annulé par le client.`);
	return updatedAppointment;
};

/**
 * 🔹 Supprime un rendez-vous (aucune notification nécessaire)
 */
export const deleteAppointment = async (id: number) => {
	logger.info(`🗑 Suppression du rendez-vous ID: ${id}`);

	await getAppointmentById(id);

	await prisma.appointment.delete({
		where: { id },
	});

	logger.info(`✅ Rendez-vous supprimé ID: ${id}`);
	return { message: "Rendez-vous supprimé avec succès." };
};

/**
 * 🔹 Accepte un rendez-vous (notification au client)
 */
export const acceptAppointment = async (id: number) => {
	logger.info(`✅ Acceptation du rendez-vous ID: ${id}`);

	const appointment = await getAppointmentById(id);

	const updatedAppointment = await prisma.appointment.update({
		where: { id },
		data: { status: Status.confirmed },
	});

	await sendNotification(
		"appointment_accepted",
		appointment.client,
		OPTICIAN_EMAIL,
		{
			...updatedAppointment,
			optician_notes: updatedAppointment.optician_notes ?? undefined,
		},
		appointment.preferred_notification,
	);

	logger.info(`📅 Rendez-vous accepté ID: ${id}`);
	return updatedAppointment;
};

/**
 * 🔹 Rejette un rendez-vous (notification au client et suppression)
 */
export const rejectAppointment = async (appointmentId: number) => {
	logger.info(`🔹 Refus du rendez-vous ID ${appointmentId}`);

	const appointment = await prisma.appointment.findUnique({
		where: { id: appointmentId },
		include: { client: true },
	});

	if (!appointment) {
		throw new AppError("Rendez-vous introuvable.", 404);
	}

	// 📩 Notifier le client du refus avant suppression
	await sendNotification(
		"appointment_rejected",
		appointment.client,
		OPTICIAN_EMAIL,
		{ ...appointment, optician_notes: appointment.optician_notes ?? undefined },
		appointment.preferred_notification,
	);

	// 🚨 Suppression du rendez-vous
	await prisma.appointment.delete({
		where: { id: appointment.id },
	});

	logger.info(`❌ Rendez-vous ID ${appointmentId} refusé et supprimé.`);
	return { message: "Rendez-vous refusé et supprimé." };
};

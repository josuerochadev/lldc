import prisma from "../prisma";
import { Status } from "@prisma/client";
import { AppError } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
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

	// 🔑 Génération du token brut et hashé
	const rawToken = crypto.randomBytes(16).toString("base64url"); // Choisir l'option souhaitée
	const hashedToken = await bcrypt.hash(rawToken, 10);
	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 72); // Expire dans 72h

	// ✅ Définition du statut selon le créateur du RDV
	const status = data.isOptician ? "confirmed" : "pending";

	// 📌 Création du rendez-vous en BDD
	const appointment = await prisma.appointment.create({
		data: {
			client_id: client.id,
			appointment_date: new Date(data.appointment_date),
			preferred_notification: data.preferred_notification,
			cancellation_token: hashedToken, // Stocker le token HASHÉ en BDD
			cancellation_token_expiry: expiration,
			status,
		},
	});

	// 🔍 Afficher le token brut dans la console pour les tests
	console.log(
		`🔑 Token d'annulation brut pour le RDV ID ${appointment.id}: ${rawToken}`,
	);

	// 📩 Envoyer `rawToken` au client (ne pas stocker en clair)
	await sendNotification(
		"appointment_created_by_client",
		client,
		OPTICIAN_EMAIL,
		{
			...appointment,
			...(rawToken ? { cancellation_token: rawToken } : {}), // Envoyer la version non hashée
			optician_notes: appointment.optician_notes ?? undefined,
		},
		data.preferred_notification,
	);

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
		status?: Status; // 🔹 Utiliser `Status` au lieu de `string`
	}>,
) => {
	logger.info(`🛠 Mise à jour du rendez-vous ID: ${id}`);

	// 🔍 Récupérer le rendez-vous actuel
	const appointment = await getAppointmentById(id);

	// 🔒 Vérifier si le statut demandé est valide
	if (data.status) {
		const validTransitions: Record<Status, Status[]> = {
			pending: ["confirmed", "cancelled"],
			confirmed: ["cancelled"],
			cancelled: [],
		};

		if (!validTransitions[appointment.status].includes(data.status)) {
			throw new AppError(
				`Transition de statut invalide: ${appointment.status} → ${data.status}`,
				400,
			);
		}
	}

	// 🔄 Mise à jour du rendez-vous
	const updatedAppointment = await prisma.appointment.update({
		where: { id },
		data: {
			...data,
			status: data.status ? (data.status as Status) : undefined, // 🔹 Conversion explicite
		},
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
export const cancelAppointmentWithToken = async (receivedToken: string) => {
	logger.info(`🔹 Annulation du rendez-vous avec le token: ${receivedToken}`);

	// Recherche des RDV avec un token valide et non expiré
	const appointments = await prisma.appointment.findMany({
		where: {
			cancellation_token_expiry: { gte: new Date() }, // Seuls les RDV non expirés
			cancellation_token: { not: null }, // Assurer que le token est bien présent
		},
		include: { client: true }, // Inclure les infos du client pour la notification
	});

	// 🔍 Recherche du RDV correspondant au token
	let appointment = null;
	for (const a of appointments) {
		if (!a.cancellation_token) continue; // Ignorer si le token est null

		const isMatch = await bcrypt.compare(receivedToken, a.cancellation_token);
		logger.info(
			`Comparaison token pour RDV ID ${a.id}: ${isMatch ? "✅ Match trouvé" : "❌ Aucun match"}`,
		);

		if (isMatch) {
			appointment = a;
			break;
		}
	}

	// Si aucun RDV correspondant, lever une erreur
	if (!appointment) {
		throw new AppError("Token invalide ou expiré.", 403);
	}

	// Mise à jour du statut du RDV en "cancelled"
	const updatedAppointment = await prisma.appointment.update({
		where: { id: appointment.id },
		data: { status: "cancelled" },
	});

	// 📩 Vérifier que `appointment.client` est bien défini avant d'envoyer la notification
	if (!appointment.client) {
		throw new AppError(
			"Impossible de notifier le client, données manquantes.",
			500,
		);
	}

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
export const deleteAppointment = async (id: number, userRole: string) => {
	logger.info(`🗑 Suppression du rendez-vous ID: ${id}`);

	const appointment = await getAppointmentById(id);

	if (appointment.status !== "cancelled") {
		throw new AppError("Seuls les RDV annulés peuvent être supprimés.", 403);
	}

	// Vérifier si l'utilisateur a le rôle autorisé (ex: opticien ou admin)
	if (userRole !== "optician" && userRole !== "admin") {
		throw new AppError(
			"Vous n'avez pas l'autorisation de supprimer ce RDV.",
			403,
		);
	}

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

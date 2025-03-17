import prisma from "../prisma";
import { sendEmail } from "./emailService";
import { sendSMS } from "./smsService";
import logger from "../middlewares/logger";
import { NotificationType } from "@prisma/client";

/**
 * 🔹 Convertit une date en UTC pour Prisma
 */
const toUTCDate = (date: Date) => {
	return new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
		),
	);
};

/**
 * 🔹 Envoie une notification par email et/ou SMS
 */
export const sendNotification = async (
	type: NotificationType,
	client: { email: string | null; phone: string | null; first_name: string },
	opticianEmail: string,
	appointment: { id: number; appointment_date: Date; optician_notes?: string },
	preferredNotification: "email" | "sms" | "both",
) => {
	let subject = "";
	let body = "";

	switch (type) {
		case "appointment_created_by_client":
			subject = "Nouvelle demande de rendez-vous";
			body = `Un client a demandé un rendez-vous le ${appointment.appointment_date.toLocaleString()}.`;
			break;
		case "appointment_created_by_optician":
			subject = "Confirmation de votre rendez-vous";
			body = `Votre rendez-vous a été confirmé pour le ${appointment.appointment_date.toLocaleString()}.`;
			break;
		case "appointment_accepted":
			subject = "Votre rendez-vous est confirmé";
			body = `Votre rendez-vous pour le ${appointment.appointment_date.toLocaleString()} a été confirmé.`;
			break;
		case "appointment_modified":
			subject = "Modification de votre rendez-vous";
			body = `Votre rendez-vous a été modifié : ${appointment.appointment_date.toLocaleString()}.\n\nNotes de l’opticien : ${appointment.optician_notes || "Aucune note."}`;
			break;
		case "appointment_rejected":
			subject = "Rendez-vous refusé";
			body = `Votre rendez-vous prévu le ${appointment.appointment_date.toLocaleString()} a été refusé par l'opticien.`;
			break;
		case "appointment_cancelled_by_client":
			subject = "Rendez-vous annulé par le client";
			body = `Le client a annulé son rendez-vous prévu le ${appointment.appointment_date.toLocaleString()}.`;
			break;
		default:
			logger.warn(`❌ Type de notification inconnu: ${type}`);
			return;
	}

	// 📩 Envoi de l'email
	if (preferredNotification === "email" || preferredNotification === "both") {
		if (client.email) {
			logger.info(`📤 Envoi d'un email à ${client.email} : ${subject}`);
			await sendEmail(client.email, subject, body);
		}
		if (type === "appointment_created_by_client" && opticianEmail) {
			await sendEmail(opticianEmail, subject, body);
		}
	}

	// 📱 Envoi du SMS
	if (
		(preferredNotification === "sms" || preferredNotification === "both") &&
		client.phone
	) {
		logger.info(`📲 Envoi d'un SMS à : ${client.phone}`);
		await sendSMS(client.phone, body);
	}
};

/**
 * 🔹 Envoie les rappels pour les rendez-vous confirmés à 24h et 2h avant.
 */
export const sendReminders = async () => {
	logger.info("🔍 Recherche des rendez-vous pour les rappels...");

	// 📌 Récupération de la date et heure actuelle en UTC
	const now = new Date();
	logger.info(`⏳ Date actuelle UTC : ${now.toISOString()}`);

	// 📌 Fenêtres de rappel (24h et 2h avant)
	const reminder24h = new Date(now);
	reminder24h.setHours(now.getHours() + 24);

	const reminder2h = new Date(now);
	reminder2h.setHours(now.getHours() + 2);

	// 🔍 Recherche des rendez-vous confirmés qui n'ont PAS encore reçu de rappel
	const appointments = await prisma.appointment.findMany({
		where: {
			status: "confirmed",
			OR: [
				{
					appointment_date: {
						gte: reminder24h,
						lt: new Date(reminder24h.getTime() + 60 * 1000), // Fenêtre de 1 minute
					},
					notifications: {
						none: { type: NotificationType.reminder_24h },
					},
				},
				{
					appointment_date: {
						gte: reminder2h,
						lt: new Date(reminder2h.getTime() + 60 * 1000), // Fenêtre de 1 minute
					},
					notifications: {
						none: { type: NotificationType.reminder_2h },
					},
				},
			],
		},
		include: {
			client: true, // Include the entire client object
		},
	});

	// ✅ Si aucun RDV trouvé, on arrête ici
	if (appointments.length === 0) {
		logger.info("✅ Aucun rappel à envoyer pour l’instant.");
		return { message: "Aucun rappel à envoyer." };
	}

	logger.info(`📅 RDV trouvés : ${appointments.length}`);

	// 📩 Envoi des rappels et enregistrement des notifications
	for (const appointment of appointments) {
		const { client, appointment_date, preferred_notification } = appointment;

		// ⏳ Vérification si c'est un rappel 24h ou 2h
		const diffInHours =
			(appointment_date.getTime() - now.getTime()) / (1000 * 60 * 60);
		const is24hReminder = Math.abs(diffInHours - 24) < 1;
		const is2hReminder = Math.abs(diffInHours - 2) < 1;

		if (!is24hReminder && !is2hReminder) {
			logger.info(`⏳ Rappel non déclenché pour ID: ${appointment.id}`);
			continue;
		}

		// 📌 Définition du type de notification
		const notificationType: NotificationType = is24hReminder
			? ("reminder_24h" as NotificationType)
			: ("reminder_2h" as NotificationType);

		const subject = "Rappel de votre rendez-vous";
		const body = `Bonjour ${client.first_name},\n\nCeci est un rappel pour votre rendez-vous prévu le ${appointment_date.toLocaleString()}.\n\nMerci de votre confiance.`;

		// 📤 Envoi Email
		if (["email", "both"].includes(preferred_notification) && client.email) {
			logger.info(`📤 Envoi de l'email à : ${client.email}`);
			await sendEmail(client.email, subject, body);
		}

		// 📲 Envoi SMS
		if (["sms", "both"].includes(preferred_notification) && client.phone) {
			logger.info(`📲 Envoi du SMS à : ${client.phone}`);
			await sendSMS(
				client.phone,
				`Rappel : Votre RDV est prévu le ${appointment_date.toLocaleString()}`,
			);
		}

		// 📝 Enregistrement de la notification dans la base de données
		await prisma.notification.create({
			data: {
				appointment_id: appointment.id,
				sent_at: new Date(),
				type: notificationType,
			},
		});

		logger.info(`✅ Rappel envoyé pour le RDV ID: ${appointment.id}`);
	}

	return { message: "Rappels traités avec succès !" };
};

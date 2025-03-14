import type { Request, Response } from "express";
import prisma from "../prisma";
import { sendEmail } from "../services/emailService";
import { sendSMS } from "../services/smsService";

export const testSendEmail = async (req: Request, res: Response) => {
	try {
		await sendEmail("josuexr@icloud.com", "Test Email", "Ceci est un test.");
		res.json({ message: "Email envoyé avec succès !" });
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
	}
};

export const testSendSMS = async (req: Request, res: Response) => {
	try {
		await sendSMS("+330781403680", "Ceci est un test Twilio !");
		res.json({ message: "SMS envoyé avec succès !" });
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de l'envoi du SMS." });
	}
};

export const sendReminderNotifications = async (
	req: Request,
	res: Response,
) => {
	try {
		const now = new Date();
		const next24h = new Date(now);
		next24h.setHours(now.getHours() + 24);

		const next2h = new Date(now);
		next2h.setHours(now.getHours() + 2);

		// ✅ Trouver les RDV dans les prochaines 24h
		const appointments24h = await prisma.appointment.findMany({
			where: {
				appointment_date: {
					gte: now,
					lte: next24h,
				},
				status: "confirmed",
			},
			include: { client: true },
		});

		// ✅ Trouver les RDV dans les prochaines 2h avec `second_reminder_enabled = true`
		const appointments2h = await prisma.appointment.findMany({
			where: {
				appointment_date: {
					gte: now,
					lte: next2h,
				},
				status: "confirmed",
				second_reminder_enabled: true, // ✅ Vérification si activé
			},
			include: { client: true },
		});

		// ✅ Envoyer les rappels 24h avant
		for (const appointment of appointments24h) {
			const { client, appointment_date, preferred_notification } = appointment;
			const message = `Bonjour ${client.first_name}, ceci est un rappel pour votre rendez-vous prévu le ${appointment_date.toLocaleString()} chez La Lunetterie du Coin.`;

			if (
				preferred_notification === "email" ||
				preferred_notification === "both"
			) {
				await sendEmail(client.email, "Rappel de votre RDV", message);
			}
			if (
				preferred_notification === "sms" ||
				preferred_notification === "both"
			) {
				await sendSMS(client.phone, message);
			}
		}

		// ✅ Envoyer les rappels 2h avant
		for (const appointment of appointments2h) {
			const { client, appointment_date, preferred_notification } = appointment;
			const message = `Bonjour ${client.first_name}, ceci est un dernier rappel pour votre rendez-vous dans 2h chez La Lunetterie du Coin.`;

			if (
				preferred_notification === "email" ||
				preferred_notification === "both"
			) {
				await sendEmail(client.email, "Dernier rappel de votre RDV", message);
			}
			if (
				preferred_notification === "sms" ||
				preferred_notification === "both"
			) {
				await sendSMS(client.phone, message);
			}
		}

		res.status(200).json({ message: "Rappels envoyés avec succès." });
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de l'envoi des rappels." });
	}
};

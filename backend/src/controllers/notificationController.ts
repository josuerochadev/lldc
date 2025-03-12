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
		// Trouver les RDV dans les prochaines 24h
		const now = new Date();
		const next24h = new Date();
		next24h.setHours(now.getHours() + 24);

		const appointments = await prisma.appointment.findMany({
			where: {
				appointment_date: {
					gte: now,
					lte: next24h,
				},
				status: "confirmed",
			},
			include: { client: true },
		});

		// Envoyer une notification à chaque client
		for (const appointment of appointments) {
			const { client, appointment_date, preferred_notification } = appointment;
			const message = `Bonjour ${client.first_name}, ceci est un rappel automatique pour votre rendez-vous prévu le ${appointment_date.toLocaleString()} chez La Lunetterie du Coin. Merci de nous contacter si vous souhaitez le modifier. (Ref: ${appointment.id})`;
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

		res.status(200).json({ message: "Rappels envoyés avec succès." });
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de l'envoi des rappels." });
	}
};

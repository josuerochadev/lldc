import type { Request, Response, NextFunction } from "express";
import { contactSchema } from "../validations/contactSchema";
import {
	saveContactMessage,
	getAllContactMessages,
	notifyOptician,
} from "../services/contactService";
import rateLimit from "express-rate-limit";
import logger from "../middlewares/logger";

export const contactLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 1,
	message: "Trop de requêtes, veuillez réessayer plus tard.",
});

/**
 * 🔹 Envoie un message via le formulaire de contact
 */
export const sendContactMessage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = contactSchema.parse(req.body);
		const contactMessage = await saveContactMessage(data);
		await notifyOptician(data);

		res.status(201).json({ message: "Message envoyé avec succès." });
	} catch (error) {
		logger.error(
			`❌ Erreur lors de l'envoi du message de contact : ${(error as Error).message}`,
		);
		next(error);
	}
};

/**
 * 🔹 Récupère tous les messages de contact (réservé à l'opticien)
 */
export const getContactMessages = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		logger.info("📩 Récupération des messages de contact...");
		const messages = await getAllContactMessages();
		res.json(messages);
	} catch (error) {
		logger.error(
			`❌ Erreur lors de la récupération des messages de contact : ${(error as Error).message}`,
		);
		next(error);
	}
};

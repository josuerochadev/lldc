import type { Request, Response, NextFunction } from "express";
import { sendReminders } from "../services/notificationService";
import logger from "../middlewares/logger";

/**
 * 🔹 Exécute l'envoi des rappels automatiquement
 */
export const sendReminderHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await sendReminders();
		res.json({ message: "Rappels envoyés avec succès !" });
	} catch (error) {
		logger.error(
			`❌ Erreur lors de l'envoi des rappels: ${(error as Error).message}`,
		);
		next(error);
	}
};

import type { NextFunction, Request, Response } from "express";
import {
	createBlockedSlot,
	getBlockedSlots,
} from "../services/planningService";
import { AppError } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";

export const createBlockedSlotHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { start_date, end_date } = req.body;
		logger.info(
			`🛑 Demande de blocage d'un créneau : ${start_date} → ${end_date}`,
		);
		const blockedSlot = await createBlockedSlot(start_date, end_date);
		res.status(201).json(blockedSlot);
	} catch (error) {
		logger.error(
			`❌ Erreur lors du blocage d'un créneau : ${(error as Error).message}`,
		);
		next(error);
	}
};

export const getBlockedSlotsHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		logger.info("📅 Demande de récupération des créneaux bloqués");
		const blockedSlots = await getBlockedSlots();
		res.json(blockedSlots);
	} catch (error) {
		logger.error(
			`❌ Erreur lors de la récupération des créneaux bloqués : ${(error as Error).message}`,
		);
		next(error);
	}
};

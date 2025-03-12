import type { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { AppError } from "../middlewares/errorHandler";
import { blockedSlotSchema } from "../validations/blockedSlotSchema";

export const createBlockedSlot = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = blockedSlotSchema.parse(req.body);

		// Vérification : start_date < end_date
		if (new Date(data.start_date) >= new Date(data.end_date)) {
			return next(
				new AppError("La date de fin doit être après la date de début.", 400),
			);
		}

		// Vérification : conflit avec des rendez-vous existants
		const overlappingAppointments = await prisma.appointment.findMany({
			where: {
				appointment_date: {
					gte: new Date(data.start_date),
					lte: new Date(data.end_date),
				},
			},
		});

		if (overlappingAppointments.length > 0) {
			return next(
				new AppError(
					"Impossible de bloquer ce créneau, des rendez-vous existent déjà.",
					400,
				),
			);
		}

		const blockedSlot = await prisma.blockedSlot.create({
			data: {
				start_date: new Date(data.start_date),
				end_date: new Date(data.end_date),
			},
		});

		res.status(201).json(blockedSlot);
	} catch (error) {
		next(error);
	}
};

export const getBlockedSlots = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const blockedSlots = await prisma.blockedSlot.findMany();
		res.json(blockedSlots);
	} catch (error) {
		next(error);
	}
};

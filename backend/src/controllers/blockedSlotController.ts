import type { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { blockedSlotSchema } from "../validations/blockedSlotSchema";

export const createBlockedSlot = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const data = blockedSlotSchema.parse(req.body);

		// Vérification : start_date < end_date
		if (new Date(data.start_date) >= new Date(data.end_date)) {
			res
				.status(400)
				.json({ error: "La date de fin doit être après la date de début." });
			return;
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
			res.status(400).json({
				error:
					"Impossible de bloquer ce créneau, des rendez-vous existent déjà.",
			});
			return;
		}

		// Création du créneau bloqué
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

export const getBlockedSlots = async (req: Request, res: Response) => {
	try {
		const blockedSlots = await prisma.blockedSlot.findMany();
		res.json(blockedSlots);
	} catch (error) {
		res.status(400).json({
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

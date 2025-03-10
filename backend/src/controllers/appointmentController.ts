import type { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import {
	appointmentSchema,
	updateAppointmentSchema,
} from "../validations/appointmentSchema";

export const createAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const data = appointmentSchema.parse(req.body);

		const existingAppointment = await prisma.appointment.findFirst({
			where: { appointment_date: new Date(data.appointment_date) },
		});
		if (existingAppointment) {
			res.status(400).json({ error: "Ce créneau est déjà réservé." });
			return;
		}

		const appointment = await prisma.appointment.create({
			data: {
				clientId: data.clientId,
				appointment_date: new Date(data.appointment_date),
				status: "pending",
				preferred_notification: data.preferred_notification,
			},
		});

		res.status(201).json(appointment);
	} catch (error) {
		res
			.status(400)
			.json({
				error: error instanceof Error ? error.message : "Unknown error",
			});
	}
};

export const getAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const appointment = await prisma.appointment.findUnique({
			where: { id: Number(id) },
		});
		if (!appointment) {
			res.status(404).json({ error: "Rendez-vous non trouvé." });
			return;
		}
		res.json(appointment);
	} catch (error) {
		res
			.status(400)
			.json({
				error: error instanceof Error ? error.message : "Unknown error",
			});
	}
};

export const updateAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const data = updateAppointmentSchema.parse(req.body);

		const appointment = await prisma.appointment.update({
			where: { id: Number(id) },
			data,
		});

		res.json(appointment);
	} catch (error) {
		res
			.status(400)
			.json({
				error: error instanceof Error ? error.message : "Unknown error",
			});
	}
};

export const deleteAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		await prisma.appointment.delete({ where: { id: Number(id) } });
		res.status(204).send();
	} catch (error) {
		res
			.status(400)
			.json({
				error: error instanceof Error ? error.message : "Unknown error",
			});
	}
};

import type { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { AppError } from "../middlewares/errorHandler";
import {
	appointmentSchema,
	updateAppointmentSchema,
} from "../validations/appointmentSchema";

export const createAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = appointmentSchema.parse(req.body);

		const existingAppointment = await prisma.appointment.findFirst({
			where: { appointment_date: new Date(data.appointment_date) },
		});

		if (existingAppointment) {
			return next(new AppError("Ce créneau est déjà réservé.", 400));
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
		next(error);
	}
};

export const getAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const appointment = await prisma.appointment.findUnique({
			where: { id: Number(id) },
		});

		if (!appointment) {
			return next(new AppError("Rendez-vous non trouvé.", 404));
		}

		res.json(appointment);
	} catch (error) {
		next(error);
	}
};

export const updateAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const data = updateAppointmentSchema.parse(req.body);

		const appointment = await prisma.appointment.update({
			where: { id: Number(id) },
			data,
		});

		res.json(appointment);
	} catch (error) {
		next(error);
	}
};

export const deleteAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		await prisma.appointment.delete({ where: { id: Number(id) } });
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

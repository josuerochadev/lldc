import type { Request, Response, NextFunction } from "express";
import {
	createAppointment,
	getAppointmentById,
	getAppointments,
	updateAppointment,
	cancelAppointmentWithToken,
	deleteAppointment,
	acceptAppointment,
	rejectAppointment,
} from "../services/appointmentService";
import logger from "../middlewares/logger";
import { AppError } from "../middlewares/errorHandler";

// 📌 Étendre le type Request pour inclure `user`
interface AuthenticatedRequest extends Request {
	user?: { id: number; role: "optician" | "client" };
}

export const createAppointmentHandler = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		logger.info("📅 Création d'un rendez-vous...");

		const isOptician = req.user?.role === "optician"; // Vérifier si l'utilisateur est un opticien
		const appointment = await createAppointment({ ...req.body, isOptician });

		res.status(201).json(appointment);
	} catch (error) {
		logger.error(`❌ Erreur lors de la création: ${(error as Error).message}`);
		next(error);
	}
};

export const getAppointmentHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(Number(id))) throw new Error("ID invalide");

		logger.info(`🔍 Récupération du rendez-vous ID: ${id}`);
		const appointment = await getAppointmentById(Number(id));
		res.json(appointment);
	} catch (error) {
		logger.error(
			`❌ Erreur lors de la récupération: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const getAppointmentsHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		logger.info("📅 Récupération des rendez-vous confirmés...");
		const { date, status } = req.query;

		const appointments = await getAppointments({
			startDate: typeof date === "string" ? date : undefined,
			status: typeof status === "string" ? status : undefined,
		});

		res.status(200).json(appointments);
	} catch (error) {
		logger.error(
			`❌ Erreur lors de la récupération des rendez-vous : ${(error as Error).message}`,
		);
		next(error);
	}
};

export const updateAppointmentHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(Number(id))) throw new Error("ID invalide");

		logger.info(`🛠 Mise à jour du rendez-vous ID: ${id}`);
		const updatedAppointment = await updateAppointment(Number(id), req.body);
		res.json(updatedAppointment);
	} catch (error) {
		logger.error(
			`❌ Erreur lors de la mise à jour: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const cancelAppointmentHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { token } = req.params;
		if (!token) throw new AppError("Token manquant.", 400);

		logger.info(`🛑 Annulation d'un rendez-vous avec token: ${token}`);
		const result = await cancelAppointmentWithToken(token);
		res.json(result);
	} catch (error) {
		logger.error(`❌ Erreur lors de l'annulation: ${(error as Error).message}`);
		next(error);
	}
};

export const deleteAppointmentHandler = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(Number(id))) throw new Error("ID invalide");

		// 🔍 Vérifier que l'utilisateur est connecté et récupérer son rôle
		const userRole = req.user?.role;
		if (!userRole) throw new Error("Utilisateur non authentifié");

		logger.info(`🗑 Suppression du rendez-vous ID: ${id} par un ${userRole}`);
		const result = await deleteAppointment(Number(id), userRole);
		res.json(result);
	} catch (error) {
		logger.error(
			`❌ Erreur lors de la suppression: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const acceptAppointmentHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(Number(id))) throw new Error("ID invalide");

		logger.info(`✅ Acceptation du rendez-vous ID: ${id}`);
		const result = await acceptAppointment(Number(id));
		res.json(result);
	} catch (error) {
		logger.error(
			`❌ Erreur lors de l'acceptation: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const rejectAppointmentHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(Number(id))) throw new Error("ID invalide");

		logger.info(`❌ Rejet du rendez-vous ID: ${id}`);
		const result = await rejectAppointment(Number(id));
		res.json(result);
	} catch (error) {
		logger.error(`❌ Erreur lors du rejet: ${(error as Error).message}`);
		next(error);
	}
};

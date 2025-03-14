import type { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { AppError } from "../middlewares/errorHandler";
import {
	appointmentSchema,
	updateAppointmentSchema,
} from "../validations/appointmentSchema";
import { sendEmail } from "../services/emailService";
import { sendSMS } from "../services/smsService";
import crypto from "node:crypto";

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

		// ✅ Récupérer le client
		const client = await prisma.client.findUnique({
			where: { id: data.clientId },
		});

		if (!client) {
			return next(new AppError("Client introuvable.", 404));
		}

		// ✅ Générer un token d'annulation
		const cancellationToken = crypto.randomBytes(32).toString("hex");

		const appointment = await prisma.appointment.create({
			data: {
				clientId: data.clientId,
				appointment_date: new Date(data.appointment_date),
				status: "pending",
				preferred_notification: data.preferred_notification,
				cancellation_token: cancellationToken,
			},
		});

		// ✅ Construire le message avec les vraies infos du client
		const cancellationLink = `${process.env.FRONTEND_URL}/cancel/${cancellationToken}`;

		const message = `Bonjour ${client.first_name}, 
  Votre RDV est confirmé pour le ${new Date(data.appointment_date).toLocaleString()}.
  Si vous souhaitez annuler, cliquez sur ce lien : ${cancellationLink}`;

		if (
			data.preferred_notification === "email" ||
			data.preferred_notification === "both"
		) {
			await sendEmail(client.email, "Confirmation de RDV", message);
		}

		if (
			(data.preferred_notification === "sms" ||
				data.preferred_notification === "both") &&
			client.phone
		) {
			await sendSMS(client.phone, message);
		}

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

		// ✅ Vérifier si on tente de modifier la date
		if (data.appointment_date) {
			return next(
				new AppError(
					"Utilisez /reschedule pour modifier la date d’un RDV.",
					400,
				),
			);
		}

		// Vérifier si le rendez-vous existe avant modification
		const existingAppointment = await prisma.appointment.findUnique({
			where: { id: Number(id) },
		});

		if (!existingAppointment) {
			return next(new AppError("Rendez-vous non trouvé.", 404));
		}

		const appointment = await prisma.appointment.update({
			where: { id: Number(id) },
			data,
		});

		res.json(appointment);
	} catch (error) {
		next(error);
	}
};

export const toggleSecondReminder = async (
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

		const updatedAppointment = await prisma.appointment.update({
			where: { id: Number(id) },
			data: {
				second_reminder_enabled: !appointment.second_reminder_enabled, // ✅ Inverse l'état
			},
		});

		res.json({
			message: `Second rappel ${updatedAppointment.second_reminder_enabled ? "activé" : "désactivé"}.`,
			appointment: updatedAppointment,
		});
	} catch (error) {
		next(error);
	}
};

export const rescheduleAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { new_date } = req.body;

		if (!new_date) {
			return next(new AppError("Une nouvelle date doit être fournie.", 400));
		}

		const appointment = await prisma.appointment.findUnique({
			where: { id: Number(id) },
			include: { client: true },
		});

		if (!appointment) {
			return next(new AppError("Rendez-vous non trouvé.", 404));
		}

		// Vérifier si la nouvelle date est disponible
		const existingAppointment = await prisma.appointment.findFirst({
			where: { appointment_date: new Date(new_date) },
		});

		if (existingAppointment) {
			return next(new AppError("Ce créneau est déjà réservé.", 400));
		}

		// Mise à jour du statut et nouvelle date
		const updatedAppointment = await prisma.appointment.update({
			where: { id: Number(id) },
			data: {
				appointment_date: new Date(new_date),
				status: "pending",
			},
		});

		// Notification client
		const message = `Bonjour ${appointment.client.first_name}, 
  L'opticien vous propose une nouvelle date pour votre rendez-vous : 
  📅 ${new Date(new_date).toLocaleString()} 
  Veuillez répondre par email ou SMS pour confirmer ou refuser ce changement.`;

		if (
			appointment.preferred_notification === "email" ||
			appointment.preferred_notification === "both"
		) {
			await sendEmail(
				appointment.client.email,
				"Modification de votre RDV",
				message,
			);
		}

		if (
			appointment.preferred_notification === "sms" ||
			appointment.preferred_notification === "both"
		) {
			await sendSMS(appointment.client.phone, message);
		}

		res.status(200).json({
			message: "Modification proposée avec succès.",
			appointment: updatedAppointment,
		});
	} catch (error) {
		next(error);
	}
};

export const declineReschedule = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		// Vérifier si le RDV existe
		const appointment = await prisma.appointment.findUnique({
			where: { id: Number(id) },
			include: { client: true },
		});

		if (!appointment) {
			return next(new AppError("Rendez-vous non trouvé.", 404));
		}

		// Vérifier si le statut est bien "pending" (modification en attente)
		if (appointment.status !== "pending") {
			return next(new AppError("Ce rendez-vous ne peut pas être refusé.", 400));
		}

		// Annuler le RDV
		await prisma.appointment.update({
			where: { id: Number(id) },
			data: {
				status: "cancelled",
			},
		});

		// Notification client
		const messageClient = `Bonjour ${appointment.client.first_name}, 
  Vous avez refusé la modification de votre rendez-vous. 
  Votre rendez-vous a été annulé. 
  💡 Vous pouvez prendre un nouveau rendez-vous ici : [Lien de réservation]`;

		if (
			appointment.preferred_notification === "email" ||
			appointment.preferred_notification === "both"
		) {
			await sendEmail(
				appointment.client.email,
				"Annulation de votre RDV",
				messageClient,
			);
		}

		if (
			appointment.preferred_notification === "sms" ||
			appointment.preferred_notification === "both"
		) {
			await sendSMS(appointment.client.phone, messageClient);
		}

		// Notification opticien
		const messageOptician = `Le client ${appointment.client.first_name} ${appointment.client.last_name} 
  a refusé la modification du RDV. Ce rendez-vous est maintenant annulé.`;

		await sendEmail(
			process.env.OPTICIAN_EMAIL as string,
			"Annulation de RDV par le client",
			messageOptician,
		);

		res.status(200).json({
			message: "Modification refusée. Le RDV a été annulé.",
		});
	} catch (error) {
		next(error);
	}
};

export const cancelAppointmentByToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { token } = req.params;

		// Vérifier si un RDV correspond au token
		const appointment = await prisma.appointment.findUnique({
			where: { cancellation_token: token },
			include: { client: true },
		});

		if (!appointment) {
			return next(new AppError("Lien invalide ou déjà utilisé.", 400));
		}

		// ✅ Vérifier si l'annulation est autorisée (ex: minimum 3h avant)
		const now = new Date();
		const appointmentTime = new Date(appointment.appointment_date);
		const timeDiff = (appointmentTime.getTime() - now.getTime()) / (1000 * 60); // Convertir en minutes

		if (timeDiff < 180) {
			// 180 minutes = 3 heures
			return next(
				new AppError(
					"L'annulation n'est plus possible à moins de 3h du rendez-vous.",
					403,
				),
			);
		}

		// ✅ Annuler le RDV
		await prisma.appointment.update({
			where: { id: appointment.id },
			data: {
				status: "cancelled",
				cancellation_token: null, // Invalide le token après utilisation
			},
		});

		// ✅ Notifications (client + opticien)
		const messageClient = `Bonjour ${appointment.client.first_name}, 
Votre rendez-vous a bien été annulé. Vous pouvez en reprendre un nouveau ici : [Lien de réservation]`;

		if (
			appointment.preferred_notification === "email" ||
			appointment.preferred_notification === "both"
		) {
			await sendEmail(
				appointment.client.email,
				"Annulation confirmée",
				messageClient,
			);
		}

		if (
			appointment.preferred_notification === "sms" ||
			appointment.preferred_notification === "both"
		) {
			await sendSMS(appointment.client.phone, messageClient);
		}

		const messageOptician = `Le client ${appointment.client.first_name} ${appointment.client.last_name} a annulé son RDV.`;

		await sendEmail(
			process.env.OPTICIAN_EMAIL as string,
			"Un RDV a été annulé",
			messageOptician,
		);

		res.status(200).json({
			message: "Rendez-vous annulé avec succès.",
		});
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

export const acceptAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		// Vérifier si le RDV existe
		const appointment = await prisma.appointment.findUnique({
			where: { id: Number(id) },
			include: { client: true },
		});

		if (!appointment) {
			return next(new AppError("Rendez-vous non trouvé.", 404));
		}

		// Vérifier si le RDV est déjà confirmé ou annulé
		if (appointment.status !== "pending") {
			return next(
				new AppError("Ce rendez-vous ne peut pas être accepté.", 400),
			);
		}

		// Accepter le RDV
		const updatedAppointment = await prisma.appointment.update({
			where: { id: Number(id) },
			data: { status: "confirmed" },
		});

		// Notification au client
		const messageClient = `Bonjour ${appointment.client.first_name}, 
Votre rendez-vous du ${new Date(appointment.appointment_date).toLocaleString()} a été confirmé. 
Nous vous attendons chez La Lunetterie du Coin.`;

		if (
			appointment.preferred_notification === "email" ||
			appointment.preferred_notification === "both"
		) {
			await sendEmail(
				appointment.client.email,
				"Confirmation de votre RDV",
				messageClient,
			);
		}

		if (
			appointment.preferred_notification === "sms" ||
			appointment.preferred_notification === "both"
		) {
			await sendSMS(appointment.client.phone, messageClient);
		}

		res.status(200).json({
			message: "Rendez-vous accepté.",
			appointment: updatedAppointment,
		});
	} catch (error) {
		next(error);
	}
};

export const rejectAppointment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		// Vérifier si le RDV existe
		const appointment = await prisma.appointment.findUnique({
			where: { id: Number(id) },
			include: { client: true },
		});

		if (!appointment) {
			return next(new AppError("Rendez-vous non trouvé.", 404));
		}

		// Vérifier si le RDV est déjà confirmé ou annulé
		if (appointment.status !== "pending") {
			return next(new AppError("Ce rendez-vous ne peut pas être refusé.", 400));
		}

		// Refuser et supprimer le RDV
		await prisma.appointment.delete({ where: { id: Number(id) } });

		// Notification au client
		const messageClient = `Bonjour ${appointment.client.first_name}, 
Nous sommes désolés, mais votre rendez-vous du ${new Date(appointment.appointment_date).toLocaleString()} a été refusé. 
Vous pouvez réserver un autre créneau ici : [Lien de réservation]`;

		if (
			appointment.preferred_notification === "email" ||
			appointment.preferred_notification === "both"
		) {
			await sendEmail(
				appointment.client.email,
				"Rendez-vous refusé",
				messageClient,
			);
		}

		if (
			appointment.preferred_notification === "sms" ||
			appointment.preferred_notification === "both"
		) {
			await sendSMS(appointment.client.phone, messageClient);
		}

		res.status(200).json({ message: "Rendez-vous refusé et supprimé." });
	} catch (error) {
		next(error);
	}
};

import { z } from "zod";

export const appointmentSchema = z
	.object({
		first_name: z
			.string()
			.min(2, "Le prénom doit contenir au moins 2 caractères."),
		last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
		email: z.string().email("L'email est invalide."),
		phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), {
			message: "Le numéro de téléphone est invalide.",
		}),
		appointment_date: z
			.string()
			.datetime()
			.refine((date) => new Date(date) > new Date(), {
				message: "La date du rendez-vous doit être dans le futur.",
			}),
		preferred_notification: z.enum(["email", "sms", "both"]),
	})
	.refine((data) => data.email || data.phone, {
		message: "Un moyen de contact (email ou téléphone) est requis.",
	});

export const updateAppointmentSchema = z
	.object({
		clientId: z.number().int().positive().optional(),
		appointment_date: z
			.string()
			.datetime()
			.refine((date) => new Date(date) > new Date(), {
				message: "La date du rendez-vous doit être dans le futur.",
			})
			.optional(),
		preferred_notification: z.enum(["email", "sms", "both"]).optional(),
		email: z.string().email().optional(),
		phone: z.string().optional(),
	})
	.refine((data) => data.preferred_notification !== "email" || data.email, {
		message: "L'email est obligatoire si le mode de notification est 'email'.",
	})
	.refine((data) => data.preferred_notification !== "sms" || data.phone, {
		message:
			"Le numéro de téléphone est obligatoire si le mode de notification est 'sms'.",
	});

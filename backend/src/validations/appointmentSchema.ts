import { z } from "zod";

export const appointmentSchema = z.object({
	clientId: z.number().int().positive(),
  appointment_date: z.string().datetime(),
  preferred_notification: z.enum(["email", "sms", "both"]),
});

export const updateAppointmentSchema = appointmentSchema.partial();
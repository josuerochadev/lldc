import { z } from "zod";

export const appointmentSchema = z.object({
  clientId: z.number(),
  appointment_date: z.string().datetime(),
  preferred_notification: z.enum(["email", "sms", "both"]),
});

export const updateAppointmentSchema = appointmentSchema.partial();
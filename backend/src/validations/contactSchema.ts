import { z } from "zod";

export const contactSchema = z.object({
  full_name: z.string().min(3, "Le nom doit contenir au moins 3 caractères."),
  email: z.string().email("L'email est invalide."),
  phone: z.string().optional(),
  message_content: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
});
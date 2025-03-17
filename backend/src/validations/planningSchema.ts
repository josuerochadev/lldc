import { z } from "zod";

export const rescheduleSchema = z.object({
	new_date: z
		.string()
		.datetime()
		.refine((date) => !Number.isNaN(Date.parse(date)), {
			message: "La date fournie est invalide.",
		}),
});

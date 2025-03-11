import { z } from "zod";

export const blockedSlotSchema = z.object({
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
});
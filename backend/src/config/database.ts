import { PrismaClient } from "@prisma/client";
import { ENV } from "./env";

export const prisma = new PrismaClient({
	datasources: {
		db: {
			url: ENV.DATABASE_URL,
		},
	},
});

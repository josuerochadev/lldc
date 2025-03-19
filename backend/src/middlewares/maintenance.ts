import type { Request, Response, NextFunction } from "express";
import logger from "../middlewares/logger"; // Vérifie le chemin vers ton logger

export const maintenanceMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (process.env.MAINTENANCE_MODE === "true") {
		logger.warn("⚠️ L'API est en mode maintenance...");
		res
			.status(503)
			.json({ error: "L'API est en maintenance. Réessayez plus tard." });
	} else {
		next();
	}
};

import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import logger from "./logger";

// 📌 Classe personnalisée pour gérer les erreurs applicatives
class AppError extends Error {
	statusCode: number;

	constructor(message: string, statusCode = 500) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

// 📌 Middleware de gestion des erreurs globales
const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	// 📌 Gestion des erreurs de validation Zod
	if (err instanceof ZodError) {
		const errors = err.errors.map((e) => ({
			field: e.path.join("."),
			message: e.message,
		}));
		logger.warn(`⚠️ Validation échouée: ${JSON.stringify(errors)}`);
		res.status(400).json({ error: "Erreur de validation", details: errors });
		return;
	}

	// 📌 Prisma Errors
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		logger.error(`🛑 Prisma Error: ${err.code} - ${err.message}`);
		res.status(500).json({ error: "Erreur de base de données." });
		return;
	}

	if (err instanceof Prisma.PrismaClientValidationError) {
		logger.error(`🛑 Prisma Validation Error: ${err.message}`);
		res.status(400).json({ error: "Requête invalide." });
		return;
	}

	// 📌 Routes inconnues
	if (err instanceof AppError && err.statusCode === 404) {
		logger.warn(`⚠️ Route inconnue : ${req.method} ${req.originalUrl}`);
		res.status(404).json({ error: "Route non trouvée." });
		return;
	}

	// 📌 Erreur personnalisée
	if (err instanceof AppError) {
		logger.warn(`⚠️ AppError: ${err.message}`);
		res.status(err.statusCode).json({ error: err.message });
		return;
	}

	// 📌 Erreur générique (par défaut)
	logger.error(`❌ Erreur serveur : ${err.message}`);
	res.status(500).json({ error: "Une erreur interne est survenue." });
};

// 📌 Middleware pour gérer les routes inconnues AVANT `errorHandler`
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError("Route non trouvée", 404);
	next(error);
};

export { errorHandler, AppError, notFoundHandler };

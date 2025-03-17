import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import logger from "./logger";

// 📌 Classe personnalisée pour gérer les erreurs applicatives
class AppError extends Error {
	statusCode: number;
	code?: string;

	constructor(message: string, statusCode = 500, code?: string) {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
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
	const errorId = Date.now(); // Générer un identifiant unique pour le log
	logger.error(`❌ Erreur ID ${errorId}: ${err.message}`);

	// 📌 Gestion des erreurs de validation Zod
	if (err instanceof ZodError) {
		const errors = err.errors.map((e) => ({
			field: e.path.join("."),
			message: e.message,
		}));
		logger.warn(
			`⚠️ Validation échouée (ID ${errorId}): ${JSON.stringify(errors)}`,
		);
		res.status(400).json({
			code: "VALIDATION_ERROR",
			error: "Erreur de validation",
			details: errors,
			errorId,
		});
		return;
	}

	// 📌 Prisma Errors
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		logger.error(
			`🛑 Prisma Error (ID ${errorId}): ${err.code} - ${err.message}`,
		);
		res
			.status(500)
			.json({ code: "DB_ERROR", error: "Erreur de base de données", errorId });
		return;
	}

	if (err instanceof Prisma.PrismaClientValidationError) {
		logger.error(`🛑 Prisma Validation Error (ID ${errorId}): ${err.message}`);
		res.status(400).json({
			code: "DB_VALIDATION_ERROR",
			error: "Requête invalide",
			errorId,
		});
		return;
	}

	// 📌 Routes inconnues
	if (err instanceof AppError && err.statusCode === 404) {
		logger.warn(
			`⚠️ Route inconnue (ID ${errorId}): ${req.method} ${req.originalUrl}`,
		);
		res
			.status(404)
			.json({ code: "NOT_FOUND", error: "Route non trouvée", errorId });
		return;
	}

	// 📌 Erreur personnalisée
	if (err instanceof AppError) {
		logger.warn(`⚠️ AppError (ID ${errorId}): ${err.message}`);
		res
			.status(err.statusCode)
			.json({ code: err.code || "APP_ERROR", error: err.message, errorId });
		return;
	}

	// 📌 Erreur générique (par défaut)
	logger.error(`❌ Erreur serveur (ID ${errorId}): ${err.message}`);
	res.status(500).json({
		code: "INTERNAL_ERROR",
		error: "Une erreur interne est survenue",
		errorId,
	});
};

// 📌 Middleware pour gérer les routes inconnues AVANT `errorHandler`
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError("Route non trouvée", 404, "NOT_FOUND");
	next(error);
};

export { errorHandler, AppError, notFoundHandler };

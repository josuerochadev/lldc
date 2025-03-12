import winston from "winston";
import fs from "node:fs";
import path from "node:path";
import type { Request, Response, NextFunction } from "express";

// 📌 Vérifie si le dossier logs existe, sinon le crée
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// 📌 Configuration du logger avec Winston
const logger = winston.createLogger({
	level: process.env.NODE_ENV === "production" ? "warn" : "info", // Niveau en fonction de l'environnement
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
		new winston.transports.File({
			filename: path.join(logDir, "error.log"),
			level: "error",
		}),
		new winston.transports.File({
			filename: path.join(logDir, "combined.log"),
		}),
	],
});

// 📌 Middleware pour logger les erreurs
export const errorLogger = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.error({
		message: err.message,
		route: req.originalUrl,
		method: req.method,
		ip: req.ip,
	});
	next(err);
};

// 📌 Middleware pour logger les requêtes HTTP
export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.info({
		message: "Nouvelle requête",
		method: req.method,
		route: req.originalUrl,
		ip: req.ip,
	});
	next();
};

export default logger;
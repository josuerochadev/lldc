import type { Request, Response, NextFunction } from "express";
import winston from "winston";
import fs from "node:fs";
import path from "node:path";

// 📌 Vérifie si le dossier logs existe, sinon le crée
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// 📌 Configuration du logger avec Winston
const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
	),
	transports: [
		new winston.transports.Console(), // Affiche dans la console
		new winston.transports.File({
			filename: path.join(logDir, "error.log"),
			level: "error",
		}), // Logs d'erreurs
		new winston.transports.File({
			filename: path.join(logDir, "combined.log"),
		}), // Tous les logs
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
		stack: err.stack,
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

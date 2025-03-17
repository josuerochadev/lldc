import type { Request, Response, NextFunction } from "express";
import { loginUser, logoutUser } from "../services/authService";
import { AppError } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;
		const token = await loginUser(email, password);
		res.json({ token });
	} catch (error) {
		if (error instanceof Error) {
			logger.error(`❌ Erreur lors de la connexion : ${error.message}`);
		} else {
			logger.error("❌ Erreur lors de la connexion : Erreur inconnue");
		}
		next(error);
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			logger.warn("🔒 Tentative de déconnexion sans token");
			throw new AppError("Accès refusé. Authentification requise.", 401);
		}

		const token = authHeader.split(" ")[1];
		await logoutUser(token);
		res.json({ message: "Déconnexion réussie." });
	} catch (error) {
		if (error instanceof Error) {
			logger.error(`❌ Erreur lors de la déconnexion : ${error.message}`);
		} else {
			logger.error("❌ Erreur lors de la déconnexion : Erreur inconnue");
		}
		next(error);
	}
};

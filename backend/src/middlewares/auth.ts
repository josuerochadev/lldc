import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { ENV } from "../config/env";
import { AppError } from "../middlewares/errorHandler";
import logger from "../middlewares/logger"; // Si tu as un logger

interface AuthenticatedRequest extends Request {
	user?: { id: number; role: "optician" | "client" };
}

const JWT_SECRET = ENV.JWT_SECRET;

// 📌 Fonction utilitaire pour extraire le token
const extractBearerToken = (authHeader?: string): string | null => {
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}
	return authHeader.split(" ")[1];
};

export const isAuthenticated = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = extractBearerToken(req.headers.authorization);

	if (!token) {
		logger.warn("🔒 Accès refusé : Aucun token fourni.");
		return next(new AppError("Accès refusé. Authentification requise.", 401));
	}

	// 🔍 Vérifier si le token est blacklisté
	const isBlacklisted = await prisma.blacklistedToken.findUnique({
		where: { token },
	});
	if (isBlacklisted) {
		logger.warn("🔒 Tentative d'utilisation d'un token black-listé.");
		return next(
			new AppError("Token invalide. Veuillez vous reconnecter.", 403),
		);
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

		// 🔍 Récupérer le rôle de l'utilisateur en base de données
		const optician = await prisma.optician.findUnique({
			where: { id: decoded.id },
		});

		if (!optician) {
			logger.warn("🔒 Accès refusé : Utilisateur non trouvé.");
			return next(new AppError("Utilisateur non trouvé.", 403));
		}

		req.user = { id: decoded.id, role: "optician" }; // L'opticien a forcément ce rôle

		logger.info(
			`✅ Authentification réussie pour l'opticien ID: ${decoded.id}`,
		);
		next();
	} catch (error) {
		if (error instanceof Error && error.name === "TokenExpiredError") {
			logger.warn("🔒 Échec d'authentification : Token expiré.");
			return next(
				new AppError("Votre session a expiré. Veuillez vous reconnecter.", 401),
			);
		}
		logger.error("❌ Erreur de vérification du token:", error);
		return next(new AppError("Jeton invalide.", 403));
	}
};

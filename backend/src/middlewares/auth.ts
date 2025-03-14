import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { ENV } from "../config/env";
import { AppError } from "../middlewares/errorHandler";

interface AuthenticatedRequest extends Request {
	opticianId?: number;
}

const JWT_SECRET = ENV.JWT_SECRET;

export const isAuthenticated = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return next(new AppError("Accès refusé. Authentification requise.", 403));
	}

	const token = authHeader.split(" ")[1];

	// Vérifier si le token est black-listé
	const isBlacklisted = await prisma.blacklistedToken.findUnique({
		where: { token },
	});
	if (isBlacklisted) {
		return next(
			new AppError("Token invalide. Veuillez vous reconnecter.", 403),
		);
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
		req.opticianId = decoded.id;
		next();
	} catch (error) {
		return next(new AppError("Jeton invalide.", 403));
	}
};

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/auth";
import { AppError } from "./errorHandler";

interface AuthenticatedRequest extends Request {
	opticianId?: number;
}

export const isAuthenticated = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return next(new AppError("Accès refusé. Authentification requise.", 403));
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
		req.opticianId = decoded.id;
		next();
	} catch (error) {
		return next(new AppError("Jeton invalide.", 403));
	}
};

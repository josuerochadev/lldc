import type { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { comparePasswords, generateToken } from "../services/authService";
import { AppError } from "../middlewares/errorHandler";

export const loginOptician = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;

		const optician = await prisma.optician.findUnique({ where: { email } });

		if (!optician) {
			return next(new AppError("Identifiants incorrects", 401));
		}

		const isValidPassword = await comparePasswords(password, optician.password);
		if (!isValidPassword) {
			return next(new AppError("Identifiants incorrects", 401));
		}

		const token = generateToken(optician.id);

		res.json({ token });
	} catch (error) {
		next(error);
	}
};

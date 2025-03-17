import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../prisma";
import { ENV } from "../config/env";
import { AppError } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";

const JWT_SECRET = ENV.JWT_SECRET;

// 📌 Fonction pour hacher le mot de passe
export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

// 📌 Fonction pour comparer les mots de passe
export const comparePasswords = async (
	password: string,
	hashedPassword: string,
) => {
	return await bcrypt.compare(password, hashedPassword);
};

// 📌 Générer un token JWT
export const generateToken = (opticianId: number) => {
	return jwt.sign({ id: opticianId }, JWT_SECRET, { expiresIn: "8h" });
};

// 📌 Connexion de l'utilisateur
export const loginUser = async (email: string, password: string) => {
	logger.info(`🟢 Tentative de connexion pour l'email : ${email}`);

	const optician = await prisma.optician.findUnique({ where: { email } });

	if (!optician) {
		logger.warn(`🔴 Connexion échouée : opticien non trouvé (${email})`);
		throw new AppError("Identifiants incorrects", 401);
	}

	const isValidPassword = await comparePasswords(password, optician.password);
	if (!isValidPassword) {
		logger.warn(`🔴 Connexion échouée : mot de passe incorrect (${email})`);
		throw new AppError("Identifiants incorrects", 401);
	}

	const token = generateToken(optician.id);
	logger.info(`✅ Connexion réussie : opticien ID ${optician.id}`);
	return token;
};

// 📌 Déconnexion (ajout du token à la liste noire)
export const logoutUser = async (token: string) => {
	logger.info("🚪 Tentative de déconnexion");

	await prisma.blacklistedToken.create({
		data: { token },
	});

	logger.info("✅ Déconnexion réussie, token mis en liste noire");
};

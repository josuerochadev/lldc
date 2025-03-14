import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config/auth";

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (
	password: string,
	hashedPassword: string,
) => {
	return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (opticianId: number) => {
	return jwt.sign({ id: opticianId }, JWT_SECRET, { expiresIn: "8h" });
};

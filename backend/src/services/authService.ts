import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ENV } from "../config/env";

const JWT_SECRET = ENV.JWT_SECRET;

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

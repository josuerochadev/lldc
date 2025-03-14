import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
	throw new Error("❌ ERREUR : JWT_SECRET est manquant dans .env !");
}

export const ENV = {
	JWT_SECRET: process.env.JWT_SECRET,
	DATABASE_URL: process.env.DATABASE_URL,
	PORT: process.env.PORT || 4000,
};

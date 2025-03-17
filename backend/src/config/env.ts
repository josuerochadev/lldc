import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
	throw new Error("❌ ERREUR : JWT_SECRET est manquant dans .env !");
}

export const ENV = {
	JWT_SECRET: process.env.JWT_SECRET || "default_secret",
	DATABASE_URL: process.env.DATABASE_URL,
	PORT: process.env.PORT || 4000,
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
	EMAIL_FROM: process.env.EMAIL_FROM,
	OPTICIAN_EMAIL: process.env.OPTICIAN_EMAIL,
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
	TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
	SENTRY_DSN: process.env.SENTRY_DSN,
	MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === "true",
  };
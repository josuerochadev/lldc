import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import logger from "../middlewares/logger";

dotenv.config();

const emailFrom = process.env.EMAIL_FROM;
if (!emailFrom) {
	throw new Error("❌ EMAIL_FROM n'est pas défini dans le fichier .env !");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

/**
 * 🔹 Envoie un email via SendGrid
 */
export const sendEmail = async (
	to: string,
	subject: string,
	text: string,
	html?: string,
) => {
	const msg = { to, from: emailFrom, subject, text, html };

	try {
		await sgMail.send(msg);
		logger.info(`📧 Email envoyé à ${to}`);
	} catch (error) {
		logger.error(`❌ Erreur lors de l'envoi de l'email à ${to}: ${error}`);
	}
};

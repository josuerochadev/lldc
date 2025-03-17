import twilio from "twilio";
import dotenv from "dotenv";
import logger from "../middlewares/logger";

dotenv.config();

const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
if (!twilioNumber) {
	throw new Error(
		"❌ TWILIO_PHONE_NUMBER n'est pas défini dans le fichier .env !",
	);
}

const client = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);

/**
 * 🔹 Envoie un SMS via Twilio
 */
export const sendSMS = async (to: string, message: string) => {
	try {
		await client.messages.create({ body: message, from: twilioNumber, to });
		logger.info(`📱 SMS envoyé à ${to}`);
	} catch (error) {
		logger.error(`❌ Erreur lors de l'envoi du SMS à ${to}: ${error}`);
	}
};

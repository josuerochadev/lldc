import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
if (!twilioNumber) {
  throw new Error("❌ TWILIO_PHONE_NUMBER n'est pas défini dans le fichier .env !");
}

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to: string, message: string) => {
  try {
    await client.messages.create({
      body: message,
      from: twilioNumber,
      to,
    });
    console.log(`📱 SMS envoyé à ${to}`);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du SMS :", error);
  }
};
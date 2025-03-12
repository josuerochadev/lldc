import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const emailFrom = process.env.EMAIL_FROM;
if (!emailFrom) {
  throw new Error("❌ EMAIL_FROM n'est pas défini dans le fichier .env !");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  const msg = {
    to,
    from: emailFrom,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`📧 Email envoyé à ${to}`);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
  }
};
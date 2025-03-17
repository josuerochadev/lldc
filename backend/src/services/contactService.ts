import prisma from "../prisma";
import { sendEmail } from "../services/emailService";
import logger from "../middlewares/logger";
import { AppError } from "../middlewares/errorHandler";

interface ContactData {
	full_name: string;
	email: string;
	phone?: string;
	message_content: string;
}

/**
 * 🔹 Enregistre un message de contact en base de données
 */
export const saveContactMessage = async (data: ContactData) => {
	logger.info(`💾 Enregistrement du message de contact de ${data.email}`);

	const contactMessage = await prisma.contactMessage.create({
		data: {
			full_name: data.full_name,
			email: data.email,
			phone: data.phone,
			message_content: data.message_content,
		},
	});

	logger.info(`✅ Message de contact enregistré ID: ${contactMessage.id}`);
	return contactMessage;
};

/**
 * 🔹 Récupère tous les messages de contact
 */
export const getAllContactMessages = async () => {
	logger.info("📩 Chargement des messages de contact...");
	return await prisma.contactMessage.findMany({
		orderBy: { sent_at: "desc" },
	});
};

/**
 * 🔹 Envoie un email de notification pour un message de contact
 */
export const notifyOptician = async (data: ContactData) => {
	const emailBody = `
      <h3>Nouveau message de contact :</h3>
      <p><strong>Nom :</strong> ${data.full_name}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
      <p><strong>Message :</strong><br/> ${data.message_content}</p>
    `;

	try {
		await sendEmail("opticien@example.com", "Nouveau message de contact", "", emailBody);
		logger.info(`📧 Email de contact envoyé par ${data.email}`);
	} catch (error) {
		logger.error(`❌ Erreur lors de l'envoi de l'email de contact : ${error}`);
		throw new AppError("Le message a été enregistré, mais l'email n'a pas pu être envoyé.", 500);
	}
};
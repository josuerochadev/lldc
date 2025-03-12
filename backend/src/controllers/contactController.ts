import type { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { contactSchema } from "../validations/contactSchema";
import { sendEmail } from "../services/emailService";
import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // 1 requête max par minute
  message: "Trop de requêtes, veuillez réessayer plus tard.",
});

export const sendContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = contactSchema.parse(req.body);

    // Enregistrer le message en base de données
    const contactMessage = await prisma.contactMessage.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        message_content: data.message_content,
      },
    });

    // Envoyer un email de notification à l’opticien
    const emailBody = `
      Nouveau message de contact :
      Nom : ${data.full_name}
      Email : ${data.email}
      Téléphone : ${data.phone || "Non renseigné"}
      Message :
      ${data.message_content}
    `;
    await sendEmail(process.env.OPTICIAN_EMAIL as string, "Nouveau message de contact", emailBody);

    res.status(201).json({ message: "Message envoyé avec succès." });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { sent_at: "desc" },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
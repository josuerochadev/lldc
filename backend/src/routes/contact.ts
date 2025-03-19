import { Router } from "express";
import {
	sendContactMessage,
	getContactMessages,
	contactLimiter,
} from "../controllers/contactController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Gestion des messages de contact
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactMessage:
 *       type: object
 *       required:
 *         - full_name
 *         - email
 *         - message_content
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unique du message de contact
 *         full_name:
 *           type: string
 *           description: Nom complet de l'expéditeur
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse email de l'expéditeur
 *         phone:
 *           type: string
 *           nullable: true
 *           pattern: "^\\+?[1-9]\\d{1,14}$"
 *           description: Numéro de téléphone de l'expéditeur (format international, optionnel)
 *         message_content:
 *           type: string
 *           description: Contenu du message
 *         sent_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Date et heure d'envoi du message (auto-généré)
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Envoi d'un message de contact
 *     tags: [Contact]
 *     description: Permet aux utilisateurs d'envoyer un message via le formulaire de contact.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - message_content
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Nom complet de l'expéditeur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'expéditeur
 *               phone:
 *                 type: string
 *                 nullable: true
 *                 description: Numéro de téléphone de l'expéditeur (optionnel)
 *               message_content:
 *                 type: string
 *                 description: Contenu du message
 *     responses:
 *       201:
 *         description: Message envoyé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message envoyé avec succès."
 *       429:
 *         description: Trop de requêtes (limite d'une par minute)
 *       400:
 *         description: Erreur de validation (données incorrectes)
 */
router.post("/", contactLimiter, sendContactMessage);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Récupération des messages de contact
 *     tags: [Contact]
 *     description: Permet à l'opticien de récupérer les messages envoyés via le formulaire de contact.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des messages récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/ContactMessage"
 *       401:
 *         description: Accès refusé, authentification requise
 */
router.get("/", isAuthenticated, getContactMessages);

export default router;

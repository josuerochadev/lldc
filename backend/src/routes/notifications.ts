import { Router } from "express";
import { sendReminderHandler } from "../controllers/notificationController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Gestion des notifications et rappels de rendez-vous
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - appointment_id
 *         - sent_at
 *         - type
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unique de la notification
 *         appointment_id:
 *           type: integer
 *           description: ID du rendez-vous concerné
 *         sent_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Date et heure d'envoi de la notification (auto-généré)
 *         type:
 *           type: string
 *           enum:
 *             - appointment_created_by_client
 *             - appointment_created_by_optician
 *             - appointment_accepted
 *             - appointment_modified
 *             - appointment_rejected
 *             - appointment_cancelled_by_client
 *             - reminder_24h
 *             - reminder_2h
 *           description: Type de notification envoyée
 *         appointment:
 *           $ref: "#/components/schemas/Appointment"
 *           description: Rendez-vous lié à cette notification
 */

/**
 * @swagger
 * /api/notifications/reminders:
 *   post:
 *     summary: Envoi des rappels de rendez-vous
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Les rappels ont été envoyés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rappels envoyés avec succès !"
 *       401:
 *         description: Accès refusé, authentification requise
 */
router.post("/reminders", sendReminderHandler);

export default router;

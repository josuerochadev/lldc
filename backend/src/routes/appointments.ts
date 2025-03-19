import { Router } from "express";
import {
	createAppointmentHandler,
	getAppointmentHandler,
	getAppointmentsHandler,
	updateAppointmentHandler,
	deleteAppointmentHandler,
	cancelAppointmentHandler,
	acceptAppointmentHandler,
	rejectAppointmentHandler,
} from "../controllers/appointmentController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Gestion des rendez-vous
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unique du client
 *         first_name:
 *           type: string
 *           description: Prénom du client
 *         last_name:
 *           type: string
 *           description: Nom du client
 *         email:
 *           type: string
 *           format: email
 *           description: Email du client
 *         phone:
 *           type: string
 *           pattern: "^\\+?[1-9]\\d{1,14}$"
 *           description: Numéro de téléphone du client (format international)
 *         appointments:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Appointment"
 *           description: Liste des rendez-vous du client
 *
 *     Appointment:
 *       type: object
 *       required:
 *         - client_id
 *         - appointment_date
 *         - preferred_notification
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unique du rendez-vous
 *         client_id:
 *           type: integer
 *           description: ID du client associé
 *         appointment_date:
 *           type: string
 *           format: date-time
 *           description: Date et heure du rendez-vous
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           description: Statut du rendez-vous
 *         preferred_notification:
 *           type: string
 *           enum: [email, sms, both]
 *           description: Mode de notification choisi par le client
 *         optician_notes:
 *           type: string
 *           nullable: true
 *           description: Notes internes de l'opticien
 *         cancellation_token:
 *           type: string
 *           nullable: true
 *           description: Token unique pour annulation sécurisée
 *         cancellation_token_expiry:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Date d'expiration du token d'annulation
 *         second_reminder_enabled:
 *           type: boolean
 *           description: Indique si un rappel supplémentaire est activé
 *         client:
 *           $ref: "#/components/schemas/Client"
 *         notifications:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Notification"
 *           description: Liste des notifications associées au rendez-vous
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Création d'un rendez-vous
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Rendez-vous créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/", createAppointmentHandler);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Récupérer un rendez-vous par ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rendez-vous
 *     responses:
 *       200:
 *         description: Détails du rendez-vous
 *       404:
 *         description: Rendez-vous non trouvé
 */
router.get("/:id", isAuthenticated, getAppointmentHandler);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Récupère tous les rendez-vous confirmés
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer les rendez-vous par date
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *         description: Filtrer par statut
 *     responses:
 *       200:
 *         description: Liste des rendez-vous récupérée avec succès
 */
router.get("/", getAppointmentsHandler);

/**
 * @swagger
 * /api/appointments/{id}:
 *   patch:
 *     summary: Mettre à jour un rendez-vous
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rendez-vous à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointment_date:
 *                 type: string
 *                 format: date-time
 *               preferred_notification:
 *                 type: string
 *                 enum: [email, sms, both]
 *     responses:
 *       200:
 *         description: Rendez-vous mis à jour
 *       400:
 *         description: Erreur de validation
 */
router.patch("/:id", isAuthenticated, updateAppointmentHandler);

/**
 * @swagger
 * /api/appointments/cancel/{token}:
 *   post:
 *     summary: Annulation d'un rendez-vous avec un token sécurisé
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token d'annulation
 *     responses:
 *       200:
 *         description: Rendez-vous annulé avec succès
 *       403:
 *         description: Token invalide ou expiré
 */
router.post("/cancel/:token", cancelAppointmentHandler);

/**
 * @swagger
 * /api/appointments/{id}/accept:
 *   patch:
 *     summary: Accepter un rendez-vous
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rendez-vous à accepter
 *     responses:
 *       200:
 *         description: Rendez-vous accepté
 *       404:
 *         description: Rendez-vous non trouvé
 */
router.patch("/:id/accept", isAuthenticated, acceptAppointmentHandler);

/**
 * @swagger
 * /api/appointments/{id}/reject:
 *   delete:
 *     summary: Rejeter un rendez-vous
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rendez-vous à rejeter
 *     responses:
 *       200:
 *         description: Rendez-vous rejeté
 *       404:
 *         description: Rendez-vous non trouvé
 */
router.delete("/:id/reject", isAuthenticated, rejectAppointmentHandler);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Supprimer un rendez-vous
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rendez-vous à supprimer
 *     responses:
 *       200:
 *         description: Rendez-vous supprimé avec succès
 *       403:
 *         description: Accès interdit
 */
router.delete("/:id", isAuthenticated, deleteAppointmentHandler);

export default router;

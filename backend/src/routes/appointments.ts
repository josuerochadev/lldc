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
 * @route POST /api/appointments
 * @desc Création d'un rendez-vous
 * @access Public
 */
router.post("/", createAppointmentHandler);

/**
 * @route GET /api/appointments/:id
 * @desc Récupération d'un rendez-vous par ID
 * @access Privé
 */
router.get("/:id", isAuthenticated, getAppointmentHandler);

/**
 * @route GET /api/appointments
 * @desc Récupère les créneaux réservés et confirmés
 * @access Public
 */
router.get("/", getAppointmentsHandler);

/**
 * @route PATCH /api/appointments/:id
 * @desc Mise à jour d'un rendez-vous
 * @access Privé
 */
router.patch("/:id", isAuthenticated, updateAppointmentHandler);

/**
 * @route POST /api/appointments/cancel/:token
 * @desc Annulation d'un rendez-vous avec un token sécurisé
 * @access Public
 */
router.post("/cancel/:token", cancelAppointmentHandler);

/**
 * @route PATCH /api/appointments/:id/accept
 * @desc Acceptation d'un rendez-vous
 * @access Privé
 */
router.patch("/:id/accept", isAuthenticated, acceptAppointmentHandler);

/**
 * @route DELETE /api/appointments/:id/reject
 * @desc Rejet d'un rendez-vous
 * @access Privé
 */
router.delete("/:id/reject", isAuthenticated, rejectAppointmentHandler);

/**
 * @route DELETE /api/appointments/:id
 * @desc Suppression d'un rendez-vous
 * @access Privé
 */
router.delete("/:id", isAuthenticated, deleteAppointmentHandler);

export default router;

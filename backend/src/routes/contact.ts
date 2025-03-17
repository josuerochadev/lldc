import { Router } from "express";
import {
	sendContactMessage,
	getContactMessages,
	contactLimiter,
} from "../controllers/contactController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

/**
 * @route POST /api/contact
 * @desc Envoi d'un message de contact
 * @access Public (avec rate limit)
 */
router.post("/", contactLimiter, sendContactMessage);

/**
 * @route GET /api/contact/admin
 * @desc Récupération des messages (opticien uniquement)
 * @access Privé
 */
router.get("/", isAuthenticated, getContactMessages);

export default router;
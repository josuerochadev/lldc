import { Router } from "express";
import {
	createBlockedSlotHandler,
	getBlockedSlotsHandler,
} from "../controllers/planningController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

/**
 * @route POST /api/planning
 * @desc Création d'un créneau bloqué
 * @access Privé
 */
router.post("/", isAuthenticated, createBlockedSlotHandler);

/**
 * @route GET /api/planning
 * @desc Récupération des créneaux bloqués
 * @access Public
 */
router.get("/", getBlockedSlotsHandler);

export default router;

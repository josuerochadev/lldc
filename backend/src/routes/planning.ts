import { Router } from "express";
import {
	createBlockedSlotHandler,
	getBlockedSlotsHandler,
} from "../controllers/planningController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Planning
 *   description: Gestion des créneaux bloqués
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BlockedSlot:
 *       type: object
 *       required:
 *         - start_date
 *         - end_date
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: ID unique du créneau bloqué (auto-généré)
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Date et heure de début du créneau bloqué
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: Date et heure de fin du créneau bloqué
 *           minimum: start_date
 */

/**
 * @swagger
 * /api/planning:
 *   post:
 *     summary: Création d'un créneau bloqué
 *     tags: [Planning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_date
 *               - end_date
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date et heure de début du créneau bloqué
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date et heure de fin du créneau bloqué
 *     responses:
 *       201:
 *         description: Créneau bloqué créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BlockedSlot"
 *       400:
 *         description: Erreur de validation (date incorrecte ou chevauchement)
 *       401:
 *         description: Accès refusé, authentification requise
 */
router.post("/", isAuthenticated, createBlockedSlotHandler);

/**
 * @swagger
 * /api/planning:
 *   get:
 *     summary: Récupération des créneaux bloqués
 *     tags: [Planning]
 *     responses:
 *       200:
 *         description: Liste des créneaux bloqués récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/BlockedSlot"
 */
router.get("/", getBlockedSlotsHandler);

export default router;

import { Router } from "express";
import { login, logout } from "../controllers/authController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification des opticiens
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un opticien
 *     tags: [Auth]
 *     description: Permet à un opticien de se connecter et de recevoir un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'opticien
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mot de passe de l'opticien
 *     responses:
 *       200:
 *         description: Connexion réussie, retour du token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT pour l'authentification
 *       401:
 *         description: Identifiants incorrects
 *       400:
 *         description: Requête invalide (champs manquants ou mal formattés)
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion d'un opticien
 *     tags: [Auth]
 *     description: Permet à un opticien de se déconnecter en ajoutant son token à la liste noire.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Déconnexion réussie."
 *       401:
 *         description: Accès refusé, authentification requise
 */
router.post("/logout", isAuthenticated, logout);

export default router;

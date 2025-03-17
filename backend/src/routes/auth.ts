import { Router } from "express";
import { login, logout } from "../controllers/authController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

/**
 * @route POST /api/auth/login
 * @desc Connexion d'un opticien
 * @access Public
 */
router.post("/login", login);

/**
 * @route POST /api/auth/logout
 * @desc Déconnexion (blacklist du token)
 * @access Privé (nécessite authentication)
 */
router.post("/logout", isAuthenticated, logout);

export default router;

import { Router } from "express";
import { login, logout } from "../controllers/authController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

export default router;

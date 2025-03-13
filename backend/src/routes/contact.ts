import { Router } from "express";
import {
	sendContactMessage,
	getContactMessages,
	contactLimiter,
} from "../controllers/contactController";

const router = Router();

router.post("/", contactLimiter, sendContactMessage); // Formulaire de contact
router.get("/admin", getContactMessages); // Récupérer les messages (opticien)

export default router;

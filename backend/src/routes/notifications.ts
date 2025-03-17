import { Router } from "express";
import { sendReminderHandler } from "../controllers/notificationController";

const router = Router();

/**
 * @route POST /api/notifications/reminders
 * @desc Envoi des rappels de rendez-vous
 * @access Privé
 */
router.post("/reminders", sendReminderHandler);

export default router;

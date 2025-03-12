import { Router } from "express";
import { sendReminderNotifications, testSendEmail, testSendSMS } from "../controllers/notificationController";

const router = Router();

router.get("/test-email", testSendEmail);
router.get("/test-sms", testSendSMS);
router.post("/reminders", sendReminderNotifications);

export default router;
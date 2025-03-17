import { Router } from "express";
import authRoutes from "./auth";
import appointmentRoutes from "./appointments";
import planningRoutes from "./planning";
import notificationRoutes from "./notifications";
import contactRoutes from "./contact";
import logRoutes from "./logs";

const router = Router();

/**
 * 📌 Routes Admin (Accès privé)
 */
router.use("/auth", authRoutes);
router.use("/logs", logRoutes);

/**
 * 📌 Routes Notifications
 */
router.use("/notifications", notificationRoutes); // Correction du placement

/**
 * 📌 Routes Appointments & Planning
 */
router.use("/appointments", appointmentRoutes);
router.use("/planning", planningRoutes);

/**
 * 📌 Routes Contact (Accès public)
 */
router.use("/contact", contactRoutes);

export default router;

import { Router } from "express";
import appointmentRoutes from "./appointments";
import blockedSlotRoutes from "./blockedSlots";
import notificationRoutes from "./notifications";
import contactRoutes from "./contact";
import logRoutes from "./logs";

const router = Router();

router.use("/appointments", appointmentRoutes);
router.use("/admin/block-slots", blockedSlotRoutes);
router.use("/admin", notificationRoutes);
router.use("/contact", contactRoutes);
router.use("/admin/logs", logRoutes);

export default router;
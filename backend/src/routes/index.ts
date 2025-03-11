import { Router } from "express";
import appointmentRoutes from "./appointments";
import blockedSlotRoutes from "./blockedSlots"; // Import des créneaux bloqués

const router = Router();

router.use("/appointments", appointmentRoutes);
router.use("/admin/block-slots", blockedSlotRoutes); // Nouvelle route pour les créneaux bloqués

export default router;
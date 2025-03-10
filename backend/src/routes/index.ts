import { Router } from "express";
import appointmentRoutes from "./appointment";

const router = Router();

router.use("/appointments", appointmentRoutes);

export default router;
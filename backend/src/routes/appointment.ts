import { Router } from "express";
import {
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController";

const router = Router();

router.post("/", createAppointment);
router.get("/:id", getAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
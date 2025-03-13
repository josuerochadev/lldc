import { Router } from "express";
import {
	createAppointment,
	getAppointment,
	updateAppointment,
	deleteAppointment,
	rescheduleAppointment,
	declineReschedule,
	cancelAppointmentByToken,
	acceptAppointment,
	rejectAppointment,
} from "../controllers/appointmentController";

const router = Router();

router.post("/", createAppointment);
router.get("/:id", getAppointment);
router.patch("/:id", updateAppointment);
router.patch("/:id/reschedule", rescheduleAppointment);
router.delete("/:id", deleteAppointment);
router.post("/:id/decline-reschedule", declineReschedule);
router.post("/cancel/:token", cancelAppointmentByToken);
router.patch("/:id/accept", acceptAppointment);
router.delete("/:id/reject", rejectAppointment);

export default router;

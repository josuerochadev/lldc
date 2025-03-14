import { Router } from "express";
import {
	createAppointment,
	getAppointment,
	updateAppointment,
	toggleSecondReminder,
	deleteAppointment,
	rescheduleAppointment,
	declineReschedule,
	cancelAppointmentByToken,
	acceptAppointment,
	rejectAppointment,
} from "../controllers/appointmentController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/", createAppointment);
router.get("/:id", getAppointment);
router.patch("/:id", updateAppointment);
router.patch("/:id/second-reminder", isAuthenticated, toggleSecondReminder);
router.patch("/:id/reschedule", rescheduleAppointment);
router.delete("/:id", deleteAppointment);
router.post("/:id/decline-reschedule", declineReschedule);
router.post("/cancel/:token", cancelAppointmentByToken);
router.patch("/:id/accept", isAuthenticated, acceptAppointment);
router.delete("/:id/reject", isAuthenticated, rejectAppointment);

export default router;

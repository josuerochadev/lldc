import cron from "node-cron";
import { sendReminders } from "../services/notificationService";

export const scheduleReminders = () => {
	console.log("⏰ Planification des rappels activée...");
	cron.schedule("*/30 * * * *", async () => { // Toutes les 30 minutes
		console.log("⏰ Exécution automatique des rappels...");
		await sendReminders();
	});
};
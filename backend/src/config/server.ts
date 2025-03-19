import app from "../app";
import { ENV } from "./env";
import logger from "../middlewares/logger";
import { scheduleReminders } from "./cron";

const PORT = ENV.PORT;

app.listen(PORT, () => {
  logger.info(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});

// 📌 Lancer les rappels planifiés
scheduleReminders();
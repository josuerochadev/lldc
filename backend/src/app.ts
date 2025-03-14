import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import cookieParser from "cookie-parser";
import { csrfProtection } from "./middlewares/csrf";
import { apiLimiter, contactLimiter } from "./middlewares/rateLimiter";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { errorLogger, requestLogger } from "./middlewares/logger";
import { ENV } from "./config/env";

const app = express();

// 📌 Sécurité et configuration
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// 📌 Protection CSRF
app.use(csrfProtection);

// 📌 Route pour récupérer le token CSRF
app.get("/api/csrf-token", (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});

// 📌 Limites de requêtes
app.use("/api", apiLimiter);
app.use("/api/contact", contactLimiter);

// 📌 Mode maintenance
const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
if (isMaintenanceMode) {
	app.use((req, res) => {
		res
			.status(503)
			.json({ error: "L'API est en maintenance. Réessayez plus tard." });
	});
}

// 📌 Logger des requêtes
app.use(requestLogger);

// 📌 Route de test
app.get("/", (req, res) => {
	res.send("✅ API La Lunetterie du Coin est en cours d'exécution !");
});

// 📌 Routes API
app.use("/api", router);

// 📌 Gestion des erreurs et routes inconnues
app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

// 📌 Lancement du serveur
const PORT = ENV.PORT;
app.listen(PORT, () => {
	console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});

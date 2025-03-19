import express from "express";
import { configureSecurity } from "./config/security";
import { maintenanceMiddleware } from "./middlewares/maintenance";
import router from "./routes";
import { csrfProtection } from "./middlewares/csrf";
import { apiLimiter } from "./middlewares/rateLimiter";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { errorLogger, requestLogger } from "./middlewares/logger";
import { setupSwagger } from "./config/swagger";

const app = express();

// 📌 Sécurité
configureSecurity(app);

// 📌 Protection CSRF
app.use(csrfProtection);

// 📌 Route pour récupérer le token CSRF
app.get("/api/csrf-token", (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});

// 📌 Limites de requêtes
app.use("/api", apiLimiter);

// 📌 Mode maintenance
app.use(maintenanceMiddleware);

// 📌 Logger des requêtes
app.use(requestLogger);

// 📌 Swagger
setupSwagger(app);

// 📌 Routes API
app.use("/api", router);

// 📌 Gestion des erreurs
app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

export default app;

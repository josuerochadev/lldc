import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { errorLogger, requestLogger } from "./middlewares/logger";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// 📌 Middleware pour logger les requêtes
app.use(requestLogger);

// 📌 Routes API
app.use("/api", router);

// 📌 Middleware pour capturer les routes inconnues (404)
app.use(notFoundHandler);

// 📌 Middleware d'erreurs DOIT ÊTRE LE DERNIER CHARGÉ
app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});
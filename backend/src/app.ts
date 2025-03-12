// backend/src/app.ts

import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import { errorLogger, requestLogger } from "./middlewares/logger";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Log requests
app.use(requestLogger);

// Routes
app.use("/api", router);

// Log errors
app.use(errorLogger);

const PORT = 4000; // Changer ici
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

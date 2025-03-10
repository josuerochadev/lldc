// backend/src/app.ts

import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", router);

const PORT = 4000; // Changer ici
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
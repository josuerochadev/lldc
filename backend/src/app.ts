import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
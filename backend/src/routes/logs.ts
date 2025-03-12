import { Router } from "express";
import fs from "node:fs";
import path from "node:path";

const router = Router();

// 📌 Route pour récupérer les logs d'erreurs
router.get("/errors", (req, res) => {
  const logPath = path.join(__dirname, "../../logs/error.log");
  if (fs.existsSync(logPath)) {
    const logs = fs.readFileSync(logPath, "utf-8");
    res.send(`<pre>${logs}</pre>`);
  } else {
    res.status(404).json({ message: "Aucun log trouvé" });
  }
});

// 📌 Route pour récupérer tous les logs
router.get("/all", (req, res) => {
  const logPath = path.join(__dirname, "../../logs/combined.log");
  if (fs.existsSync(logPath)) {
    const logs = fs.readFileSync(logPath, "utf-8");
    res.send(`<pre>${logs}</pre>`);
  } else {
    res.status(404).json({ message: "Aucun log trouvé" });
  }
});

export default router;
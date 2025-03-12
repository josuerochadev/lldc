import { Router } from "express";

const router = Router();

router.get("/debug-sentry", (req, res) => {
  throw new Error("Mon premier test d'erreur avec Sentry !");
});

export default router;
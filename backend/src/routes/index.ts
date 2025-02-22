import { Router } from "express";
const router = Router();

router.get("/services", (req, res) => {
  res.send("Liste des services");
});

export default router;
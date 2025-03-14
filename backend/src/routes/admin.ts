import { Router } from "express";
import { loginOptician } from "../controllers/authController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/login", loginOptician);
router.use(isAuthenticated);

export default router;

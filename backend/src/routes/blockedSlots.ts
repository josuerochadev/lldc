import { Router } from "express";
import { createBlockedSlot, getBlockedSlots } from "../controllers/blockedSlotController";

const router = Router();

router.post("/", createBlockedSlot);
router.get("/", getBlockedSlots);

export default router;
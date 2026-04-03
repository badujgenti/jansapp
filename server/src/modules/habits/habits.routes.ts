import { Router } from "express";
import * as controller from "./habits.controller";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { updateDailyLogSchema } from "./habits.schema";

const router = Router();

router.get("/daily", authenticate, controller.getDailyLog);
router.put("/daily", authenticate, validate(updateDailyLogSchema), controller.upsertDailyLog);
router.get("/weekly", authenticate, controller.getWeeklyGrid);
router.get("/streak", authenticate, controller.getStreak);

export default router;

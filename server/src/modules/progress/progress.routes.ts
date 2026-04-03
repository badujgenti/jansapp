import { Router } from "express";
import * as controller from "./progress.controller";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { addEntrySchema } from "./progress.schema";

const router = Router();

router.get("/history", authenticate, controller.getHistory);
router.get("/stats", authenticate, controller.getStats);
router.get("/weight-chart", authenticate, controller.getWeightChart);
router.post("/", authenticate, validate(addEntrySchema), controller.addEntry);
router.delete("/:id", authenticate, controller.deleteEntry);

export default router;

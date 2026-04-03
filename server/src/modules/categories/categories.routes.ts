import { Router } from "express";
import * as controller from "./categories.controller";
import { authenticate } from "../../middleware/auth";

const router = Router();

router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getById);

export default router;

import { Router } from "express";
import * as controller from "./users.controller";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { updateProfileSchema } from "./users.schema";

const router = Router();

router.patch("/profile", authenticate, validate(updateProfileSchema), controller.updateProfile);
router.delete("/account", authenticate, controller.deleteAccount);

export default router;

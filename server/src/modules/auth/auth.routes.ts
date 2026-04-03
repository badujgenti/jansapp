import { Router } from "express";
import * as controller from "./auth.controller";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { authRateLimiter } from "../../middleware/rate-limiter";
import { registerSchema, loginSchema, refreshSchema } from "./auth.schema";

const router = Router();

router.post("/register", authRateLimiter, validate(registerSchema), controller.register);
router.post("/login", authRateLimiter, validate(loginSchema), controller.login);
router.post("/refresh", validate(refreshSchema), controller.refresh);
router.post("/logout", validate(refreshSchema), controller.logout);
router.get("/me", authenticate, controller.getMe);

export default router;

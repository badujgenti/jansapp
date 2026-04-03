import { Router } from "express";
import * as controller from "./subscription.controller";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { subscribeSchema } from "./subscription.schema";

const router = Router();

router.get("/status", authenticate, controller.getStatus);
router.get("/payments", authenticate, controller.getPaymentHistory);
router.post("/subscribe", authenticate, validate(subscribeSchema), controller.subscribe);
router.post("/cancel", authenticate, controller.cancel);

export default router;

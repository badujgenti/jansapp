import { Router } from "express";
import * as controller from "./workouts.controller";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { logWorkoutSchema } from "./workouts.schema";

const router = Router();

router.get("/", authenticate, controller.getAll);
router.get("/featured", authenticate, controller.getFeatured);
router.get("/favorites", authenticate, controller.getFavorites);
router.get("/history", authenticate, controller.getHistory);
router.get("/:id", authenticate, controller.getById);
router.post("/:id/favorite", authenticate, controller.addFavorite);
router.delete("/:id/favorite", authenticate, controller.removeFavorite);
router.post("/log", authenticate, validate(logWorkoutSchema), controller.logWorkout);

export default router;

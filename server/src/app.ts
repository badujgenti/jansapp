import express from "express";
import cors from "cors";
import { apiRateLimiter, errorHandler } from "./middleware";

import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import workoutsRoutes from "./modules/workouts/workouts.routes";
import categoriesRoutes from "./modules/categories/categories.routes";
import progressRoutes from "./modules/progress/progress.routes";
import habitsRoutes from "./modules/habits/habits.routes";
import subscriptionRoutes from "./modules/subscription/subscription.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(apiRateLimiter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", name: "ჯანსApp API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/workouts", workoutsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/habits", habitsRoutes);
app.use("/api/subscription", subscriptionRoutes);

app.use(errorHandler);

export default app;

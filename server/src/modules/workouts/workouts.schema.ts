import { z } from "zod";

export const workoutQuerySchema = z.object({
  category: z.string().uuid().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  search: z.string().optional(),
  featured: z.enum(["true", "false"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const logWorkoutSchema = z.object({
  workoutId: z.string().uuid(),
  durationMin: z.number().int().positive(),
  caloriesBurn: z.number().int().positive(),
});

export type WorkoutQuery = z.infer<typeof workoutQuerySchema>;
export type LogWorkoutInput = z.infer<typeof logWorkoutSchema>;

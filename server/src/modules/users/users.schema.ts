import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  fitnessGoal: z.enum(["weight_loss", "muscle_gain", "flexibility", "cardio", "general_fitness"]).optional(),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  age: z.number().int().positive().optional(),
  heightCm: z.number().positive().optional(),
  weightKg: z.number().positive().optional(),
  avatarUrl: z.string().url().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

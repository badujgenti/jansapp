import { z } from "zod";

export const updateDailyLogSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  waterGlasses: z.number().int().min(0).optional(),
  waterGoal: z.number().int().positive().optional(),
  habitsComplete: z.array(z.string()).optional(),
  notes: z.string().max(500).optional(),
});

export type UpdateDailyLogInput = z.infer<typeof updateDailyLogSchema>;

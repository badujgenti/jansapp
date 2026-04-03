import { z } from "zod";

export const addEntrySchema = z.object({
  weightKg: z.number().positive().optional(),
  bodyFatPct: z.number().min(0).max(100).optional(),
  notes: z.string().max(500).optional(),
  date: z.string().datetime().optional(),
});

export type AddEntryInput = z.infer<typeof addEntrySchema>;

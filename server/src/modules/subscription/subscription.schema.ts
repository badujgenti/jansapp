import { z } from "zod";

export const subscribeSchema = z.object({
  plan: z.enum(["monthly", "yearly"]),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

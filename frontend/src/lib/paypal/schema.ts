import { z } from "zod";

export const orderDataSchema = z.union([
  z.object({
    type: z.literal("buyPremium"),
  }),
  z.object({
    type: z.literal("default"),
  }),
]);

export type OrderData = z.infer<typeof orderDataSchema>;

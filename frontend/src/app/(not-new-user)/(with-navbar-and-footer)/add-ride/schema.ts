import { z } from "zod";

export const CreateRideSchema = z.object({
  availableSeats: z.number().int(),
  price: z.number(),
  from: z.string(),
  to: z.string(),
  departure: z.date(),
  duration: z.number(),
  distance: z.number(),
  driverId: z.string(),
  carId: z.string(),
  ruleIds: z.array(z.string()).optional(),
});

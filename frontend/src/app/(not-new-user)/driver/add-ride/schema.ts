import { z } from "zod";

export const CreateRideSchema = z.object({
  availableSeats: z.number().int(),
  price: z.number(),
  from: z.string(),
  to: z.string(),
  departure: z.date(),
  arrival: z.date(),
  distance: z.number(),
  driverId: z.string(),
  carId: z.string(),
});

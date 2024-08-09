import * as z from "zod"
import { CompleteUser, RelatedUserSchema, CompleteRule, RelatedRuleSchema, CompleteCar, RelatedCarSchema } from "./index"

export const RideSchema = z.object({
  id: z.string(),
  availableSeats: z.number().int(),
  price: z.number(),
  from: z.string(),
  to: z.string(),
  departure: z.date(),
  arrival: z.date(),
  distance: z.number(),
  driverId: z.string(),
  carId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteRide extends z.infer<typeof RideSchema> {
  driver: CompleteUser
  passengers: CompleteUser[]
  rules: CompleteRule[]
  car: CompleteCar
}

/**
 * RelatedRideSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRideSchema: z.ZodSchema<CompleteRide> = z.lazy(() => RideSchema.extend({
  driver: RelatedUserSchema,
  passengers: RelatedUserSchema.array(),
  rules: RelatedRuleSchema.array(),
  car: RelatedCarSchema,
}))

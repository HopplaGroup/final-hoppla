import * as z from "zod"
import { CarType } from "@prisma/client"
import { CompleteUser, RelatedUserSchema, CompleteRide, RelatedRideSchema } from "./index"

export const CarSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(CarType),
  color: z.string(),
  plate: z.string(),
  mark: z.string(),
  year: z.number().int(),
  capacity: z.number().int(),
  isVerified: z.boolean(),
  photos: z.string().array(),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCar extends z.infer<typeof CarSchema> {
  owner: CompleteUser
  rides: CompleteRide[]
}

/**
 * RelatedCarSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCarSchema: z.ZodSchema<CompleteCar> = z.lazy(() => CarSchema.extend({
  owner: RelatedUserSchema,
  rides: RelatedRideSchema.array(),
}))

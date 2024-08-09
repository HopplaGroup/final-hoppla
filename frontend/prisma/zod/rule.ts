import * as z from "zod"
import { CompleteRide, RelatedRideSchema } from "./index"

export const RuleSchema = z.object({
  id: z.string(),
  description: z.string(),
  price: z.number(),
  rideId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteRule extends z.infer<typeof RuleSchema> {
  ride: CompleteRide
}

/**
 * RelatedRuleSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRuleSchema: z.ZodSchema<CompleteRule> = z.lazy(() => RuleSchema.extend({
  ride: RelatedRideSchema,
}))

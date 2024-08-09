import * as z from "zod"
import { CompleteUser, RelatedUserSchema } from "./index"

export const UserReviewSchema = z.object({
  id: z.string(),
  comment: z.string(),
  rating: z.number(),
  authorId: z.string(),
  revieweeId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUserReview extends z.infer<typeof UserReviewSchema> {
  author: CompleteUser
  reviewee: CompleteUser
}

/**
 * RelatedUserReviewSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserReviewSchema: z.ZodSchema<CompleteUserReview> = z.lazy(() => UserReviewSchema.extend({
  author: RelatedUserSchema,
  reviewee: RelatedUserSchema,
}))

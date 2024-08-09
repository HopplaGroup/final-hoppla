import * as z from "zod"
import { UserSex, UserRole } from "@prisma/client"
import { CompleteDriverVerificationRequest, RelatedDriverVerificationRequestSchema, CompleteRide, RelatedRideSchema, CompleteCar, RelatedCarSchema, CompleteUserReview, RelatedUserReviewSchema } from "./index"

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  mobileNumber: z.string(),
  idNumber: z.string(),
  sex: z.nativeEnum(UserSex),
  birthDate: z.date(),
  rating: z.number(),
  isNewUser: z.boolean(),
  profileImg: z.string(),
  bio: z.string(),
  role: z.nativeEnum(UserRole),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserSchema> {
  driverVerificationRequest?: CompleteDriverVerificationRequest | null
  ridesAsDriver: CompleteRide[]
  ridesAsPassenger: CompleteRide[]
  cars: CompleteCar[]
  userReviewsByMe: CompleteUserReview[]
  userReviewsAboutMe: CompleteUserReview[]
}

/**
 * RelatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserSchema.extend({
  driverVerificationRequest: RelatedDriverVerificationRequestSchema.nullish(),
  ridesAsDriver: RelatedRideSchema.array(),
  ridesAsPassenger: RelatedRideSchema.array(),
  cars: RelatedCarSchema.array(),
  userReviewsByMe: RelatedUserReviewSchema.array(),
  userReviewsAboutMe: RelatedUserReviewSchema.array(),
}))

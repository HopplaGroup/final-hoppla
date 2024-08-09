import * as z from "zod"
import { DriverVerificationRequestStatus } from "@prisma/client"
import { CompleteUser, RelatedUserSchema } from "./index"

export const DriverVerificationRequestSchema = z.object({
  id: z.string(),
  licencePhotos: z.string().array(),
  licenceNumber: z.string(),
  selfie: z.string(),
  status: z.nativeEnum(DriverVerificationRequestStatus),
  driverId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDriverVerificationRequest extends z.infer<typeof DriverVerificationRequestSchema> {
  driver: CompleteUser
}

/**
 * RelatedDriverVerificationRequestSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDriverVerificationRequestSchema: z.ZodSchema<CompleteDriverVerificationRequest> = z.lazy(() => DriverVerificationRequestSchema.extend({
  driver: RelatedUserSchema,
}))

import { z } from "zod";

export const CreateDriverVerifciationRequestSchema = z.object({
  licencePhotos: z.string().array(),
  licenceNumber: z.string(),
  selfie: z.string(),
  driverId: z.string(),
})
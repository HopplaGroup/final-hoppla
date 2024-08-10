import { z } from "zod";

export const CreateDriverVerifciationRequestSchema = z.object({
  licencePhotos: z.tuple([z.string(), z.string()]),
  // licenceNumber: z.string().regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/),
  selfie: z.string(),
  driverId: z.string(),
});

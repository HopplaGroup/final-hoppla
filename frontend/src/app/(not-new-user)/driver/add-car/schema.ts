import { CarType } from "@prisma/client";
import { z } from "zod";

export const CreateCarSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(CarType),
  plate: z.string().regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/),
  mark: z.string(),
  capacity: z.number().int(),
  photos: z.string().array(),
  ownerId: z.string(),
});

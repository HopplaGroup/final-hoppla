import { z } from "zod";
import { UserSex } from "@prisma/client";
import { zodPhoneSchema } from "@/lib/utils/phone-schema";

export const UpdateUserSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  birthDate: z.date(),
  sex: z.nativeEnum(UserSex),
  mobileNumber: zodPhoneSchema
})

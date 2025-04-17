import { z } from "zod";
import { zodPhoneSchema } from "@/lib/utils/phoneSchema";

export const UpdateUserSchema = z.object({
    name: z.string().min(1).max(50),
    mobileNumber: zodPhoneSchema,
    birthDate: z.date(),
    sex: z.enum(["MAN", "WOMAN", "OTHER"]),
    bio: z.string().min(1).max(500),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

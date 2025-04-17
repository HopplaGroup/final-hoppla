import { z } from "zod";
import { ALLOWED_MIME_TYPES, DEFINED_FOLDERS } from "./constants";

export const uploadSchema = z.object({
    category: z.enum(DEFINED_FOLDERS, {
        errorMap: () => ({ message: "Invalid category" }),
    }),
    file: z.instanceof(File).refine(
        (file) => {
            return ALLOWED_MIME_TYPES.includes(file.type);
        },
        {
            message: "Unsupported file type",
        }
    ),
});

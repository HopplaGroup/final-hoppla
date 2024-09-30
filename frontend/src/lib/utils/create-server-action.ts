import { z } from "zod"; // Assuming you're using Zod for schema validation

// Define a generic type for your success and error responses
type Result<T> = { success: true; data: T } | { success: false; error: string };

// Create a higher-order function
export function createServerAction<T, U>(
    schema: z.ZodSchema<T>,
    logic: (data: T) => Promise<U>
) {
    return async (values: T): Promise<Result<U>> => {
        try {
            const data = schema.parse(values);
            const result = await logic(data);
            return { success: true, data: result };
        } catch (error) {
            let errorMessage =
                "An error occurred while processing the request.";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === "string") {
                errorMessage = error;
            }
            // console.error(errorMessage);
            return { success: false, error: errorMessage };
        }
    };
}

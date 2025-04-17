"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import db from "@/lib/utils/db";
import { getUser } from "@/lib/utils/auth";
import { UpdateUserInput, UpdateUserSchema } from "./updateUser.schema";

export default async function updateUser(data: UpdateUserInput) {
    try {
        const user = await getUser();

        if (!user) {
            return {
                success: false,
                error: "User not found",
            };
        }

        const validatedData = UpdateUserSchema.parse(data);

        await db.user.update({
            where: { id: user.id },
            data: {
                ...validatedData,
                isNewUser: false,
            },
        });

        revalidatePath("/");

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: "Validation error",
                details: error.errors,
            };
        }

        console.error("Failed to update user:", error);
        return { success: false, error: "Failed to update user" };
    }
}

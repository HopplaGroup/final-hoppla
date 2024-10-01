"use server";
import { getUser } from "@/lib/utils/auth";
import { createServerAction } from "@/lib/utils/create-server-action";
import db from "@/lib/utils/db";
import { z } from "zod";

const blockUser = createServerAction(
    z.object({
        userId: z.string(),
        blocked: z.boolean(),
    }),
    async ({ userId, blocked }) => {
        const user = await getUser();

        if (!user || user.role !== "ADMIN") {
            throw new Error("You are not allowed to do this action");
        }

        await db.user.update({
            where: { id: userId },
            data: { status: blocked ? "BLOCKED" : "ACTIVE" },
        });

        // not only block cancel all his rides, refund his passengers if ride is not started yet u know veryone who paid and
        // cancel all his trips where he is passenger and refund him
    }
);

export default blockUser;

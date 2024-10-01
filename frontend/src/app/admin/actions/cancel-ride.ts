// cancel ride means refund all passengers and change ride status as canceeled
// also daamato rogorc arshemdgari ride
"use server";

import { createServerAction } from "@/lib/utils/create-server-action";
import db from "@/lib/utils/db";
import { z } from "zod";

const cancelRide = createServerAction(
    z.object({
        rideId: z.string(),
    }),
    async ({ rideId }) => {
        await db.ride.update({
            where: {
                id: rideId,
            },
            data: {
                status: "CANCELLED",
            },
        });
    }
);

export default cancelRide;

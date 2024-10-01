"use server";

import { RIDE_PRICE } from "@/lib/bog/constants";
import refundPayment from "@/lib/bog/refund-payment";
import { createServerAction } from "@/lib/utils/create-server-action";
import db from "@/lib/utils/db";
import { z } from "zod";

const cancelRide = createServerAction(
    z.object({
        rideId: z.string(),
    }),
    async ({ rideId }) => {
        await db.$transaction(async (trx) => {
            const ride = await trx.ride.findUnique({
                where: {
                    id: rideId,
                },
                include: {
                    ridePassengerRequests: {
                        include: {
                            passenger: true,
                        },
                    },
                },
            });

            if (!ride) {
                throw new Error("Ride not found");
            }

            await trx.ride.update({
                where: {
                    id: rideId,
                },
                data: {
                    status: "CANCELLED",
                },
            });

            for (const request of ride.ridePassengerRequests) {
                if (
                    request.status === "ACCEPTED" ||
                    request.status === "PENDING"
                ) {
                    await trx.ridePassengerRequest.update({
                        where: {
                            id: request.id,
                        },
                        data: {
                            status: "CANCELLED",
                        },
                    });
                    if (request.bogOrderId) {
                        const res = await refundPayment(request.bogOrderId);
                        if (!res.success) {
                            await trx.user.update({
                                where: {
                                    id: request.passengerId,
                                },
                                data: {
                                    balance: {
                                        increment: RIDE_PRICE,
                                    },
                                },
                            });
                        }
                    } else {
                        await trx.user.update({
                            where: {
                                id: request.passengerId,
                            },
                            data: {
                                balance: {
                                    increment: RIDE_PRICE,
                                },
                            },
                        });
                    }
                }
            }
        });
    }
);

export default cancelRide;

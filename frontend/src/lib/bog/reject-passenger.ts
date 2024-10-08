"use server";

import { sendRideStatusToPassengerEmail } from "../functions/emails/templates/send-ride-status-to-passenger-email";
import { getUser } from "../utils/auth";
import db from "../utils/db";
import { RIDE_PRICE } from "./constants";
import refundPayment from "./refund-payment";

export default async function rejectPassenger(
    rideId: string,
    passengerId: string
) {
    const user = await getUser();
    if (!user) {
        return {
            success: false,
        };
    }
    try {
        await db.$transaction(async (trx) => {
            const ride = await trx.ride.findUnique({
                where: { id: rideId },
                include: {
                    ridePassengerRequests: true,
                    driver: true,
                },
            });

            if (!ride) {
                throw new Error("Ride not found");
            }

            if (ride.driverId !== user.id) {
                throw new Error("You are not the driver of this ride");
            }

            const ridePassengerRequest =
                await trx.ridePassengerRequest.findUnique({
                    where: {
                        passengerId_rideId: {
                            passengerId,
                            rideId,
                        },
                    },
                });

            if (!ridePassengerRequest) {
                throw new Error("Passenger not found");
            }

            await trx.ridePassengerRequest.update({
                where: {
                    id: ridePassengerRequest.id,
                },
                data: {
                    status: "REJECTED",
                },
            });

            if (ridePassengerRequest.bogOrderId) {
                await refundPayment(ridePassengerRequest.bogOrderId);
            } else {
                await trx.user.update({
                    where: { id: passengerId },
                    data: {
                        balance: {
                            increment: RIDE_PRICE,
                        },
                    },
                });
            }

            try {
                sendRideStatusToPassengerEmail({
                    status: "rejected",
                    to: [passengerId],
                });
            } catch (error) {}
        });
        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
}

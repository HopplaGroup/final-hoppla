"use server";

import { sendRideStatusToPassengerEmail } from "../functions/emails/templates/send-ride-status-to-passenger-email";
import { getUser } from "../utils/auth";
import db from "../utils/db";

export default async function acceptPassenger(
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
                    status: "ACCEPTED",
                },
            });

            try {
                sendRideStatusToPassengerEmail({
                    status: "accepted",
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

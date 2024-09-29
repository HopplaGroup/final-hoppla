"use server";
import { getUser } from "../utils/auth";
import { RIDE_PRICE } from "./constants";
import db from "../utils/db";
import refundPayment from "./refund-payment";

export default async function cancelRide(rideId: string) {
    const user = await getUser();
    if (!user) {
        return {
            success: false,
        };
    }

    try {
        await db.$transaction(async (trx) => {
            const passengerRequest = await trx.ridePassengerRequest.findFirst({
                where: { rideId: rideId, passengerId: user.id },
            });

            if (!passengerRequest) {
                throw new Error("Passenger request not found");
            }

            await trx.ridePassengerRequest.delete({
                where: { id: passengerRequest.id },
            });

            if (
                passengerRequest.status === "ACCEPTED" ||
                !passengerRequest.bogOrderId
            ) {
                await trx.user.update({
                    where: { id: user.id },
                    data: {
                        balance: {
                            increment: RIDE_PRICE,
                        },
                    },
                });
            } else {
                const r = await refundPayment(passengerRequest.bogOrderId);
                if (!r.success) {
                    throw new Error("Refund failed");
                }
            }
        });

        // console.log(RIDE_PRICE, `Ride ${rideId} cancelled by user ${user.id}`);
        return {
            success: true,
        };
    } catch (error) {
        console.error("Amazin spiderman");
        return {
            success: false,
        };
    }
}

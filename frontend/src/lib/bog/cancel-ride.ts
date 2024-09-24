"use server";
import { redirect } from "next/navigation";
import requestOrder from "./request-order";
import { getUser } from "../utils/auth";
import refundPayment from "./refund-payment";
import db from "../utils/db";

export default async function cancelRide(rideId: string) {
    const user = await getUser();
    if (!user) {
        return {
            success: false,
        };
    }
    // Hmm what will happen in callback huh
    try {
        const ridePassenger = await db.ridePassenger.findUnique({
            where: {
                passengerId_rideId: {
                    passengerId: user.id,
                    rideId,
                },
            },
        });
        if (!ridePassenger) {
            return {
                success: false,
            };
        }
        await db.ridePassenger.delete({
            where: {
                passengerId_rideId: {
                    passengerId: user.id,
                    rideId,
                },
            },
        });
        const refundRessponse = await refundPayment(ridePassenger.bogOrderId);
        if (!refundRessponse.success) {
            return {
                success: false,
            };
        }
        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
}

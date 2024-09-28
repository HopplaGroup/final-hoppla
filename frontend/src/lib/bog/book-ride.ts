"use server";
import { redirect } from "next/navigation";
import requestOrder from "./request-order";
import { getUser } from "../utils/auth";
import { RIDE_PRICE } from "./constants";
import db from "../utils/db";
import { revalidatePath } from "next/cache";
import { sendEmailToDriverThatCarIsFull } from "../functions/emails/templates";

const CALLBACK_URL = "https://hoppla.ge/api/bog/callback";

export default async function bookRide(rideId: string) {
    const user = await getUser();
    if (!user) {
        return {
            success: false,
        };
    }

    if (user.balance >= RIDE_PRICE) {
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

                const numberOfPassengers = ride.ridePassengerRequests.filter(
                    (c) => c.status === "ACCEPTED"
                ).length;

                const numberOfPossiblePassengers =
                    ride.ridePassengerRequests.length;

                if (ride.availableSeats <= numberOfPassengers) {
                    throw new Error(
                        "This ride is full and cannot accept more passengers."
                    );
                }

                if (ride.availableSeats === numberOfPossiblePassengers + 1) {
                    await sendEmailToDriverThatCarIsFull({
                        to: [ride.driver],
                    });
                }

                await trx.ridePassengerRequest.create({
                    data: {
                        passengerId: user.id,
                        rideId: rideId,
                    },
                });

                await trx.user.update({
                    where: { id: user.id },
                    data: {
                        balance: {
                            decrement: RIDE_PRICE,
                        },
                    },
                });
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

    const external_order_id = user.id + "_" + rideId;

    const orderRequest = await requestOrder({
        callback_url: CALLBACK_URL,
        external_order_id,
        redirect_urls: {
            success: "https://hoppla.ge/rides/" + rideId + "?success=true",
            fail: "https://hoppla.ge/rides/" + rideId + "?success=false",
        },
        purchase_units: {
            total_amount: RIDE_PRICE,
            basket: [
                { product_id: rideId, quantity: 1, unit_price: RIDE_PRICE },
            ],
        },
    });

    if (orderRequest.success) {
        redirect(orderRequest._links.redirect.href);
    } else {
        return {
            success: false,
        };
    }
}

import { PrismaClient } from "@prisma/client";
import { menv } from "./menv";
import { sendEmailToDriverThatCarIsFull } from "../functions/emails/templates";
import { REFUND_PRICE } from "../bog/constants";

const prismaClientSingleton = () => {
    const prismaClient = new PrismaClient();

    return prismaClient.$extends({
        query: {
            userReview: {
                create: async ({ args, query }) => {
                    // USER will review if had at least one ride with the driver and then create review
                    // TODO: author.ridesAsDriver?[ridePassengers?[passengerId == auth().id]]
                    const result = await query(args);
                    return result;
                },
            },
            ride: {
                update: async ({ args, query }) => {
                    // We need only cancel or also delete the ride?
                    // TODO:
                    // check if who is trying to cancel the ride
                    // driver can cancel ride and also admin can cancel ride
                    // if car status updated as cancelled, send email to all passengers
                    // we should return all money which is paid by passengers
                    // send email to all passengers and driver that the ride is cancelled
                },
            },
            ridePassengerRequest: {
                // Do i need this delete function? when ride deleted? or ride cannot be deleted just canceled?
                // When ride deleted, does these delete function called as well?
                delete: async ({ args, query }) => {
                    return await prismaClient.$transaction(async (trx) => {
                        const deleteResult =
                            await trx.ridePassengerRequest.delete(args);

                        const rideDetails = await trx.ride.findUnique({
                            where: {
                                id: deleteResult.rideId,
                            },
                            include: {
                                ridePassengerRequests: true,
                                _count: {
                                    select: { ridePassengerRequests: true },
                                },
                            },
                        });

                        if (
                            rideDetails &&
                            rideDetails.ridePassengerRequests.filter(
                                (r) => r.status === "ACCEPTED"
                            ).length ===
                                rideDetails.availableSeats - 1
                        ) {
                            // TODO: send email to driver that car is not full anymore
                        }
                        // if status of this was accepted, then refund on website balance
                        // if status of this was pending, then refund on credit card
                        // TODO:
                        if (deleteResult.status === "ACCEPTED") {
                            await trx.user.update({
                                where: { id: deleteResult.passengerId },
                                data: {
                                    balance: {
                                        increment: REFUND_PRICE,
                                    },
                                },
                            });
                        } else {
                            await trx.user.update({
                                where: { id: deleteResult.passengerId },
                                data: {
                                    balance: {
                                        increment: REFUND_PRICE,
                                    },
                                },
                            });
                        }

                        return deleteResult;
                    });
                },
                create: async ({ args, query }) => {
                    // When passenger create ridePassenger, decrement balance from passenger in transaction and add intro passenger if balance of passenger is greater than the price of the ride
                    const ride = await prismaClient.ride.findUnique({
                        where: { id: args.data.rideId },
                        include: {
                            _count: { select: { ridePassengerRequests: true } },
                            driver: true,
                        },
                    });
                    if (
                        ride &&
                        ride.availableSeats <= ride._count.ridePassengerRequests
                    ) {
                        throw new Error(
                            "This ride is full and cannot accept more passengers."
                        );
                    }
                    const result = await query(args);
                    const passenger = await prismaClient.user.findUnique({
                        where: { id: args.data.passengerId },
                    });
                    if (passenger && passenger.balance >= REFUND_PRICE) {
                        await prismaClient.user.update({
                            where: { id: args.data.passengerId },
                            data: {
                                balance: {
                                    decrement: REFUND_PRICE,
                                },
                            },
                        });
                    }
                    if (
                        ride &&
                        ride.availableSeats ===
                            ride._count.ridePassengerRequests + 1
                    ) {
                        await sendEmailToDriverThatCarIsFull({
                            to: [ride.driver],
                        });
                    }

                    return result;
                },
            },
        },
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = global.prisma ?? prismaClientSingleton();

export default db;

if (menv.NODE_ENV !== "production") global.prisma = db;

import { PrismaClient } from "@prisma/client";
import { menv } from "./menv";
import { sendEmailToDriverThatCarIsFull } from "../functions/emails/templates";
import refundPayment from "../bog/refund-payment";

const prismaClientSingleton = () => {
    const prismaClient = new PrismaClient();

    return prismaClient.$extends({
        query: {
            // userUserFavorite: {
            //     create: async ({ args, query }) => {
            //         const result = await query(args);
            //         if (result.userId && result.favoriteId) {
            //             await prismaClient.userNotification.create({
            //                 data: {
            //                     userId: result.favoriteId,
            //                     delegate_aux_userFavoritedNotification: {
            //                         create: {
            //                             favouritedById: result.userId,
            //                         },
            //                     },
            //                     type: "UserFavoritedNotification",
            //                 },
            //             });
            //         }
            //         return result;
            //     },
            // },
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
            ridePassenger: {
                // Do i need this delete function? when ride deleted? or ride cannot be deleted just canceled?
                // When ride deleted, does these delete function called as well?
                delete: async ({ args, query }) => {
                    return await prismaClient.$transaction(async (trx) => {
                        const deleteResult = await trx.ridePassenger.delete(
                            args
                        );

                        const rideDetails = await trx.ride.findUnique({
                            where: {
                                id: deleteResult.rideId,
                            },
                            include: {
                                _count: { select: { ridePassengers: true } },
                            },
                        });

                        if (
                            rideDetails &&
                            rideDetails._count.ridePassengers ===
                                rideDetails.availableSeats
                        ) {
                            console.log(
                                "Ride is not full anymore, sending email..."
                            );
                            // TODO: send email to driver that car is not full anymore
                        }

                        const REFUND_PRICE = 0.1;
                        const refundResponse = await refundPayment(
                            deleteResult.bogOrderId,
                            REFUND_PRICE
                        );

                        if (!refundResponse.success) {
                            throw new Error("Refund failed");
                        }

                        return deleteResult;
                    });
                },
                create: async ({ args, query }) => {
                    const ride = await prismaClient.ride.findUnique({
                        where: { id: args.data.rideId },
                        include: {
                            _count: { select: { ridePassengers: true } },
                            driver: true,
                        },
                    });
                    if (
                        ride &&
                        ride.availableSeats <= ride._count.ridePassengers
                    ) {
                        throw new Error(
                            "This ride is full and cannot accept more passengers."
                        );
                    }
                    const result = await query(args);
                    if (
                        ride &&
                        ride.availableSeats === ride._count.ridePassengers + 1
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

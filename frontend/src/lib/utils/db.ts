import { PrismaClient } from "@prisma/client";
import { menv } from "./menv";
import { sendEmailToDriverThatCarIsFull } from "../functions/emails/templates";

const prismaClientSingleton = () => {
    const prismaClient = new PrismaClient();

    return prismaClient.$extends({
        query: {
            userUserFavorite: {
                create: async ({ args, query }) => {
                    const result = await query(args);
                    if (result.userId && result.favoriteId) {
                        await prismaClient.userNotification.create({
                            data: {
                                userId: result.favoriteId,
                                delegate_aux_userFavoritedNotification: {
                                    create: {
                                        favouritedById: result.userId,
                                    },
                                },
                                type: "UserFavoritedNotification",
                            },
                        });
                    }
                    return result;
                },
            },
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
                    // TODO:
                    // driver can cancel ride and also admin can cancel ride
                    // if car status updated as cancelled, send email to all passengers
                    // we should return all money which is paid by passengers
                    // send email to all passengers and driver that the ride is cancelled
                },
            },
            ridePassenger: {
                delete: async ({ args, query }) => {
                    // TODO:
                    // if ride is full and one passenger cancelled, send email to driver that car is not full anymore
                    // also the money should be returned to the passenger account balance
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

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
            ridePassenger: {
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

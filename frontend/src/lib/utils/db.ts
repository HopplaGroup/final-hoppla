import { PrismaClient } from "@prisma/client";
import { menv } from "./menv";

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
        },
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = global.prisma ?? prismaClientSingleton();

export default db;

if (menv.NODE_ENV !== "production") global.prisma = db;

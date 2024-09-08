import "server-only";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cache } from "react";
import db from "./db";

export const getUser = cache(async () => {
    try {
        let email = "";
        if (process.env.AUTH_TESTER_EMAIL) {
            email = process.env.AUTH_TESTER_EMAIL;
        } else {
            const { getUser: _getKindeUser } = getKindeServerSession();
            const kindeUser = await _getKindeUser();
            if (!kindeUser) {
                throw new Error("Kinde user not found");
            }
            email = kindeUser.email || "";
        }
        const dbUser = await db.user.findUnique({
            where: { email },
        });

        return dbUser;
    } catch (error) {
        console.error(error);
        return null;
    }
});

export const createUser = async () => {
    try {
        const { getUser: _getKindeUser } = getKindeServerSession();

        const kindeUser = await _getKindeUser();

        if (!kindeUser || kindeUser === null || !kindeUser.id) {
            throw new Error("Something went wrong, sorry...");
        }

        let dbUser = await db.user.findUnique({
            where: {
                email: kindeUser.email ?? "",
            },
        });

        if (!dbUser) {
            dbUser = await db.user.create({
                data: {
                    email: kindeUser.email || "",
                    name: `${kindeUser.given_name || ""} ${
                        kindeUser.family_name || ""
                    }`,
                    profileImg: kindeUser.picture || "",
                    bio: "This is small bio...",
                    birthDate: new Date(),
                    idNumber: "5900...",
                    mobileNumber: "+995...",
                },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

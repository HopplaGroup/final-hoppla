import { menv } from "@/lib/utils/menv";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/utils/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { getUser: _getKindeUser } = getKindeServerSession();

        const kindeUser = await _getKindeUser();

        if (
            !kindeUser ||
            kindeUser === null ||
            !kindeUser.id ||
            !kindeUser.email
        ) {
            throw new Error("Something went wrong, sorry...");
        }

        let dbUser = await db.user.findUnique({
            where: {
                email: kindeUser.email,
            },
        });

        const firstName = kindeUser.given_name || "";
        const lastName = kindeUser.family_name || "";
        const fullName = `${firstName} ${lastName}`.trim() || "Default Name";

        if (!dbUser) {
            dbUser = await db.user.create({
                data: {
                    email: kindeUser.email,
                    name: fullName,
                    profileImg: kindeUser.picture || "/default-pfp.jpg",
                },
            });
        }
    } catch (error) {
        return NextResponse.redirect(
            menv.NEXT_PUBLIC_URL + "/error-creating-user"
        );
    }
    return NextResponse.redirect(menv.NEXT_PUBLIC_URL + "/onboarding");
}

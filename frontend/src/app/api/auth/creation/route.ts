import { createUser } from "@/lib/utils/auth";
import { menv } from "@/lib/utils/menv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await createUser();
    return NextResponse.redirect(menv.PRISMA_USER_CREATION_REDIRECT_URL);
}

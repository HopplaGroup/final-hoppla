import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = (req: NextRequest, res: NextResponse) => {
    return handleAuth()(req, res);
};

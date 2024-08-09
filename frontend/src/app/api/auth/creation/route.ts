import { createUser } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  await createUser();
  return NextResponse.redirect(process.env.PRISMA_USER_CREATION_REDIRECT_URL!);
}

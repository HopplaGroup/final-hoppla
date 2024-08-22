import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";

async function getPrisma() {
  const user = await getUser();
  return enhance(db, { user });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};

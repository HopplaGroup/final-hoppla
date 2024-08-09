"use server";

import { createServerAction } from "@/lib/utils/create-server-action";
import { CreateDriverVerifciationRequestSchema } from "./schema";
import db from "@/lib/utils/db";

export const createDriverVerificationRequest = createServerAction(
  CreateDriverVerifciationRequestSchema,
  async (input) => {
    await db.driverVerificationRequest.create({
      data: {
        ...input,
        status: "PENDING",
      },
    });
  }
);

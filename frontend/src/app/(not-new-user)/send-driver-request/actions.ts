"use server";

import { createServerAction } from "@/lib/utils/create-server-action";
import { CreateDriverVerifciationRequestSchema } from "./schema";
import db from "@/lib/utils/db";
import { z } from "zod";

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

export const updateDriverVerificationRequest = createServerAction(
  CreateDriverVerifciationRequestSchema.partial().extend({
    id: z.string(),
  }),
  async (input) => {
    await db.driverVerificationRequest.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
        // status: input.status,
      },
    });
  }
);

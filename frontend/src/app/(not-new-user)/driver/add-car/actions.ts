"use server";

import { createServerAction } from "@/lib/utils/create-server-action";
import { CreateCarSchema } from "./schema";
import db from "@/lib/utils/db";
import { z } from "zod";

export const createCar = createServerAction(CreateCarSchema, async (input) => {
  await db.car.create({
    data: {
      ...input,
      isVerified: true,
    },
  });
});

export const updateCar = createServerAction(
  CreateCarSchema.partial().extend({
    id: z.string(),
  }),
  async (input) => {
    await db.driverVerificationRequest.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
  }
);

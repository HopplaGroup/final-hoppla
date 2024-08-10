"use server";

import { createServerAction } from "@/lib/utils/create-server-action";
import { CreateRideSchema } from "./schema";
import db from "@/lib/utils/db";
import { z } from "zod";

export const createRide = createServerAction(
  CreateRideSchema,
  async (input) => {
    await db.ride.create({
      data: {
        ...input,
      },
    });
  }
);

"use server";

import { createServerAction } from "@/lib/utils/create-server-action";
import { CreateRideSchema } from "./schema";
import db from "@/lib/utils/db";
import { z } from "zod";
import api from "@/lib/utils/api";
import PLACES from "@/lib/constants/places";
import { menv } from "@/lib/utils/menv";

export const createRide = createServerAction(
  CreateRideSchema,
  async (input) => {
    await db.ride.create({
      data: {
        // ...input,
        availableSeats: input.availableSeats,
        price: input.price,
        from: input.from,
        to: input.to,
        departure: input.departure,
        duration: input.duration,
        distance: input.distance,
        driverId: input.driverId,
        carId: input.carId,
        rules: {
          connect: input.ruleIds
            ? input.ruleIds.map((id) => ({ id }))
            : undefined,
        },
      },
    });
  }
);

export const getDirections = createServerAction(
  z.object({
    from: z.string(),
    to: z.string(),
  }),
  async ({ from, to }) => {
    const ORS_URL = menv.ORS_URL;

    const origin = PLACES.find((place) => place.osm === from);

    if (!origin) {
      throw new Error("Not Found");
    }

    const destination = PLACES.find((place) => place.osm === to);

    if (!destination) {
      throw new Error("Not Found");
    }

    const response = await fetch(
      `${ORS_URL}/ors/v2/directions/driving-car?start=${origin.lon},${origin.lat}&end=${destination.lon},${destination.lat}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // return data;
    return {
      distance: data.features[0].properties.summary.distance as number,
      duration: data.features[0].properties.summary.duration as number,
      path: data.features[0].geometry.coordinates.map((c: [number, number]) => [
        c[1],
        c[0],
      ]),
    };
  }
);

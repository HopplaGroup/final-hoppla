"use client";
import RideCard from "@/app/(not-new-user)/(with-navbar-and-footer)/search/_components/ride-card";
import { RideResponse } from "@/app/(not-new-user)/(with-navbar-and-footer)/search/response-ride-type";
import * as m from "@/paraglide/messages.js";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Separator } from "../ui/separator";
import { useFindManyRide } from "@/lib/hooks";
import { useMemo } from "react";
import RideCardEmpty from "@/app/(not-new-user)/(with-navbar-and-footer)/search/_components/ride-card-empty";

type UpcomingRidesLandingProps = {};

export default function UpcomingRidesLanding({}: UpcomingRidesLandingProps) {
  const date = useMemo(() => new Date(), []);
  const { data: currentRides } = useFindManyRide({
    include: {
      car: true,
      driver: true,
      ridePassengerRequests: {
        include: {
          passenger: true,
        },
        where: {
          status: "ACCEPTED",
        },
      },
      rideRules: {
        include: {
          rule: true,
        },
      },
    },
    where: {
      status: "ACTIVE",
      startedConfirmations: {
        none: {},
      },
      departure: {
        gt: date,
      },
      driver: {
        driverVerificationRequest: {
          status: "APPROVED",
        },
      },
      car: {
        status: "APPROVED",
      },
    },
    orderBy: {
      departure: "desc",
    },
    take: 10,
  });

  console.log("currentRides", currentRides);

  const mappedCurrentRides = currentRides?.map(
    (ride) =>
      ({
        availableSeats: ride.availableSeats,
        departure: new Date(ride.departure),
        distance: ride.distance,
        to: ride.to,
        duration: ride.duration,
        from: ride.from,
        id: ride.id,
        price: String(ride.price),
        car: {
          id: ride.car.id,
          type: ride.car.type,
        },
        driver: {
          id: ride.driver.id,
          name: ride.driver.name,
          profileImg: ride.driver.profileImg,
          averageRating: 0,
        },
        passengers: ride.ridePassengerRequests.map((passenger) => ({
          id: passenger.passenger.id,
          name: passenger.passenger.name,
          profileImg: passenger.passenger.profileImg,
        })),
        rules: ride.rideRules.map((rule) => ({
          id: rule.id,
          description: rule.rule.description,
        })),
      } as RideResponse)
  );

  if (!mappedCurrentRides || mappedCurrentRides.length === 0) return null;

  return (
    <div className="mt-32">
      <div className="max-w-2xl mb-4 mx-auto text-center ">
        <h2 className="text-xl font-bold text-gray-800">
          {m.game_tiny_crossbill_devour()}
        </h2>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {mappedCurrentRides?.slice(0, 3).map((ride, index) => (
            <RideCard ride={ride} key={index} forceCompact showDate />
          ))}

          {[...Array(Math.max(0, 3 - (mappedCurrentRides?.length || 0)))].map(
            (_, index) => (
              <RideCardEmpty key={`empty-${index}`} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

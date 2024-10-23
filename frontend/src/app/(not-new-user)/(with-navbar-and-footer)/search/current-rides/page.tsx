"use client";
import React from "react";
import RideCard from "../_components/ride-card";
import { RideResponse } from "../response-ride-type";
import { Separator } from "@/components/ui/separator";
import { useFindManyRide } from "@/lib/hooks";
import { useUser } from "@/lib/providers/user-provider";

import * as m from "@/paraglide/messages.js";

const CurrentRides = () => {
  //= const currentRides: RideResponse[] = [fakeRide];

  const { user } = useUser();
  const { data: currentRides, isLoading } = useFindManyRide(
    {
      where: {
        status: "ACTIVE",
        OR: [
          {
            driverId: user?.id,
          },
          {
            ridePassengerRequests: {
              some: {
                passengerId: user?.id,
                status: {
                  in: ["ACCEPTED", "PENDING"],
                },
              },
            },
          },
        ],
      },
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
    },
    {
      enabled: !!user,
    }
  );
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
  return (
    <div className="container">
      <div className="text-2xl text-center mt-4">
        {m.full_same_gecko_express()}
      </div>
      <Separator className="mt-4 mb-8" />

      {mappedCurrentRides && mappedCurrentRides.length > 0 ? (
        <div className="space-y-4">
          {mappedCurrentRides
            .toSorted((a, b) => {
              if (a.driver.id === user?.id) return -1;
              if (b.driver.id === user?.id) return 1;
              return 0; // Keep others in same order
            })
            .map((ride) => (
              <RideCard key={ride.id} ride={ride} showDate />
            ))}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="text-center text-gray-500">{`${m.wide_tired_shell_favor()}...`}</div>
          ) : (
            <div className="text-center text-gray-500">
              {m.cuddly_small_samuel_pride()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentRides;

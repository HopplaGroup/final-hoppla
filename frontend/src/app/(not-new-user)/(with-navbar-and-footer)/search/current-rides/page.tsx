"use client";
import React from "react";
import RideCard from "../_components/ride-card";
import { RideResponse } from "../response-ride-type";
import { Separator } from "@/components/ui/separator";
import { useFindManyRide } from "@/lib/hooks";
import { useUser } from "@/lib/providers/user-provider";

import * as m from "@/paraglide/messages.js";
const fakeRide: RideResponse = {
  id: "ride123",
  availableSeats: 3,
  price: "25.00",
  from: "Tbilisi",
  to: "Batumi",
  departure: new Date("2024-10-15T09:00:00"),
  distance: 370,
  duration: 300, // in minutes
  driver: {
    id: "driver456",
    profileImg: "https://example.com/driver123.jpg",
    name: "Demetre Shonia",
    averageRating: 4.8,
  },
  car: {
    id: "car789",
    type: "STANDARD",
  },
  rules: [
    {
      id: "rule1",
      description: "No smoking",
    },
    {
      id: "rule2",
      description: "No pets",
    },
  ],
  passengers: [
    {
      id: "passenger101",
      profileImg: "https://example.com/passenger101.jpg",
      name: "Misho Dzuliashvili",
    },
    {
      id: "passenger102",
      profileImg: "https://example.com/passenger102.jpg",
      name: "John Doe",
    },
  ],
};

const CurrentRides = () => {
  // const currentRides: RideResponse[] = [fakeRide];

  const { user } = useUser();
  const { data: currentRides, isLoading } = useFindManyRide(
    {
      where: {
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
              <RideCard key={ride.id} ride={ride} />
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

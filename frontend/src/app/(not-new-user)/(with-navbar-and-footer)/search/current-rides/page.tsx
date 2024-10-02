import React from "react";
import RideCard from "../_components/ride-card";
import { RideResponse } from "../response-ride-type";
import { Separator } from "@/components/ui/separator";

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
  const currentRides: RideResponse[] = [fakeRide];
  return (
    <div className="container">
      <div className="text-2xl text-center mt-4">Your current rides</div>
      <Separator className="mt-4 mb-8" />

      {currentRides && currentRides.length > 0 ? (
        <div>
          {currentRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          You have not booked any rides yet.
        </div>
      )}
    </div>
  );
};

export default CurrentRides;

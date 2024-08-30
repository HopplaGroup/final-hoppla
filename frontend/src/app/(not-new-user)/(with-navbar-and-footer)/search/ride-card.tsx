import React, { Suspense } from "react";
import PlaceTitle from "./place-title";
import Link from "next/link";

type RideCardProps = {
  ride: {
    id: string;
    driver: { name: string };
    from: string;
    to: string;
    departure: Date;
    availableSeats: number;
    passengers: any[];
  };
};

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  return (
    <Link href={`/rides/${ride.id}`}>
      <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold">{ride.driver.name}</h2>
        <p>
          From:{" "}
          <Suspense fallback={"Loading..."}>
            <PlaceTitle osm={ride.from} />
          </Suspense>
        </p>
        <p>
          To:{" "}
          <Suspense fallback={"Loading..."}>
            <PlaceTitle osm={ride.to} />
          </Suspense>
        </p>
        <p>Departure: {ride.departure.toLocaleString()}</p>
        <p>Available Seats: {ride.availableSeats - ride.passengers.length}</p>
      </div>
    </Link>
  );
};

export default RideCard;

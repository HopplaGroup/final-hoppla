import RideCard from "@/app/(not-new-user)/(with-navbar-and-footer)/search/_components/ride-card";
import { RideResponse } from "@/app/(not-new-user)/(with-navbar-and-footer)/search/response-ride-type";
import * as m from "@/paraglide/messages.js";

type AvailableRidesProps = {};

const fakeRide: RideResponse = {
  id: "ride123",
  availableSeats: 3,
  price: "20.00",
  from: "Tbilisi",
  to: "Batumi",
  departure: new Date("2024-10-10T09:00:00"),
  distance: 370,
  duration: 330, // in minutes (5 hours 30 minutes)
  driver: {
    id: "driver456",
    profileImg: "",
    name: "Misho Dzuliashvili",
    averageRating: 4.8,
  },
  car: {
    id: "car789",
    type: "STANDARD",
  },
  rules: [
    { id: "No Smoking", description: "No Smoking" },
    { id: "Only Woman", description: "Only Woman" },
    { id: "No Music", description: "No Music" },
  ],
  passengers: [
    { id: "passenger1", profileImg: "/images/passenger1.jpg", name: "Anna" },
    { id: "passenger2", profileImg: "/images/passenger2.jpg", name: "Giorgi" },
  ],
};

export default function AvailableRides({}: AvailableRidesProps) {
  const currentRides: RideResponse[] = [fakeRide];
  return (
    <div className="container">
      <RideCard ride={fakeRide} forceCompact />
    </div>
  );
}

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
    <div className="mt-32">
      <div className="max-w-2xl mb-4 mx-auto text-center ">
        <h2 className="text-2xl font-bold text-gray-800">
          {m.game_tiny_crossbill_devour()}
        </h2>
      </div>
      <div className="container">
        <div className="sm:hidden w-full max-w-[100vw] overflow-hidden px-2 md:px-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full "
          >
            <CarouselContent className="-ml-2 md:-ml-4 min-h-[200px]">
              {currentRides.map((ride, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <RideCard ride={ride} forceCompact />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
            </div>
          </Carousel>
        </div>
        <div className="hidden sm:flex  items-center justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="p-1">
                      <RideCard ride={fakeRide} forceCompact />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:block" />
            <CarouselNext className="hidden sm:block" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

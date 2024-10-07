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

type AvailableRidesProps = {};

export default function AvailableRides({}: AvailableRidesProps) {
    const { data: currentRides } = useFindManyRide({
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
        orderBy: {
            departure: "desc",
        },
        take: 10,
    });

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
                            {mappedCurrentRides?.map((ride, index) => (
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
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <div className="p-1">
                                            {/* <RideCard
                                                ride={fakeRide}
                                                forceCompact
                                            /> */}
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

"use client";

import { RIDE_PRICE } from "@/lib/bog/constants";
import {
    useAggregateRide,
    useCountRide,
    useCountUser,
    useFindManyRide,
} from "@/lib/hooks";
import { Coins, MapPin, Users } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export default function Stats() {
    const { data: totalUserCount, isLoading: isUserCountLoading } =
        useCountUser(
            {},
            {
                refetchOnWindowFocus: false,
            }
        );

    // const { data: allRides } = useFindManyRide({
    //     where: {
    //         startedConfirmations: {
    //             some: {},
    //         },
    //     },
    //     select: {
    //         price: true,
    //         ridePassengerRequests: {
    //             select: {
    //                 preferredPrice: true,
    //                 passengerId: true,
    //             },
    //         },
    //         startedConfirmations: {
    //             select: {
    //                 userId: true,
    //             },
    //         },
    //     },
    // });

    // const totalServiceRevenue =
    //     allRides?.reduce((acc, ride) => {
    //         return (
    //             acc +
    //             ride.ridePassengerRequests
    //                 .filter((request) =>
    //                     ride.startedConfirmations.some(
    //                         (confirmation) =>
    //                             confirmation.userId === request.passengerId
    //                     )
    //                 )
    //                 .reduce((acc, request) => {
    //                     return acc + (request.preferredPrice || ride.price);
    //                 }, 0)
    //         );
    //     }, 0) || 0;

    const { data: totalStartedRideCount, isLoading: isRideCountLoading } =
        useCountRide(
            {
                where: {
                    startedConfirmations: {
                        some: {},
                    },
                },
            },
            {
                refetchOnWindowFocus: false,
            }
        );

    return (
        <div className="flex flex-wrap gap-5 items-center">
            <div className="w-[200px] rounded-lg border-2 bg-white p-8">
                <div className="h-12">
                    <Users className="text-primary" size={32} />
                </div>
                <div className="my-2">
                    {isUserCountLoading && <Skeleton height={"40px"} />}
                    {!isUserCountLoading && (
                        <h2 className="text-4xl font-bold h-[40px] inline-block">
                            <span>{totalUserCount}</span> +
                        </h2>
                    )}
                </div>

                <div>
                    <p className="mt-2 font-sans text-base font-medium text-gray-500">
                        Total Users
                    </p>
                </div>
            </div>
            <div className="w-[200px] rounded-lg border-2 bg-white p-8">
                <div className="h-12">
                    <MapPin className="text-primary" size={32} />
                </div>
                <div className="my-2">
                    {isRideCountLoading && <Skeleton height={"40px"} />}
                    {!isRideCountLoading && (
                        <h2 className="text-4xl font-bold h-[40px] inline-block">
                            <span>{totalStartedRideCount}</span> +
                        </h2>
                    )}
                </div>

                <div>
                    <p className="mt-2 font-sans text-base font-medium text-gray-500">
                        All Started Rides
                    </p>
                </div>
            </div>
            <div className="w-[200px] rounded-lg border-2 bg-white p-8">
                <div className="h-12">
                    <Coins className="text-primary" size={32} />
                </div>
                <div className="my-2">
                    {isRideCountLoading && <Skeleton height={"40px"} />}
                    {!isRideCountLoading && (
                        <h2 className="text-4xl font-bold h-[40px] inline-block">
                            <span>
                                {(totalStartedRideCount || 0) * RIDE_PRICE}
                            </span>{" "}
                            ₾
                        </h2>
                    )}
                </div>

                <div>
                    <p className="mt-2 font-sans text-base font-medium text-gray-500">
                        Service Revenue
                    </p>
                </div>
            </div>
        </div>
    );
}

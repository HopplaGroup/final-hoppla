"use client";
import { Button } from "@/components/ui/button";
import {
    useCreateRidePassenger,
    useFindUniqueRide,
    useUpdateRide,
} from "@/lib/hooks";
import {
    Bookmark,
    Calendar,
    CarTaxiFront,
    Check,
    ChevronDown,
    CircleDot,
    Clock,
    DollarSign,
    MapPin,
    PanelTopDashed,
    Type,
    User,
    Users,
    Image,
    FlagTriangleRight,
    CheckCheck,
} from "lucide-react";
import { format } from "date-fns";
import { languageTag } from "@/paraglide/runtime";
import PLACES from "@/lib/constants/places";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ContentWithReviews from "../../users/[userId]/content-with-reviews";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function Ride({ rideId, userId }: { rideId: string; userId: string }) {
    const { data: ride, isPending } = useFindUniqueRide({
        where: {
            id: rideId,
        },
        include: {
            driver: true,
            ridePassengers: {
                include: {
                    passenger: true,
                },
            },
            car: true,
            rideRules: {
                include: {
                    rule: true,
                },
            },
        },
    });

    // const { mutate, isPending: isBookingRide } = useUpdateRide();
    const { mutate: createPassenger, isPending: isBookingRide } =
        useCreateRidePassenger();
    const router = useRouter();

    function bookRide() {
        createPassenger({
            data: {
                passengerId: userId,
                rideId: rideId,
            },
        });
    }

    return (
        <ContentWithReviews userId={ride?.driver.id}>
            {isPending ? (
                <RideSkeleton />
            ) : ride ? (
                <>
                    <div className="flex items-center justify-between">
                        <div className="bg-primary/10 size-16 flex items-center justify-center rounded-full">
                            <Check
                                className="text-primary font-bold"
                                size={24}
                            />
                        </div>
                    </div>
                    <h3 className="mt-5 font-semibold">Ride booking</h3>
                    <h2 className="mt-2 font-bold text-3xl">
                        {/* 28 April */}
                        {/* get the only day here */}
                        {format(ride.departure, "d MMMM", {
                            // locale: languageTag(),
                        })}
                    </h2>
                    <Accordion
                        defaultValue={["ride", "car"]}
                        className="mt-4"
                        type="multiple"
                    >
                        <AccordionItem value="ride" className="mb-4">
                            <AccordionTrigger className="bg-white p-4 rounded-md">
                                <span className="font-semibold">
                                    Details about the ride
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="max-w-md mt-5">
                                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                <CircleDot size={22} />
                                                From
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {
                                                    PLACES.find(
                                                        (place) =>
                                                            place.osm ===
                                                            ride.from
                                                    )?.name[languageTag()]
                                                }
                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                <MapPin size={22} />
                                                To
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {" "}
                                                {
                                                    PLACES.find(
                                                        (place) =>
                                                            place.osm ===
                                                            ride.to
                                                    )?.name[languageTag()]
                                                }
                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900  flex items-center gap-2">
                                                <DollarSign size={22} /> Price
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {ride.price} GEL
                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900  flex items-start gap-2">
                                                <CheckCheck size={22} /> Rules
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {ride.rideRules.map(
                                                    ({ rule }) => (
                                                        <div key={rule.id}>
                                                            {rule.description}
                                                        </div>
                                                    )
                                                )}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900  flex items-center gap-2">
                                                <Clock size={22} /> Departure
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {/* 28 April 2022, 10:00 */}
                                                {format(
                                                    ride.departure,
                                                    "d MMMM yyyy, HH:mm",
                                                    {
                                                        // locale: languageTag(),
                                                    }
                                                )}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                <User size={22} /> Driver
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                <Link
                                                    href={`/users/${ride.driver.id}`}
                                                    className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-2 pr-3 py-2 font-semibold"
                                                >
                                                    <img
                                                        src={
                                                            ride.driver
                                                                .profileImg
                                                        }
                                                        // src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                                                        className="size-6 rounded-full object-cover"
                                                        alt=""
                                                    />
                                                    <span>
                                                        {ride.driver.name}
                                                    </span>
                                                </Link>
                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                <Users size={22} /> Passengers
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {ride.ridePassengers.length >
                                                0 ? (
                                                    <div className="inline-flex -space-x-1 overflow-hidden bg-primary/10 text-primary rounded-full px-2 py-2 font-semibold">
                                                        {ride.ridePassengers.map(
                                                            ({ passenger }) => (
                                                                <Link
                                                                    href={
                                                                        "/users/" +
                                                                        passenger.id
                                                                    }
                                                                    key={
                                                                        passenger.id
                                                                    }
                                                                >
                                                                    <img
                                                                        src={
                                                                            passenger.profileImg
                                                                        }
                                                                        // src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                                                                        className="size-6 border-background border-2 rounded-full object-cover"
                                                                        alt=""
                                                                    />
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    "No passengers yet"
                                                )}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900">
                                                {!ride.ridePassengers.find(
                                                    ({ passengerId }) =>
                                                        passengerId === userId
                                                ) &&
                                                    ride.driverId !==
                                                        userId && (
                                                        <Button
                                                            disabled={
                                                                isBookingRide
                                                            }
                                                            onClick={bookRide}
                                                        >
                                                            {/* TODO: if no seats remaining no ride booking button then */}
                                                            Book Ride
                                                        </Button>
                                                    )}
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                There is still{" "}
                                                {ride.availableSeats -
                                                    ride.ridePassengers
                                                        .length}{" "}
                                                places remaining
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="car">
                            <AccordionTrigger className="bg-white p-4 rounded-md">
                                <span className="font-semibold">
                                    Car Details
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="max-w-md mt-5">
                                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                <Type size={22} />
                                                Type
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {ride.car.type}
                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                <PanelTopDashed size={22} />
                                                Plate
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {ride.car.plate}
                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900  flex items-center gap-2">
                                                <CarTaxiFront size={22} /> Mark
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {ride.car.mark}
                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900  flex items-center gap-2">
                                                <Users size={22} /> Capacity
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                {ride.car.capacity}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-start gap-2">
                                                <Image size={22} /> Photo
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-md px-2 py-2 font-semibold">
                                                    <img
                                                        src={
                                                            ride.car
                                                                .photos?.[0] ||
                                                            ""
                                                        }
                                                        // src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                                                        className="size-40 rounded-md object-cover"
                                                        alt=""
                                                    />
                                                </div>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            ) : (
                "Ride not exists"
            )}
        </ContentWithReviews>
    );
}

function RideSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="flex gap-4 mb-6">
                <div className="h-6 w-40 bg-gray-200 rounded"></div>
                <div className="h-6 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 w-full bg-gray-200 rounded mb-6"></div>
            {[...Array(7)].map((_, index) => (
                <div key={index} className="flex gap-4 mb-4">
                    <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
                </div>
            ))}
        </div>
    );
}

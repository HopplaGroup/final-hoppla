"use client";
import { Button } from "@/components/ui/button";
import {
    useCreateRidePassenger,
    useDeleteRidePassenger,
    useFindManyUserReview,
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
    Stars,
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
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { ruleToIcon } from "../../search/_components/rule-icons";
import bookRide from "@/lib/bog/book-ride";

export function Ride({
    rideId,
    userId,
}: {
    rideId: string;
    userId: string | undefined;
}) {
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

    const { data: userReviews, isLoading: isUserReviewsLoading } =
        useFindManyUserReview(
            {
                where: {
                    revieweeId: ride?.driverId,
                },
                include: {
                    author: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            {
                enabled: !!ride?.driverId,
            }
        );

    const averageUserRating = useMemo(() => {
        if (!userReviews || userReviews.length === 0) return 0;

        const totalRating = userReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );
        return totalRating / userReviews.length;
    }, [userReviews]);

    const { mutate: createPassenger, isPending: isBookingRide } =
        useCreateRidePassenger();
    const { mutate: removePassenger, isPending: isRemovingPassenger } =
        useDeleteRidePassenger({});

    const router = useRouter();

    function cancelRide() {
        if (!userId) return;
        removePassenger({
            where: {
                passengerId_rideId: {
                    passengerId: userId,
                    rideId,
                },
            },
        });
    }

    return (
        <>
            {isPending ? (
                <RideSkeleton />
            ) : ride ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:p-10">
                    <div className="p-4 md:pl-28 md:pr-28 ">
                        <div>
                            <div className="flex">
                                <Link href={`/users/${ride.driver.id}`}>
                                    <img
                                        src={ride.driver.profileImg}
                                        className="size-24 rounded-3xl object-cover"
                                        alt=""
                                    />
                                </Link>
                                <div className="pl-4">
                                    <div className="text-xl font-font-semibold">
                                        {ride.driver.name}
                                    </div>
                                    <div className="text-sm">
                                        <p className="flex items-center gap-1 font-semibold">
                                            <Stars
                                                className="text-primary"
                                                size={17}
                                            />
                                            <div>{averageUserRating}</div>
                                        </p>
                                        <p>
                                            Member since{" "}
                                            {new Date(
                                                ride.driver.createdAt
                                            ).getFullYear()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-1">
                                    <div className="bg-primary/10 size-6 flex items-center justify-center rounded-full">
                                        <Check
                                            className="text-primary font-bold"
                                            size={18}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="mt-4" />
                        <h2 className="mt-2 font-semibold text-xl mb-2">
                            {/* 28 April */}
                            {/* get the only day here */}
                            {format(ride.departure, "d MMMM", {
                                // locale: languageTag(),
                            })}
                        </h2>
                        <div className="bg-white shadow-sm rounded-sm ">
                            <div className="relative p-2 pl-4 pr-4">
                                <div className="absolute right-[24px] top-[24px] ">
                                    <div className="p-1  rounded-md text-3xl text-gray-800">
                                        {ride.price} ₾
                                    </div>
                                </div>
                                <div className="flex gap-x-2">
                                    <div className="w-10 h-7 flex items-center">
                                        <span className="text-sm text-primary font-semibold dark:text-neutral-400">
                                            {format(
                                                new Date(
                                                    new Date(
                                                        ride.departure
                                                    ).getTime()
                                                ),
                                                "HH:mm"
                                            )}
                                        </span>
                                    </div>

                                    <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                        <div className="relative z-10 size-7 flex justify-center items-center">
                                            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                                        </div>
                                    </div>

                                    <div className="grow pt-0.5 pb-8">
                                        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                            {
                                                PLACES.find(
                                                    (p) => p.osm === ride.from
                                                )?.name[languageTag()]
                                            }
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex gap-x-2">
                                    <div className="w-10 h-7 flex items-center">
                                        <span className="text-sm text-primary font-semibold dark:text-neutral-400">
                                            {format(
                                                new Date(
                                                    new Date(
                                                        ride.departure
                                                    ).getTime() +
                                                        ride.duration * 1000
                                                ),
                                                "HH:mm"
                                            )}
                                        </span>
                                    </div>

                                    <div className="relative ">
                                        <div className="relative z-10 size-7 flex justify-center items-center">
                                            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                                        </div>
                                    </div>

                                    <div className="grow pt-0.5">
                                        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                            {
                                                PLACES.find(
                                                    (p) => p.osm === ride.to
                                                )?.name[languageTag()]
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="mt-2 font-semibold text-xl">
                            Ride Rules
                        </h2>

                        <div className=" grid grid-cols-2 ">
                            {ride.rideRules.length > 0 ? (
                                ride.rideRules.map(({ rule }, index) => (
                                    <div className="flex " key={index}>
                                        <div className="flex items-center">
                                            {ruleToIcon[rule.description]}
                                        </div>
                                        <div className="flex items-center">
                                            <div className="text-gray-500  ">
                                                {rule.description}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 text-sm">
                                    Driver skipped filling details
                                </div>
                            )}
                        </div>
                        <h2 className="mt-2 font-semibold text-xl">
                            Car Details
                        </h2>

                        <div className="mt-2 flex flex-col gap-2 lg:flex-row">
                            <div className="lg:w-1/2">
                                <img
                                    src={ride.car.photos?.[0] || ""}
                                    className="w-full h-full rounded-md object-cover"
                                    alt=""
                                />
                            </div>

                            <div className="lg:w-1/2 bg-white shadow-sm rounded-md p-4">
                                <dl className="divide-y divide-gray-100 text-sm">
                                    <div className="flex items-center justify-between py-3">
                                        <dt className="font-medium text-gray-900 flex items-center gap-2">
                                            <Type size={22} />
                                            Type
                                        </dt>
                                        <dd className="text-gray-700">
                                            {ride.car.type}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between py-3">
                                        <dt className="font-medium text-gray-900 flex items-center gap-2">
                                            <PanelTopDashed size={22} />
                                            Plate
                                        </dt>
                                        <dd className="text-gray-700">
                                            {ride.car.plate}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between py-3">
                                        <dt className="font-medium text-gray-900 flex items-center gap-2">
                                            <CarTaxiFront size={22} />
                                            Mark
                                        </dt>
                                        <dd className="text-gray-700">
                                            {ride.car.mark}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between py-3">
                                        <dt className="font-medium text-gray-900 flex items-center gap-2">
                                            <Users size={22} />
                                            Capacity
                                        </dt>
                                        <dd className="text-gray-700">
                                            {ride.car.capacity}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* RIDE */}
                    </div>

                    <div className="p-4 md:pl-28 md:pr-28 ">
                        <div className="xl:w-[460px] flex flex-col justify-center">
                            <h2 className="font-semibold text-xl mb-2">
                                Book the ride
                            </h2>
                            <div className="border mt-2 w-full shadow-sm bg-white rounded-2xl mb-4 p-0 relative">
                                <div className="pt-5 px-5">
                                    <h2 className="text-lg mt-0 mb-1 text-center">
                                        {ride.availableSeats -
                                            ride.ridePassengers.length}{" "}
                                        seats available
                                    </h2>
                                    <ul className="list-none mb-0">
                                        {new Array(
                                            ride.availableSeats -
                                                ride.ridePassengers.length
                                        )
                                            .fill(null)
                                            .map((_, index) => (
                                                <li
                                                    key={index}
                                                    className="py-3 pr-4 flex items-center border-b border-gray-300"
                                                >
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                                    You?
                                                </li>
                                            ))}
                                        {ride.ridePassengers.map(
                                            ({ passenger }) => (
                                                <li
                                                    key={passenger.id}
                                                    className="py-3 pr-4 flex items-center justify-between border-b border-gray-300"
                                                >
                                                    <div>
                                                        <img
                                                            src={
                                                                passenger.profileImg
                                                            }
                                                            className="w-10 h-10 rounded-full mr-3 object-cover"
                                                            alt=""
                                                        />
                                                        <Link
                                                            href={`/users/${passenger.id}`}
                                                            className="text-primary font-semibold"
                                                        >
                                                            {passenger.name}
                                                        </Link>
                                                    </div>

                                                    {passenger.id ===
                                                        userId && (
                                                        <Button
                                                            disabled={
                                                                isRemovingPassenger
                                                            }
                                                            onClick={cancelRide}
                                                            className="ml-auto bg-primary text-white py-2 px-4 rounded-md"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="p-4">
                                    <div className="mb-4 flex">
                                        <div className="flex-grow flex items-center">
                                            Book now for
                                        </div>
                                        <div>
                                            <span className="text-2xl font-bold">
                                                {ride.price}{" "}
                                            </span>
                                            <span className="text-gray-400">
                                                ₾
                                            </span>{" "}
                                        </div>
                                    </div>
                                    {/* <pre>
                                        {JSON.stringify(
                                            {
                                                userId,
                                                r: ride.ridePassengers.length,
                                                rr: ride.availableSeats,
                                                am: ride.ridePassengers.find(
                                                    ({ passengerId }) =>
                                                        passengerId === userId
                                                ),
                                                d: ride.departure,
                                                n: new Date(),
                                            },
                                            null,
                                            2
                                        )}
                                    </pre> */}
                                    {userId &&
                                        ride.ridePassengers.length <
                                            ride.availableSeats &&
                                        !ride.ridePassengers.find(
                                            ({ passengerId }) =>
                                                passengerId === userId
                                        ) &&
                                        ride.departure > new Date() &&
                                        ride.driverId !== userId && (
                                            <Button
                                                disabled={isBookingRide}
                                                onClick={() => {
                                                    bookRide(rideId);
                                                    // No better way to do this?
                                                }}
                                                className="w-full bg-primary text-white py-2 px-4 rounded-md"
                                            >
                                                Book Now
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                "Ride does not exist"
            )}
        </>
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

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//     useCreateRidePassenger,
//     useFindUniqueRide,
//     useUpdateRide,
// } from "@/lib/hooks";
// import {
//     Bookmark,
//     Calendar,
//     CarTaxiFront,
//     Check,
//     ChevronDown,
//     CircleDot,
//     Clock,
//     DollarSign,
//     MapPin,
//     PanelTopDashed,
//     Type,
//     User,
//     Users,
//     Image,
//     FlagTriangleRight,
//     CheckCheck,
// } from "lucide-react";
// import { format } from "date-fns";
// import { languageTag } from "@/paraglide/runtime";
// import PLACES from "@/lib/constants/places";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import ContentWithReviews from "../../users/[userId]/content-with-reviews";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion";

// export function Ride({
//     rideId,
//     userId,
// }: {
//     rideId: string;
//     userId: string | undefined;
// }) {
//     const { data: ride, isPending } = useFindUniqueRide({
//         where: {
//             id: rideId,
//         },
//         include: {
//             driver: true,
//             ridePassengers: {
//                 include: {
//                     passenger: true,
//                 },
//             },
//             car: true,
//             rideRules: {
//                 include: {
//                     rule: true,
//                 },
//             },
//         },
//     });

//     // const { mutate, isPending: isBookingRide } = useUpdateRide();
//     const { mutate: createPassenger, isPending: isBookingRide } =
//         useCreateRidePassenger();
//     const router = useRouter();

//     function bookRide() {
//         createPassenger({
//             data: {
//                 passengerId: userId,
//                 rideId: rideId,
//             },
//         });
//     }

//     return (
//         <ContentWithReviews userId={ride?.driver.id}>
//             {isPending ? (
//                 <RideSkeleton />
//             ) : ride ? (
//                 <>
//                     <div className="flex items-center justify-between">
//                         <div className="bg-primary/10 size-16 flex items-center justify-center rounded-full">
//                             <Check
//                                 className="text-primary font-bold"
//                                 size={24}
//                             />
//                         </div>
//                     </div>
//                     <h3 className="mt-5 font-semibold">Ride booking</h3>
//                     <h2 className="mt-2 font-bold text-3xl">
//                         {/* 28 April */}
//                         {/* get the only day here */}
//                         {format(ride.departure, "d MMMM", {
//                             // locale: languageTag(),
//                         })}
//                     </h2>
//                     <Accordion
//                         defaultValue={["ride", "car"]}
//                         className="mt-4"
//                         type="multiple"
//                     >
//                         <AccordionItem value="ride" className="mb-4">
//                             <AccordionTrigger className="bg-white p-4 rounded-md">
//                                 <span className="font-semibold">
//                                     Details about the ride
//                                 </span>
//                             </AccordionTrigger>
//                             <AccordionContent>
//                                 <div className="max-w-md mt-5">
//                                     <dl className="-my-3 divide-y divide-gray-100 text-sm">
//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900 flex items-center gap-2">
//                                                 <CircleDot size={22} />
//                                                 From
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {
//                                                     PLACES.find(
//                                                         (place) =>
//                                                             place.osm ===
//                                                             ride.from
//                                                     )?.name[languageTag()]
//                                                 }
//                                             </dd>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900 flex items-center gap-2">
//                                                 <MapPin size={22} />
//                                                 To
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {" "}
//                                                 {
//                                                     PLACES.find(
//                                                         (place) =>
//                                                             place.osm ===
//                                                             ride.to
//                                                     )?.name[languageTag()]
//                                                 }
//                                             </dd>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900  flex items-center gap-2">
//                                                 <DollarSign size={22} /> Price
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {ride.price} GEL
//                                             </dd>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900  flex items-start gap-2">
//                                                 <CheckCheck size={22} /> Rules
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {ride.rideRules.map(
//                                                     ({ rule }) => (
//                                                         <div key={rule.id}>
//                                                             {rule.description}
//                                                         </div>
//                                                     )
//                                                 )}
//                                             </dd>
//                                         </div>
//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900  flex items-center gap-2">
//                                                 <Clock size={22} /> Departure
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {/* 28 April 2022, 10:00 */}
//                                                 {format(
//                                                     ride.departure,
//                                                     "d MMMM yyyy, HH:mm",
//                                                     {
//                                                         // locale: languageTag(),
//                                                     }
//                                                 )}
//                                             </dd>
//                                         </div>
//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900 flex items-center gap-2">
//                                                 <User size={22} /> Driver
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 <Link
//                                                     href={`/users/${ride.driver.id}`}
//                                                     className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-2 pr-3 py-2 font-semibold"
//                                                 >
//                                                     <img
//                                                         src={
//                                                             ride.driver
//                                                                 .profileImg
//                                                         }
//                                                         // src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
//                                                         className="size-6 rounded-full object-cover"
//                                                         alt=""
//                                                     />
//                                                     <span>
//                                                         {ride.driver.name}
//                                                     </span>
//                                                 </Link>
//                                             </dd>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900 flex items-center gap-2">
//                                                 <Users size={22} /> Passengers
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {ride.ridePassengers.length >
//                                                 0 ? (
//                                                     <div className="inline-flex -space-x-1 overflow-hidden bg-primary/10 text-primary rounded-full px-2 py-2 font-semibold">
//                                                         {ride.ridePassengers.map(
//                                                             ({ passenger }) => (
//                                                                 <Link
//                                                                     href={
//                                                                         "/users/" +
//                                                                         passenger.id
//                                                                     }
//                                                                     key={
//                                                                         passenger.id
//                                                                     }
//                                                                 >
//                                                                     <img
//                                                                         src={
//                                                                             passenger.profileImg
//                                                                         }
//                                                                         // src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
//                                                                         className="size-6 border-background border-2 rounded-full object-cover"
//                                                                         alt=""
//                                                                     />
//                                                                 </Link>
//                                                             )
//                                                         )}
//                                                     </div>
//                                                 ) : (
//                                                     "No passengers yet"
//                                                 )}
//                                             </dd>
//                                         </div>
//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900">
//                                                 {userId &&
//                                                     ride.ridePassengers.length <
//                                                         ride.availableSeats &&
//                                                     !ride.ridePassengers.find(
//                                                         ({ passengerId }) =>
//                                                             passengerId ===
//                                                             userId
//                                                     ) &&
//                                                     ride.driverId !==
//                                                         userId && (
//                                                         <Button
//                                                             disabled={
//                                                                 isBookingRide
//                                                             }
//                                                             onClick={bookRide}
//                                                         >
//                                                             Book Ride
//                                                         </Button>
//                                                     )}
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 There is still{" "}
//                                                 {ride.availableSeats -
//                                                     ride.ridePassengers
//                                                         .length}{" "}
//                                                 places remaining
//                                             </dd>
//                                         </div>
//                                     </dl>
//                                 </div>
//                             </AccordionContent>
//                         </AccordionItem>
//                         <AccordionItem value="car">
//                             <AccordionTrigger className="bg-white p-4 rounded-md">
//                                 <span className="font-semibold">
//                                     Car Details
//                                 </span>
//                             </AccordionTrigger>
//                             <AccordionContent>
//                                 <div className="max-w-md mt-5">
//                                     <dl className="-my-3 divide-y divide-gray-100 text-sm">
//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900 flex items-center gap-2">
//                                                 <Type size={22} />
//                                                 Type
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {ride.car.type}
//                                             </dd>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900 flex items-center gap-2">
//                                                 <PanelTopDashed size={22} />
//                                                 Plate
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {ride.car.plate}
//                                             </dd>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900  flex items-center gap-2">
//                                                 <CarTaxiFront size={22} /> Mark
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {ride.car.mark}
//                                             </dd>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900  flex items-center gap-2">
//                                                 <Users size={22} /> Capacity
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 {ride.car.capacity}
//                                             </dd>
//                                         </div>
//                                         <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
//                                             <dt className="font-medium text-gray-900 flex items-start gap-2">
//                                                 <Image size={22} /> Photo
//                                             </dt>
//                                             <dd className="text-gray-700 sm:col-span-2">
//                                                 <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-md px-2 py-2 font-semibold">
//                                                     <img
//                                                         src={
//                                                             ride.car
//                                                                 .photos?.[0] ||
//                                                             ""
//                                                         }
//                                                         // src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
//                                                         className="size-40 rounded-md object-cover"
//                                                         alt=""
//                                                     />
//                                                 </div>
//                                             </dd>
//                                         </div>
//                                     </dl>
//                                 </div>
//                             </AccordionContent>
//                         </AccordionItem>
//                     </Accordion>
//                 </>
//             ) : (
//                 "Ride not exists"
//             )}
//         </ContentWithReviews>
//     );
// }

// function RideSkeleton() {
//     return (
//         <div className="animate-pulse">
//             <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
//             <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
//             <div className="flex gap-4 mb-6">
//                 <div className="h-6 w-40 bg-gray-200 rounded"></div>
//                 <div className="h-6 w-40 bg-gray-200 rounded"></div>
//             </div>
//             <div className="h-10 w-full bg-gray-200 rounded mb-6"></div>
//             {[...Array(7)].map((_, index) => (
//                 <div key={index} className="flex gap-4 mb-4">
//                     <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
//                     <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
//                 </div>
//             ))}
//         </div>
//     );
// }

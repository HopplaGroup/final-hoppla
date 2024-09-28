"use client";
import { Button } from "@/components/ui/button";
import {
    getQueryKey,
    useCreateRidePassengerRequest,
    useCreateRideStartedConfirmation,
    useDeleteRidePassengerRequest,
    useFindManyUserReview,
    useFindUniqueRide,
    useFindUniqueRideStartedConfirmation,
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
import { Separator } from "@/components/ui/separator";
import { useMemo, useState } from "react";
import { ruleToIcon } from "../../search/_components/rule-icons";
import bookRide from "@/lib/bog/book-ride";
import { cn } from "@/lib/utils/cn";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cancelRide from "@/lib/bog/cancel-ride";

export function Ride({
    rideId,
    userId,
}: {
    rideId: string;
    userId: string | undefined;
}) {
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [isCancelingRide, setIsCancelingRide] = useState(false);

    const { data: ride, isPending } = useFindUniqueRide({
        where: {
            id: rideId,
        },
        include: {
            driver: true,
            ridePassengerRequests: {
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
    const queryClient = useQueryClient();
    const queryKey = getQueryKey("User", "findUnique", {
        where: {
            id: userId,
        },
    });
    const bookRideQueryKey = getQueryKey("Ride", "findUnique", {
        where: {
            id: rideId,
        },
    });

    const { data: rideStartedConfirmation } =
        useFindUniqueRideStartedConfirmation(
            {
                where: {
                    rideId_userId: {
                        rideId,
                        userId: userId || "",
                    },
                },
            },
            {
                enabled: !!userId,
            }
        );

    const { data: userReviews } = useFindManyUserReview(
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

    const {
        mutate: createRideStartedConfirmation,
        isPending: isRideStartedConfirming,
    } = useCreateRideStartedConfirmation();

    const {
        mutate: removePassengerRequest,
        isPending: isRemovingPassengerRequest,
    } = useDeleteRidePassengerRequest({});

    const sendRequest = () => {
        setIsSendingRequest(true);
        bookRide(rideId)
            .then((res) => {
                setIsSendingRequest(false);
                if (res.success) {
                    queryClient.invalidateQueries({
                        queryKey: bookRideQueryKey,
                    });
                    queryClient.invalidateQueries({
                        queryKey,
                    });
                } else {
                    // TODO: show error toast
                    toast.error("Error booking ride");
                }
            })
            .catch((error) => {
                console.error(error);
                setIsSendingRequest(false);
            });
    };

    const onCancelRide = () => {
        setIsCancelingRide(true);
        cancelRide(rideId).then((res) => {
            setIsCancelingRide(false);
            if (res.success) {
                queryClient.invalidateQueries({
                    queryKey: bookRideQueryKey,
                });
                queryClient.invalidateQueries({
                    queryKey,
                });
            } else {
                toast.error("Error canceling ride");
            }
        });
    };
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
                                            ride.ridePassengerRequests.filter(
                                                (r) => r.status === "ACCEPTED"
                                            ).length}{" "}
                                        seats available
                                    </h2>
                                    <ul className="list-none mb-0">
                                        {new Array(
                                            ride.availableSeats -
                                                ride.ridePassengerRequests.filter(
                                                    (r) =>
                                                        r.status === "ACCEPTED"
                                                ).length
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
                                        {ride.ridePassengerRequests
                                            .filter(
                                                (r) =>
                                                    r.status === "ACCEPTED" ||
                                                    r.passengerId === userId
                                            )
                                            .map(({ passenger, status }) => (
                                                <li
                                                    key={passenger.id}
                                                    className={cn(
                                                        "py-3 pr-4 flex items-center justify-between border-b border-gray-300",
                                                        {
                                                            "bg-green-300":
                                                                userId ===
                                                                passenger.id,
                                                            "bg-red-300":
                                                                status ===
                                                                "REJECTED",
                                                            "bg-yellow-300":
                                                                status ===
                                                                "PENDING",
                                                        }
                                                    )}
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

                                                    {passenger.id === userId &&
                                                        ride.departure >
                                                            new Date() &&
                                                        !rideStartedConfirmation &&
                                                        !(
                                                            status ===
                                                                "REJECTED" ||
                                                            status ===
                                                                "CANCELLED"
                                                        ) && (
                                                            <Button
                                                                disabled={
                                                                    isCancelingRide
                                                                }
                                                                onClick={
                                                                    onCancelRide
                                                                }
                                                                className="ml-auto bg-primary text-white py-2 px-4 rounded-md"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        )}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className="p-4">
                                    <div className="mb-4 flex">
                                        <div className="flex-grow flex items-center">
                                            Request now for
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

                                    {ride.departure > new Date() &&
                                        userId &&
                                        ride.driverId !== userId &&
                                        !rideStartedConfirmation &&
                                        !ride.ridePassengerRequests.find(
                                            (r) => r.passengerId === userId
                                        ) &&
                                        ride.ridePassengerRequests.filter(
                                            (r) => r.status === "ACCEPTED"
                                        ).length < ride.availableSeats && (
                                            <Button
                                                disabled={isSendingRequest}
                                                onClick={sendRequest}
                                                className="w-full bg-primary text-white py-2 px-4 rounded-md"
                                            >
                                                Request Now
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

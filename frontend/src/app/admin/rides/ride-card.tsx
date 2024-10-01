import { Button } from "@/components/ui/button";
import { getQueryKey, useUpdateUser } from "@/lib/hooks";
import { cn } from "@/lib/utils/cn";
import { Prisma } from "@zenstackhq/runtime/models";
import toast from "react-hot-toast";
import blockUser from "../actions/block-user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    CircleX,
    Eye,
    RedoIcon,
    ShieldAlert,
    ShieldPlus,
    UserRoundX,
} from "lucide-react";
import cancelRide from "../actions/cancel-ride";
import PLACES from "@/lib/constants/places";
import Link from "next/link";

export default function RideCard({
    ride,
    page,
    whereClause,
}: {
    ride: Prisma.RideGetPayload<{}>;
    page: number;
    whereClause: Prisma.RideWhereInput;
}) {
    const [isCancelingRide, setIsCancelingRide] = useState(false);
    const queryClient = useQueryClient();

    const ridesQueryKey = getQueryKey("Ride", "findMany", {
        where: whereClause,
        take: 10,
        skip: (page - 1) * 10,
    });

    function onCancelRide() {
        setIsCancelingRide(true);
        cancelRide({
            rideId: ride.id,
        }).then((res) => {
            setIsCancelingRide(false);
            if (res.success) {
                queryClient.invalidateQueries({
                    queryKey: ridesQueryKey,
                });
                toast.success("Ride canceled successfully");
            } else {
                toast.error("Failed to cancel ride");
            }
        });
    }

    return (
        <li
            key={ride.id}
            className={cn(
                "h-[80px] flex items-center px-4 mt-4 border-2 bg-white rounded-md",
                {
                    // " border-primary":
                    //     user.role === "ADMIN" && user.status === "ACTIVE",
                    " border-red-500": ride.status === "CANCELLED",
                }
            )}
        >
            <div className="flex items-center justify-between w-full space-x-4">
                <div className="flex items-center gap-2">
                    {/* <div className="">
                        <img
                            className="w-8 h-8 rounded-full"
                            src={ride.}
                            alt="Profile image"
                        />
                    </div> */}
                    <div className="">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            #{ride.id}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {PLACES.find((place) => place.osm === ride.from)
                                ?.name.en +
                                " -> " +
                                PLACES.find((place) => place.osm === ride.to)
                                    ?.name.en}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link target="_blank" href={`/rides/${ride.id}`}>
                        <Button
                            variant={"ghost"}
                            className="flex items-center gap-2"
                        >
                            <Eye size={20} /> See Ride
                        </Button>
                    </Link>
                    {ride.status === "ACTIVE" && (
                        <Button
                            disabled={isCancelingRide}
                            variant={"ghost"}
                            onClick={onCancelRide}
                            className="flex items-center gap-2"
                        >
                            <CircleX size={20} /> Cancel Ride
                        </Button>
                    )}
                </div>
            </div>
        </li>
    );
}

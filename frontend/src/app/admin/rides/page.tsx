"use client";

import {
    useCountRide,
    useCountUser,
    useFindManyCar,
    useFindManyRide,
    useFindManyUser,
} from "@/lib/hooks";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils/cn";
import { Prisma } from "@zenstackhq/runtime/models";
import ResponsivePagination from "react-responsive-pagination";
import Skeleton from "react-loading-skeleton";
import SearchBox from "../_components/SearchBox";
import RideCard from "./ride-card";

const PAGE_COUNT = 10;

export default function RidesPage() {
    const [searchText, setSearchText] = useState("");
    const [value] = useDebounce(searchText, 500);

    const [rideStatus, setRideStatus] = useState<
        "ACTIVE" | "CANCELLED" | undefined
    >(undefined);

    const [page, setPage] = useState(1);
    const whereClause: Prisma.RideWhereInput = {
        ...(rideStatus && { status: rideStatus }),
        ...(value && {
            OR: [
                {
                    id: {
                        contains: value,
                    },
                },
                {
                    driver: {
                        name: {
                            contains: value,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    driverId: {
                        contains: value,
                    },
                },
                {
                    carId: {
                        contains: value,
                    },
                },
            ],
        }),
    };

    const { data: searchedRidesCount } = useCountRide(
        {
            where: whereClause,
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const withPagination = <T extends { take?: number; skip?: number }>(
        w: Omit<T, "take" | "skip">,
        page: number = 1,
        pageSize: number = 10
    ) => {
        return {
            ...w,
            take: pageSize,
            skip: (page - 1) * pageSize,
        };
    };

    const { data: rides, isLoading } = useFindManyRide(
        withPagination<Prisma.RideFindManyArgs>(
            {
                where: whereClause,
            },
            page,
            PAGE_COUNT
        ),
        {
            refetchOnWindowFocus: false,
        }
    );

    const totalPages = Math.ceil((searchedRidesCount || 0) / PAGE_COUNT);

    return (
        <div className="mt-5">
            <SearchBox
                value={searchText}
                onChange={setSearchText}
                placeholder="Search by ride id, driver name, driver id, car id"
            />
            <div className="flex items-center gap-3 mt-5">
                <div className="flex items-center gap-1 border-2 p-2 rounded-lg">
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white":
                                    rideStatus === "ACTIVE",
                            }
                        )}
                        onClick={() => {
                            setRideStatus((p) => {
                                if (p === "ACTIVE") return undefined;
                                return "ACTIVE";
                            });
                            setPage(1);
                        }}
                    >
                        Active
                    </div>
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white":
                                    rideStatus === "CANCELLED",
                            }
                        )}
                        onClick={() => {
                            setRideStatus((p) => {
                                if (p === "CANCELLED") return undefined;
                                return "CANCELLED";
                            });
                            setPage(1);
                        }}
                    >
                        <span className="">Cancelled</span>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div>
                    <Skeleton className="mt-5" height={"20px"} />
                    <Skeleton className="mt-5" height={80} count={PAGE_COUNT} />
                </div>
            )}
            {!isLoading &&
                searchedRidesCount !== undefined &&
                searchedRidesCount > 0 && (
                    <p className="mt-5 h-[20px] inline-block">
                        {searchedRidesCount} rides found matching your search
                    </p>
                )}
            {!isLoading && rides && rides.length === 0 && (
                <p className="mt-5 h-[20px] inline-block">No rides found</p>
            )}
            {!isLoading && rides && (
                <ul role="list" className="">
                    {rides?.map((ride) => (
                        <RideCard
                            key={ride.id}
                            ride={ride}
                            page={page}
                            whereClause={whereClause}
                        />
                    ))}
                </ul>
            )}
            <div className="mt-5">
                <ResponsivePagination
                    current={page}
                    total={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}

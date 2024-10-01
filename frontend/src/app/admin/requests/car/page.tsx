"use client";

import {
    useCountCar,
    useCountDriverVerificationRequest,
    useFindManyCar,
    useFindManyDriverVerificationRequest,
} from "@/lib/hooks";
import RequestCard from "./request-card";
import { useState } from "react";
import { Prisma } from "@zenstackhq/runtime/models";
import ResponsivePagination from "react-responsive-pagination";
import { cn } from "@/lib/utils/cn";
import Skeleton from "react-loading-skeleton";
import SearchBox from "../../components/searchbox";
import { useDebounce } from "use-debounce";

const PAGE_COUNT = 10;

export default function CarRequestsPage() {
    const [requestStatus, setRequestStatus] = useState<
        "PENDING" | "APPROVED" | "REJECTED"
    >("PENDING");
    const [searchText, setSearchText] = useState("");
    const [value] = useDebounce(searchText, 500);

    const [userStatus, setUserStatus] = useState<
        "ACTIVE" | "BLOCKED" | undefined
    >(undefined);
    const [page, setPage] = useState(1);

    const whereClause: Prisma.CarWhereInput = {
        status: requestStatus,
        ...(userStatus && {
            owner: {
                status: userStatus,
            },
        }),
        ...(value && {
            OR: [
                {
                    mark: {
                        contains: value,
                        mode: "insensitive",
                    },
                },
                {
                    plate: {
                        contains: value,
                        mode: "insensitive",
                    },
                },
                {
                    id: {
                        contains: value,
                    },
                },
            ],
        }),
    };

    const { data: requests, isLoading } = useFindManyCar(
        {
            where: whereClause,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                owner: true,
            },
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const { data: requestsCount, isLoading: isCountLoading } = useCountCar(
        {
            where: whereClause,
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const totalPages = Math.ceil((requestsCount || 0) / PAGE_COUNT);

    return (
        <div className="mt-5">
            <SearchBox
                value={searchText}
                onChange={setSearchText}
                placeholder="Search by mark, plate, or ID"
            />
            <div className="flex items-center gap-3 mb-5 mt-5">
                <div className="flex items-center gap-1 border-2 p-2 rounded-lg">
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white":
                                    requestStatus === "PENDING",
                            }
                        )}
                        onClick={() => {
                            setRequestStatus("PENDING");
                            setPage(1);
                        }}
                    >
                        Pending
                    </div>
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white":
                                    requestStatus === "APPROVED",
                            }
                        )}
                        onClick={() => {
                            setRequestStatus("APPROVED");
                            setPage(1);
                        }}
                    >
                        <span className="">Approved</span>
                    </div>
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white":
                                    requestStatus === "REJECTED",
                            }
                        )}
                        onClick={() => {
                            setRequestStatus("REJECTED");
                            setPage(1);
                        }}
                    >
                        <span className="">Rejected</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 border-2 p-2 rounded-lg">
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white":
                                    userStatus === "ACTIVE",
                            }
                        )}
                        onClick={() => {
                            setUserStatus((p) => {
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
                                    userStatus === "BLOCKED",
                            }
                        )}
                        onClick={() => {
                            setUserStatus((p) => {
                                if (p === "BLOCKED") return undefined;
                                return "BLOCKED";
                            });
                            setPage(1);
                        }}
                    >
                        <span className="">Blocked</span>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div>
                    <Skeleton className="mt-5" height={"20px"} />
                    <Skeleton className="mt-5" height={80} count={PAGE_COUNT} />
                </div>
            )}
            {!isLoading && requests && requests.length > 0 && (
                <p className="">{requests.length} cars found</p>
            )}
            {!isLoading && requests && requests.length === 0 && (
                <p className="">No cars found</p>
            )}
            {!isLoading && requests && (
                <ul role="list" className="">
                    {requests?.map((request) => (
                        <RequestCard key={request.id} request={request} />
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

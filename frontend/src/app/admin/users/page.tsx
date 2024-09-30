"use client";

import { useCountUser, useFindManyUser } from "@/lib/hooks";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils/cn";
import { Prisma } from "@zenstackhq/runtime/models";
import UserCard from "./user-card";
import ResponsivePagination from "react-responsive-pagination";
import Skeleton from "react-loading-skeleton";

const PAGE_COUNT = 10;

export default function UsersPage() {
    const [searchText, setSearchText] = useState("");
    const [value] = useDebounce(searchText, 1000);
    const [userRole, setUserRole] = useState<"USER" | "ADMIN" | undefined>(
        undefined
    );
    const [userStatus, setUserStatus] = useState<
        "ACTIVE" | "BLOCKED" | undefined
    >(undefined);
    const [page, setPage] = useState(1);
    const whereClause: Prisma.UserWhereInput = {
        ...(userRole && { role: userRole }),
        ...(userStatus && { status: userStatus }),
        OR: [
            {
                email: {
                    contains: value,
                    mode: "insensitive",
                },
            },
            {
                name: {
                    contains: value,
                    mode: "insensitive",
                },
            },
            {
                idNumber: {
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
    };

    const { data: searchedUsersCount } = useCountUser(
        {
            where: whereClause,
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const { data: users, isLoading } = useFindManyUser(
        {
            where: whereClause,
            take: PAGE_COUNT,
            skip: (page - 1) * PAGE_COUNT,
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const totalPages = Math.ceil((searchedUsersCount || 0) / PAGE_COUNT);

    return (
        <div>
            <div className="relative mt-5">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="block w-full p-4 ps-10 text-sm border-2 rounded-lg bg-white"
                    placeholder="Search by name, email, ..."
                    required
                />
            </div>
            <div className="flex items-center gap-3 mt-5">
                <div className="flex items-center gap-1 border-2 p-2 rounded-lg">
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white": userRole === "ADMIN",
                            }
                        )}
                        onClick={() => {
                            setUserRole((p) => {
                                if (p === "ADMIN") return undefined;
                                return "ADMIN";
                            });
                            setPage(1);
                        }}
                    >
                        Admins
                    </div>
                    <div
                        className={cn(
                            "px-3 py-2.5 select-none bg-white border-2 rounded-lg cursor-pointer",
                            {
                                "bg-primary text-white": userRole === "USER",
                            }
                        )}
                        onClick={() => {
                            setUserRole((p) => {
                                if (p === "USER") return undefined;
                                return "USER";
                            });
                            setPage(1);
                        }}
                    >
                        <span className="">Users</span>
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
            {!isLoading &&
                searchedUsersCount !== undefined &&
                searchedUsersCount > 0 && (
                    <p className="mt-5 h-[20px] inline-block">
                        {searchedUsersCount} users found matching your search
                    </p>
                )}
            {!isLoading && users && users.length === 0 && (
                <p className="mt-5 h-[20px] inline-block">No users found</p>
            )}
            {!isLoading && users && (
                <ul role="list" className="">
                    {users?.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
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

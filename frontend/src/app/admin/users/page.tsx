"use client";

import { Button } from "@/components/ui/button";
import {
    getQueryKey,
    useCountUser,
    useFindManyUser,
    useUpdateUser,
} from "@/lib/hooks";
import { RedoIcon, ShieldAlert, ShieldPlus, UserRoundX } from "lucide-react";
import { useState } from "react";
import blockUser from "../actions/block-user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils/cn";

export default function UsersPage() {
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState("");
    const [value] = useDebounce(searchText, 1000);

    const whereClause = {
        OR: [
            {
                email: {
                    contains: value,
                },
            },
            {
                name: {
                    contains: value,
                },
            },
            {
                idNumber: {
                    contains: value,
                },
            },
            {
                id: {
                    contains: value,
                },
            },
        ],
    };

    const [isBlocking, setIsBlocking] = useState(false);

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
            take: 10,
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const usersQueryKey = getQueryKey("User", "findMany", {
        where: whereClause,
        take: 10,
    });

    const onBlockUser = (userId: string, blocked: boolean) => {
        setIsBlocking(true);
        const toastId = toast.loading(
            blocked ? "Blocking user..." : "Unblocking user..."
        );
        blockUser({ blocked, userId }).then((res) => {
            setIsBlocking(false);
            if (res.success) {
                queryClient.invalidateQueries({
                    queryKey: usersQueryKey,
                });
                toast.success(
                    blocked
                        ? "User blocked successfully"
                        : "User unblocked successfully",

                    {
                        id: toastId,
                    }
                );
            } else {
                toast.error(
                    blocked ? "Failed to block user" : "Failed to unblock user",
                    {
                        id: toastId,
                    }
                );
            }
        });
    };

    const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

    const onMakeUserAdmin = (userId: string, isAdmin: boolean) => {
        updateUser({
            where: {
                id: userId,
            },
            data: {
                role: isAdmin ? "USER" : "ADMIN",
            },
        });
    };

    return (
        <div>
            <form className="mt-5 max-w-sm">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">
                    Search
                </label>
                <div className="relative">
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
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Search by name, email, ..."
                        required
                    />
                </div>
            </form>
            {isLoading && <p className="ml-5 mt-5">Loading...</p>}
            {!isLoading && searchedUsersCount && searchedUsersCount > 0 && (
                <p className="ml-5 mt-5">
                    {searchedUsersCount} users found matching your search
                </p>
            )}
            {!isLoading && users && users.length === 0 && (
                <p className="ml-5 mt-5">No users found</p>
            )}
            {!isLoading && users && (
                <ul role="list" className="">
                    {users?.map((user) => (
                        <li
                            key={user.id}
                            className={cn(
                                "py-4 px-4 mt-4 border-2 bg-white rounded-md",
                                {
                                    " border-green-500":
                                        user.role === "ADMIN" &&
                                        user.status === "ACTIVE",
                                    " border-red-500":
                                        user.status === "BLOCKED",
                                }
                            )}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={user.profileImg}
                                        alt="Profile image"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {user.email}
                                    </p>
                                </div>
                                <Button
                                    disabled={isUpdatingUser}
                                    variant={"ghost"}
                                    onClick={onMakeUserAdmin.bind(
                                        null,
                                        user.id,
                                        user.role === "ADMIN"
                                    )}
                                    className="flex items-center gap-2"
                                >
                                    {user.role === "USER" ? (
                                        <>
                                            <ShieldPlus size={20} /> Make Admin
                                        </>
                                    ) : (
                                        <>
                                            <ShieldAlert size={20} /> Remove
                                            Admin
                                        </>
                                    )}
                                </Button>
                                <Button
                                    disabled={isBlocking}
                                    variant={"ghost"}
                                    onClick={onBlockUser.bind(
                                        null,
                                        user.id,
                                        user.status === "ACTIVE"
                                    )}
                                    className="flex items-center gap-2"
                                >
                                    {user.status === "ACTIVE" ? (
                                        <>
                                            <UserRoundX size={20} /> Block
                                        </>
                                    ) : (
                                        <>
                                            <RedoIcon size={20} /> Unblock
                                        </>
                                    )}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

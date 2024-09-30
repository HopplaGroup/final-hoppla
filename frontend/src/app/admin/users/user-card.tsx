import { Button } from "@/components/ui/button";
import { getQueryKey, useUpdateUser } from "@/lib/hooks";
import { cn } from "@/lib/utils/cn";
import { Prisma } from "@zenstackhq/runtime/models";
import toast from "react-hot-toast";
import blockUser from "../actions/block-user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RedoIcon, ShieldAlert, ShieldPlus, UserRoundX } from "lucide-react";

export default function UserCard({
    user,
    page,
    whereClause,
}: {
    user: Prisma.UserGetPayload<{}>;
    page: number;
    whereClause: Prisma.UserWhereInput;
}) {
    const queryClient = useQueryClient();
    const [isBlocking, setIsBlocking] = useState(false);

    const usersQueryKey = getQueryKey("User", "findMany", {
        where: whereClause,
        take: 10,
        skip: (page - 1) * 10,
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
        <li
            key={user.id}
            className={cn(
                "h-[80px] flex items-center px-4 mt-4 border-2 bg-white rounded-md",
                {
                    " border-primary":
                        user.role === "ADMIN" && user.status === "ACTIVE",
                    " border-red-500": user.status === "BLOCKED",
                }
            )}
        >
            <div className="flex items-center justify-between w-full space-x-4">
                <div className="flex items-center gap-2">
                    <div className="">
                        <img
                            className="w-8 h-8 rounded-full"
                            src={user.profileImg}
                            alt="Profile image"
                        />
                    </div>
                    <div className="">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
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
                                <ShieldAlert size={20} /> Remove Admin
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
            </div>
        </li>
    );
}

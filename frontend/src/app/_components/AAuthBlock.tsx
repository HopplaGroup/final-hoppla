"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useUser } from "@/lib/providers/UserProvider";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import * as m from "@/paraglide/messages.js";
import Link from "next/link";
import { menv } from "@/lib/utils/menv";
import { cn } from "@/lib/utils/cn";
import { Coins, PiggyBank } from "lucide-react";
import { useFindUniqueUser } from "@/lib/hooks";
import { User } from "@prisma/client";

export default function AuthBlock({ user }: { user: User | null }) {
    const { data: latestUser } = useFindUniqueUser(
        {
            where: {
                id: user?.id,
            },
            include: {
                driverVerificationRequest: {
                    select: {
                        status: true,
                    },
                },
            },
        },
        {
            enabled: !!user,
        }
    );
    return (
        <>
            {user && (
                <div>
                    <Link href="/profile" className=" md:hidden block">
                        <Button
                            variant="ghost"
                            className=" flex min-w-10 justify-between p-1"
                        >
                            <Image
                                src={user.profileImg}
                                alt="user avatar"
                                width={25}
                                height={25}
                                className="object-cover size-[45px] rounded-full"
                            />
                            <div className=" md:flex flex-col items-start ml-2 max-w-[200px] overflow-hidden">
                                <span className="hidden md:block font-semibold truncate">
                                    {user.name}
                                </span>
                                <div className="flex justify-center items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 256 256"
                                    >
                                        <path
                                            fill="#e74f3c"
                                            d="M184 89.57V84c0-25.08-37.83-44-88-44S8 58.92 8 84v40c0 20.89 26.25 37.49 64 42.46V172c0 25.08 37.83 44 88 44s88-18.92 88-44v-40c0-20.7-25.42-37.32-64-42.43M232 132c0 13.22-30.79 28-72 28c-3.73 0-7.43-.13-11.08-.37C170.49 151.77 184 139 184 124v-18.26c29.87 4.45 48 16.53 48 26.26M72 150.25v-23.79A184 184 0 0 0 96 128a184 184 0 0 0 24-1.54v23.79A163 163 0 0 1 96 152a163 163 0 0 1-24-1.75m96-40.32V124c0 8.39-12.41 17.4-32 22.87V123.5c12.91-3.13 23.84-7.79 32-13.57M96 56c41.21 0 72 14.78 72 28s-30.79 28-72 28s-72-14.78-72-28s30.79-28 72-28m-72 68v-14.07c8.16 5.78 19.09 10.44 32 13.57v23.37C36.41 141.4 24 132.39 24 124m64 48v-4.17c2.63.1 5.29.17 8 .17c3.88 0 7.67-.13 11.39-.35a122 122 0 0 0 12.61 3.76v23.46c-19.59-5.47-32-14.48-32-22.87m48 26.25V174.4a179.5 179.5 0 0 0 24 1.6a184 184 0 0 0 24-1.54v23.79a165.5 165.5 0 0 1-48 0m64-3.38V171.5c12.91-3.13 23.84-7.79 32-13.57V172c0 8.39-12.41 17.4-32 22.87"
                                        ></path>
                                    </svg>
                                    <span>
                                        {latestUser
                                            ? latestUser.balance.toFixed(2)
                                            : "0.00"}
                                    </span>
                                </div>
                            </div>
                        </Button>
                    </Link>
                    <div className="hidden md:block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex min-w-10 justify-between py-4 px-3 rounded-full"
                                >
                                    <Image
                                        src={user.profileImg}
                                        alt="user avatar"
                                        width={25}
                                        height={25}
                                        className="object-cover size-[30px] rounded-full"
                                    />
                                    <div className=" md:flex flex-col items-start ml-2 max-w-[200px] overflow-hidden">
                                        {/* <span className="hidden md:block truncate">
                                            {user.name}
                                        </span> */}
                                        <div className="flex justify-center items-center gap-1">
                                            {/* <Coins size={20} /> */}
                                            <span className="text-sm">
                                                {" "}
                                                {latestUser
                                                    ? latestUser.balance.toFixed(
                                                          2
                                                      )
                                                    : "0.00"}
                                            </span>
                                        </div>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent style={{ zIndex: 999 }}>
                                <DropdownMenuLabel>
                                    {m.raw_front_goat_scold()}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">
                                        {m.bad_caring_wallaby_pull()}
                                    </Link>
                                </DropdownMenuItem>

                                {latestUser && latestUser.role === "ADMIN" && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin">
                                            {m.quaint_elegant_stork_climb()}
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                {latestUser &&
                                    (!latestUser.driverVerificationRequest ||
                                        latestUser.driverVerificationRequest
                                            ?.status == "PENDING") && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/send-driver-verification">
                                                {m.suave_keen_lion_enjoy()}
                                            </Link>
                                        </DropdownMenuItem>
                                    )}

                                <DropdownMenuItem className="p-0">
                                    <LogoutLink className="w-full h-full  px-2 py-1.5">
                                        {m.extra_lucky_rook_trust()}
                                    </LogoutLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            )}
            {!user && (
                <RegisterLink
                    authUrlParams={{
                        connection_id: menv.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE,
                    }}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "flex items-center gap-2 rounded-full"
                    )}
                >
                    <>
                        <img
                            alt="google logo"
                            className="size-5"
                            src="/assets/g-logo.png"
                        />{" "}
                        <span className="hidden sm:block">
                            {m.plane_weird_macaw_slurp()}
                        </span>
                    </>
                </RegisterLink>
            )}
        </>
    );
}

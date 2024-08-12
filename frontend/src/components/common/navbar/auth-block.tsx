"use client";
import { Button, buttonVariants } from "@/components/ui/actions/button";
import { useUser } from "@/lib/providers/user-provider";
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

type AuthBlockProps = {};

export default function AuthBlock({}: AuthBlockProps) {
    const { user } = useUser();
    return (
        <>
            {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <Image
                                src={user.profileImg}
                                alt="user avatar"
                                width={32}
                                height={32}
                                className="rounded-full object-cover size-[32px]"
                            />
                            <div className="hidden md:flex flex-col items-start ml-2 max-w-[100px] overflow-hidden">
                                <span className="font-semibold truncate">
                                    {user.name}
                                </span>
                                <span>{user.email}</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            {m.raw_front_goat_scold()}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/profile">
                                {m.bad_caring_wallaby_pull()}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <LogoutLink className="w-full h-full  px-2 py-1.5">
                                {m.extra_lucky_rook_trust()}
                            </LogoutLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {!user && (
                <RegisterLink
                    authUrlParams={{
                        connection_id: menv.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE,
                    }}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "flex items-center gap-2 font-semibold"
                    )}
                >
                    <>
                        <img className="size-6" src="/assets/g-logo.png" />{" "}
                        <span className="hidden sm:block">
                            {m.plane_weird_macaw_slurp()}
                        </span>
                    </>
                </RegisterLink>
            )}
        </>
    );
}

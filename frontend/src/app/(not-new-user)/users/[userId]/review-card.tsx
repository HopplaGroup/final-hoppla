"use client";
import { Button } from "@/components/ui/button";
import { getQueryKey, useDeleteUserReview } from "@/lib/hooks";
import { useUser } from "@/lib/providers/user-provider";
import { useQueryClient } from "@tanstack/react-query";
import { Prisma, UserReview } from "@zenstackhq/runtime/models";
import { Delete, Ellipsis, LoaderCircle, Stars, Trash } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ReviewCard({
    review,
}: {
    review: Prisma.UserReviewGetPayload<{
        include: {
            author: true;
        };
    }> & {
        $optimistic?: boolean;
    };
}) {
    const { user: loggedUser } = useUser();
    const { mutate: deleteReview } = useDeleteUserReview({
        optimisticUpdate: true,
    });

    return (
        <div key={review.id} className="bg-white shadow-sm rounded-lg">
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/users/${
                                review.$optimistic
                                    ? loggedUser?.id
                                    : review.author.id
                            }`}
                        >
                            <img
                                src={
                                    review.$optimistic
                                        ? loggedUser?.profileImg
                                        : review.author.profileImg
                                }
                                className="size-10 rounded-md object-cover"
                                alt=""
                            />
                        </Link>
                        <div>
                            <h3 className="font-medium">
                                {review.$optimistic
                                    ? loggedUser?.name
                                    : review.author.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                    {review.rating.toFixed(1)}
                                </span>
                                <Stars className="text-primary" size={18} />
                            </div>
                        </div>
                    </div>

                    {!review.$optimistic &&
                        review.author.id === loggedUser?.id && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        <Ellipsis size={22} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        className="flex items-center gap-2"
                                        onClick={() =>
                                            deleteReview({
                                                where: { id: review.id },
                                            })
                                        }
                                    >
                                        <Trash size={18} />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    {review.$optimistic && (
                        <div className="relative p-3 bg-gray-100 rounded-lg mt-3">
                            <LoaderCircle className="animate-spin absolute inset-0 m-auto" />
                        </div>
                    )}
                </div>
                <div className="bg-gray-100 rounded-lg p-3 mt-3">
                    {`"${review.comment}"`}
                </div>
            </div>
        </div>
    );
}

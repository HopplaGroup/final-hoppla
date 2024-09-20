"use client";
import { Logo } from "@/components/common/logo";
import { useFindManyUserReview, useFindUniqueUser } from "@/lib/hooks";
import { Stars } from "lucide-react";
import AddReview from "./add-review";
import ReviewCard from "./review-card";
import { useMemo } from "react";
import GoBackButton from "./go-back-button";

import { useUser } from "@/lib/providers/user-provider";

export default function ContentWithReviews({
    children,
    userId,
}: {
    children: React.ReactNode;
    userId?: string;
}) {
    const { user: loggedUser } = useUser();
    const { data: user, isLoading: isUserLoading } = useFindUniqueUser(
        {
            where: {
                id: userId,
            },
        },
        {
            enabled: !!userId,
        }
    );
    const { data: userReviews, isLoading: isUserReviewsLoading } =
        useFindManyUserReview(
            {
                where: {
                    revieweeId: userId,
                },
                include: {
                    author: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            {
                enabled: !!userId,
            }
        );

    const loggedUserReview = useMemo(
        () => userReviews?.find((review) => review.authorId === loggedUser?.id),
        [userReviews, loggedUser]
    );

    console.log(loggedUserReview);

    const reviews =
        isUserReviewsLoading || !userId ? (
            <UserReviewsSkeleton />
        ) : (
            userReviews && (
                <div className="space-y-4 mt-4">
                    {/* Show the logged user's review at the top if it exists */}
                    {loggedUserReview && (
                        <ReviewCard
                            review={loggedUserReview}
                            key={loggedUserReview.id}
                        />
                    )}
                    {userReviews
                        .filter((review) => review.authorId !== loggedUser?.id)
                        .map((review) => (
                            <ReviewCard review={review} key={review.id} />
                        ))}
                    {loggedUser?.id === user?.id &&
                        userReviews.length === 0 && (
                            <div className="">
                                No reviews yet. <br />
                                Share your profile with others.
                            </div>
                        )}
                </div>
            )
        );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr]">
            <div className="bg-gray-100 p-4 lg:p-10 lg:h-screen lg:grid lg:grid-rows-[auto,1fr]">
                <div className="hidden lg:block">
                    {/* <div className="mx-2 pb-4">
                        <Logo />
                    </div> */}
                    <GoBackButton />
                    {userId &&
                        user &&
                        loggedUser?.id !== user.id &&
                        !loggedUserReview && <AddReview revieweeId={userId} />}
                </div>

                <div className="flex items-center justify-between lg:hidden">
                    <GoBackButton />
                    {/* <div className="mx-2 pb-4">
            <Logo />
          </div> */}
                </div>
                <div className="hidden lg:block h-full overflow-auto">
                    {reviews}
                </div>
            </div>
            <div className="py-2 px-6 lg:py-10 lg:pl-20 lg:pr-10 lg:h-screen lg:overflow-auto">
                {children}
            </div>
            <div className="block lg:hidden bg-gray-100 px-5">
                {user && !loggedUserReview && userId && (
                    <AddReview revieweeId={userId} />
                )}
                {reviews}
            </div>
        </div>
    );
}

const UserReviewsSkeleton = () => (
    <div className="animate-pulse">
        {[...Array(1)].map((_, index) => (
            <div key={index} className="mt-4 bg-white shadow-sm rounded-lg">
                <div>
                    <div className="p-4">
                        <div className="bg-gray-100 rounded-lg p-3"></div>
                    </div>
                    <div className="flex justify-between border-t border-t-gray-200 p-5">
                        <div>
                            <h3 className="font-medium">
                                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="font-semibold">
                                    <div className="h-6 w-12 bg-gray-200 rounded"></div>
                                </span>{" "}
                                <Stars className="text-primary" size={18} />
                            </div>
                        </div>
                        <div>
                            <div className="size-10 rounded-md object-cover bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

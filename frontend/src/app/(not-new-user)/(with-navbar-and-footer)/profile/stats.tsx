"use client";

import { useFindManyRide, useFindManyUserReview } from "@/lib/hooks";
import { Milestone, Sparkles, Wallet } from "lucide-react";

export function Stats({ userId }: { userId: string }) {
  const { data: userReviews, isLoading: isUserReviewsLoading } =
    useFindManyUserReview({
      where: {
        revieweeId: userId,
      },
    });

  const { data: userRides, isLoading: isUserRidesLoading } = useFindManyRide({
    where: {
      driverId: userId,
    },
    select: {
      _count: {
        select: {
          passengers: true,
        },
      },
      price: true,
    },
  });

  let totalEarnings = 0;

  if (userRides) {
    totalEarnings = userRides.reduce(
      (acc, ride) => acc + ride.price + ride._count.passengers,
      0
    );
  }

  let avarageRating = 0;

  if (userReviews && userReviews.length > 0) {
    avarageRating =
      userReviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0) / userReviews.length;
  }

  return (
    <div className="">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isUserRidesLoading ? (
          <StatSkeleton />
        ) : (
          <div className="flex items-center bg-white rounded-xl border-2 border-dashed h-24">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <Milestone size={24} />
              </div>
              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide font-semibold">
                    Total Rides
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                    {userRides?.length || 0}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUserRidesLoading ? (
          <StatSkeleton />
        ) : (
          <div className="flex items-center bg-white rounded-xl border-2 border-dashed h-24">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <Wallet size={24} />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide font-semibold">
                    Total Earnings
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl font-medium text-gray-800">
                    {totalEarnings.toFixed(2)} ₾
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUserReviewsLoading ? (
          <StatSkeleton />
        ) : (
          <div className="flex items-center bg-white rounded-xl border-2 border-dashed h-24">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <Sparkles size={24} />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide font-semibold">
                    Avg. Rating
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                    {avarageRating?.toFixed(1)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-24 bg-gray-200 rounded-xl"></div>

      {/* {[...Array(7)].map((_, index) => (
      <div key={index} className="flex gap-4 mb-4">
        <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
      </div>
    ))} */}
    </div>
  );
}

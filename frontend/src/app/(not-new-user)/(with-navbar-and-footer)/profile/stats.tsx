"use client";

import {
  useFindManyRide,
  useFindManyRideStartedConfirmation,
  useFindManyUserReview,
} from "@/lib/hooks";
import { Milestone, Sparkles, TicketCheck, Wallet } from "lucide-react";

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
      startedConfirmations: {
        some: {},
      },
    },
    select: {
      id: true,
      price: true,
      ridePassengerRequests: true,
      startedConfirmations: true,
    },
  });

  let totalEarnings = 0;

  if (userRides) {
    totalEarnings = userRides.reduce(
      (acc, ride) =>
        acc +
        ride.ridePassengerRequests
          .filter((p) =>
            ride.startedConfirmations.find((sc) => sc.userId === p.passengerId)
          )
          .reduce((acc, rq) => acc + (rq.preferredPrice || ride.price), 0),
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
          <div className="flex items-center bg-white rounded-xl border-2  h-24">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin-check"
                >
                  <path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="m16 18 2 2 4-4" />
                </svg>
              </div>
              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide font-semibold">
                    Finished Rides
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
          <div className="flex items-center bg-white rounded-xl border-2  h-24">
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
          <div className="flex items-center bg-white rounded-xl border-2  h-24">
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

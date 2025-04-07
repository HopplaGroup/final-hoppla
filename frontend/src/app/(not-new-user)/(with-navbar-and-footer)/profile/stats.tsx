import { Navigation, CreditCard, Award } from "lucide-react";
import * as m from "@/paraglide/messages.js";
import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";

export default async function Stats() {
    const user = (await getUser())!;
    const userId = user?.id;

    // Fetch user reviews from the database
    const userReviews = await db.userReview.findMany({
        where: {
            revieweeId: userId,
        },
    });

    // Fetch user rides with started confirmations
    const userRides = await db.ride.findMany({
        where: {
            driverId: userId,
            startedConfirmations: {
                some: {},
            },
        },
        select: {
            id: true,
            price: true,
            ridePassengerRequests: {
                select: {
                    passengerId: true,
                    preferredPrice: true,
                },
            },
            startedConfirmations: {
                select: {
                    userId: true,
                },
            },
        },
    });

    // Calculate total earnings
    let totalEarnings = 0;
    if (userRides) {
        totalEarnings = userRides.reduce(
            (acc, ride) =>
                acc +
                ride.ridePassengerRequests
                    .filter((p) =>
                        ride.startedConfirmations.find(
                            (sc) => sc.userId === p.passengerId
                        )
                    )
                    .reduce(
                        (acc, rq) => acc + (rq.preferredPrice || ride.price),
                        0
                    ),
            0
        );
    }

    // Calculate average rating
    let averageRating = 0;
    if (userReviews.length > 0) {
        averageRating =
            userReviews.reduce((acc, review) => {
                return acc + review.rating;
            }, 0) / userReviews.length;
    }

    // Format earnings with comma separator
    const formattedEarnings = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(totalEarnings);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Rides Completed Card */}
                <div className="bg-white rounded-md shadow overflow-hidden">
                    <div className="p-5 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500 tracking-wide">
                                {m.zesty_yummy_osprey_enjoy()}
                            </span>
                            <div className="text-gray-400">
                                <Navigation size={18} />
                            </div>
                        </div>

                        <div className="mt-1 mb-4">
                            <div className="flex items-baseline">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {userRides?.length || 0}
                                </h3>
                                <span className="ml-2 text-sm text-gray-500">
                                    rides
                                </span>
                            </div>
                            <div className="mt-4 w-full bg-gray-100 rounded-full h-1">
                                <div
                                    className="bg-indigo-500 h-1 rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            (userRides?.length || 0) * 5,
                                            100
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-auto pt-3 border-t border-gray-100">
                            <div className="flex items-center text-xs text-gray-500">
                                <span className="flex items-center">
                                    <span
                                        className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                            userRides?.length > 10
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                        }`}
                                    ></span>
                                    {userRides?.length > 10
                                        ? "Active driver"
                                        : "New driver"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Earnings Card */}
                <div className="bg-white rounded-md shadow overflow-hidden">
                    <div className="p-5 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500 tracking-wide">
                                {m.tidy_sad_moth_pick()}
                            </span>
                            <div className="text-gray-400">
                                <CreditCard size={18} />
                            </div>
                        </div>

                        <div className="mt-1 mb-4">
                            <div className="flex items-baseline">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {formattedEarnings} ₾
                                </h3>
                                <span className="ml-2 text-sm text-gray-500">
                                    total
                                </span>
                            </div>
                            <div className="mt-4 w-full bg-gray-100 rounded-full h-1">
                                <div
                                    className="bg-blue-500 h-1 rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            (totalEarnings / 1000) * 10,
                                            100
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-auto pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>
                                    {Math.round(
                                        totalEarnings / (userRides?.length || 1)
                                    ).toFixed(2)}{" "}
                                    ₾ per ride
                                </span>
                                <span
                                    className={
                                        totalEarnings > 1000
                                            ? "text-blue-500"
                                            : ""
                                    }
                                >
                                    {totalEarnings > 1000 ? "+" : ""}
                                    {((totalEarnings / 1000) * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Average Rating Card */}
                <div className="bg-white rounded-md shadow overflow-hidden">
                    <div className="p-5 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500 tracking-wide">
                                {m.icy_loud_loris_kick()}
                            </span>
                            <div className="text-gray-400">
                                <Award size={18} />
                            </div>
                        </div>

                        <div className="mt-1 mb-4">
                            <div className="flex items-baseline">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {averageRating.toFixed(1)}
                                </h3>
                                <span className="ml-2 text-sm text-gray-500">
                                    / 5.0
                                </span>
                                <span className="ml-2 text-xs text-gray-400">
                                    ({userReviews.length})
                                </span>
                            </div>

                            <div className="mt-4 w-full bg-gray-100 rounded-full h-1">
                                <div
                                    className="bg-yellow-500 h-1 rounded-full"
                                    style={{
                                        width: `${(averageRating / 5) * 100}%`,
                                    }}
                                ></div>
                            </div>

                            {averageRating > 0 && (
                                <div className="mt-3 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="mr-1 text-xs">
                                            {i < Math.floor(averageRating) ? (
                                                <div className="w-6 h-1 bg-yellow-500"></div>
                                            ) : i < Math.ceil(averageRating) &&
                                              i >= Math.floor(averageRating) ? (
                                                <div className="w-6 h-1">
                                                    <div
                                                        className="h-1 bg-yellow-500"
                                                        style={{
                                                            width: `${
                                                                (averageRating %
                                                                    1) *
                                                                100
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            ) : (
                                                <div className="w-6 h-1 bg-gray-200"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-auto pt-3 border-t border-gray-100">
                            <div className="flex items-center text-xs text-gray-500">
                                <span
                                    className={
                                        averageRating >= 4.5
                                            ? "text-yellow-500"
                                            : ""
                                    }
                                >
                                    {averageRating >= 4.5
                                        ? "Top rated driver"
                                        : averageRating >= 4.0
                                        ? "Well-rated driver"
                                        : averageRating >= 3.0
                                        ? "Average rating"
                                        : "Needs improvement"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

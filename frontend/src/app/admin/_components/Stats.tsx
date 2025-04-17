// app/admin/dashboard/stats.tsx
import { Suspense } from "react";
import {
    TrendingUp,
    TrendingDown,
    Users,
    Car,
    CreditCard,
    BarChart3,
} from "lucide-react";
import { RIDE_PRICE } from "@/lib/bog/constants";
import db from "@/lib/utils/db";
import * as m from "@/paraglide/messages.js";

// Types for our stats
type Stat = {
    title: string;
    value: number | string;
    previousValue?: number;
    icon: React.ElementType;
    suffix?: string;
    description?: string;
    change?: {
        value: number;
        trend: "up" | "down" | "neutral";
        label: string;
    };
    color?: "primary" | "blue" | "green" | "amber";
};

export default function Stats() {
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
                <Suspense fallback={<StatCardSkeleton />}>
                    <UsersStatCard />
                </Suspense>
                <Suspense fallback={<StatCardSkeleton />}>
                    <RidesStatCard />
                </Suspense>
                <Suspense fallback={<StatCardSkeleton />}>
                    <RevenueStatCard />
                </Suspense>
                <Suspense fallback={<StatCardSkeleton />}>
                    <ConversionStatCard />
                </Suspense>
            </div>
        </section>
    );
}

function StatCard({ stat }: { stat: Stat }) {
    // Enhanced color configurations with unique schemes for each variant
    const colorConfigs = {
        primary: {
            iconBg: "bg-primary/10 backdrop-blur-sm",
            iconColor: "text-primary",
            highlight: "border-l-4 border-primary-500",
            changeUpBg: "bg-emerald-500/10",
            changeUpText: "text-emerald-700",
            changeDownBg: "bg-rose-500/10",
            changeDownText: "text-rose-700",
            glow: "",
        },
        blue: {
            iconBg: "bg-blue-100/80 backdrop-blur-sm",
            iconColor: "text-blue-600",
            highlight: "border-l-4 border-blue-400",
            changeUpBg: "bg-emerald-500/10",
            changeUpText: "text-emerald-700",
            changeDownBg: "bg-rose-500/10",
            changeDownText: "text-rose-700",
            glow: "",
        },
        green: {
            iconBg: "bg-emerald-100/80 backdrop-blur-sm",
            iconColor: "text-emerald-600",
            highlight: "border-l-4 border-emerald-400",
            changeUpBg: "bg-emerald-500/10",
            changeUpText: "text-emerald-700",
            changeDownBg: "bg-rose-500/10",
            changeDownText: "text-rose-700",
            glow: "",
        },
        amber: {
            iconBg: "bg-amber-100/80 backdrop-blur-sm",
            iconColor: "text-amber-600",
            highlight: "border-l-4 border-amber-400",
            changeUpBg: "bg-emerald-500/10",
            changeUpText: "text-emerald-700",
            changeDownBg: "bg-rose-500/10",
            changeDownText: "text-rose-700",
            glow: "",
        },
    };

    const config = colorConfigs[stat.color || "primary"];

    return (
        <div
            className={`w-full group bg-white rounded-xl shadow-md border border-gray-100/70 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:ring-2 ring-primary relative overflow-hidden`}
        >
            <div className="p-4 sm:p-5 w-full">
                <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold uppercase tracking-wide truncate">
                            {stat.title}
                        </h3>
                        <div className="flex items-baseline mt-2 sm:mt-3">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 truncate">
                                {stat.value}
                            </span>
                            {stat.suffix && (
                                <span className="ml-1 sm:ml-2 text-base sm:text-lg font-medium text-gray-500">
                                    {stat.suffix}
                                </span>
                            )}
                        </div>
                        {stat.description && (
                            <p className="text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed line-clamp-1">
                                {stat.description}
                            </p>
                        )}
                    </div>
                    <div
                        className={`p-2 sm:p-3 rounded-xl ${config.iconBg} transition-colors`}
                    >
                        <stat.icon
                            className={`w-5 h-5 sm:w-7 sm:h-7 ${config.iconColor} transition-transform group-hover:scale-110`}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>
                {stat.change && (
                    <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center flex-wrap">
                                <div
                                    className={`
                                        flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full
                                        ${
                                            stat.change.trend === "up"
                                                ? config.changeUpBg +
                                                  " " +
                                                  config.changeUpText
                                                : config.changeDownBg +
                                                  " " +
                                                  config.changeDownText
                                        }
                                        transition-all duration-200
                                    `}
                                >
                                    {stat.change.trend === "up" ? (
                                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                                    )}
                                    <span className="text-xs sm:text-sm font-medium">
                                        {stat.change.value}%
                                    </span>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600 ml-2 font-medium">
                                    {stat.change.label}
                                </span>
                            </div>
                            {/* <span className="text-xs text-gray-400 font-medium">
                                vs. previous
                            </span> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
// Loading skeleton
function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 animate-pulse">
            <div className="flex justify-between">
                <div className="space-y-3">
                    <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                    <div className="h-7 bg-gray-300 rounded-full w-32"></div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="h-3 bg-gray-300 rounded-full w-16"></div>
                    <div className="h-3 bg-gray-300 rounded-full w-10"></div>
                </div>
            </div>
        </div>
    );
}

// Individual stat cards
async function UsersStatCard() {
    // Get current total user count
    const totalUsers = await db.user.count();

    // Get users from previous period (7 days ago)
    const previousPeriodDate = new Date();
    previousPeriodDate.setDate(previousPeriodDate.getDate() - 7);

    const previousUsers = await db.user.count({
        where: {
            createdAt: {
                lt: previousPeriodDate,
            },
        },
    });

    // Calculate new users in this period
    const newUsers = totalUsers - previousUsers;

    // Calculate percentage change
    const percentChange =
        previousUsers > 0 ? (newUsers / previousUsers) * 100 : 100;

    const stat: Stat = {
        title: m.inner_bald_frog_tend(),
        value: totalUsers,
        previousValue: previousUsers,
        icon: Users,
        description: m.misty_tidy_flamingo_gleam(),
        change: {
            value: Math.abs(Math.round(percentChange * 10) / 10),
            trend: percentChange >= 0 ? "up" : "down",
            label: m.wacky_mellow_hamster_bless(),
        },
        color: "primary",
    };

    return <StatCard stat={stat} />;
}

async function RidesStatCard() {
    // Get current total ride count
    const totalRides = await db.ride.count({
        where: {
            startedConfirmations: {
                some: {},
            },
        },
    });

    // Get rides from previous period (7 days ago)
    const previousPeriodDate = new Date();
    previousPeriodDate.setDate(previousPeriodDate.getDate() - 7);

    const previousPeriodRides = await db.ride.count({
        where: {
            startedConfirmations: {
                some: {},
            },
            createdAt: {
                lt: previousPeriodDate,
            },
        },
    });

    // Calculate new rides in this period
    const newRides = totalRides - previousPeriodRides;

    // Calculate percentage change
    const percentChange =
        previousPeriodRides > 0 ? (newRides / previousPeriodRides) * 100 : 100;

    const stat: Stat = {
        title: m.lime_brave_tiger_jolt(),
        value: totalRides,
        icon: Car,
        description: m.petty_stale_quail_yell(),
        change: {
            value: Math.abs(Math.round(percentChange * 10) / 10),
            trend: percentChange >= 0 ? "up" : "down",
            label: m.wacky_mellow_hamster_bless(),
        },
        color: "blue",
    };

    return <StatCard stat={stat} />;
}

async function RevenueStatCard() {
    // Get current total ride count for revenue calculation
    const totalRides = await db.ride.count({
        where: {
            startedConfirmations: {
                some: {},
            },
        },
    });

    // Calculate current revenue
    const currentRevenue = totalRides * RIDE_PRICE;

    // Get rides from previous period (7 days ago)
    const previousPeriodDate = new Date();
    previousPeriodDate.setDate(previousPeriodDate.getDate() - 7);

    const previousPeriodRides = await db.ride.count({
        where: {
            startedConfirmations: {
                some: {},
            },
            createdAt: {
                lt: previousPeriodDate,
            },
        },
    });

    // Calculate previous period revenue
    const previousRevenue = previousPeriodRides * RIDE_PRICE;

    // Calculate percentage change
    const percentChange =
        previousRevenue > 0
            ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
            : 100;

    const stat: Stat = {
        title: m.weird_zesty_carp_bend(),
        value: currentRevenue.toLocaleString(),
        suffix: "₾",
        icon: CreditCard,
        description: m.slow_round_guppy_catch(),
        change: {
            value: Math.abs(Math.round(percentChange * 10) / 10),
            trend: percentChange >= 0 ? "up" : "down",
            label: m.wacky_mellow_hamster_bless(),
        },
        color: "green",
    };

    return <StatCard stat={stat} />;
}

async function ConversionStatCard() {
    // Get total rides created
    const totalRidesCreated = await db.ride.count();

    // Get rides that were started
    const startedRides = await db.ride.count({
        where: {
            startedConfirmations: {
                some: {},
            },
        },
    });

    // Calculate current conversion rate
    const currentConversionRate =
        totalRidesCreated > 0 ? (startedRides / totalRidesCreated) * 100 : 0;

    // Get previous period data
    const previousPeriodDate = new Date();
    previousPeriodDate.setDate(previousPeriodDate.getDate() - 7);

    const previousTotalRides = await db.ride.count({
        where: {
            createdAt: {
                lt: previousPeriodDate,
            },
        },
    });

    const previousStartedRides = await db.ride.count({
        where: {
            startedConfirmations: {
                some: {},
            },
            createdAt: {
                lt: previousPeriodDate,
            },
        },
    });

    // Calculate previous conversion rate
    const previousConversionRate =
        previousTotalRides > 0
            ? (previousStartedRides / previousTotalRides) * 100
            : 0;

    // Calculate percentage change
    const percentChange =
        previousConversionRate > 0
            ? ((currentConversionRate - previousConversionRate) /
                  previousConversionRate) *
              100
            : 0;

    const stat: Stat = {
        title: m.honest_bright_lemming_launch(),
        value: Math.round(currentConversionRate * 10) / 10,
        suffix: "%",
        icon: BarChart3,
        description: m.born_wide_sawfish_clip(),
        change: {
            value: Math.abs(Math.round(percentChange * 10) / 10),
            trend: percentChange >= 0 ? "up" : "down",
            label: m.wacky_mellow_hamster_bless(),
        },
        color: "amber",
    };

    return <StatCard stat={stat} />;
}

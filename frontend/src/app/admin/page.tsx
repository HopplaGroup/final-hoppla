import LanguageSwitcher from "@/app/_components/LanguageSwitcher";
import Stats from "./_components/Stats";
import {
    Settings,
    Users,
    Activity,
    FileText,
} from "lucide-react";
import * as m from "@/paraglide/messages.js";
import db from "@/lib/utils/db";
import { formatDistanceToNow } from "@/lib/utils/dateUtils";

export default async function AdminPage() {
    const recentUsers = await db.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
            id: true,
            name: true,
            email: true,
            profileImg: true,
            createdAt: true,
        },
    });

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Dashboard Header */}
            <div className="sticky top-0 left-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-lg sm:text-2xl font-semibold line-clamp-1">
                            {m.white_deft_bat_prosper()}
                        </h1>
                        <p className="text-sm text-gray-800 mt-1 line-clamp-1">
                            {m.quiet_late_piranha_fade()}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                        <button className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                {/* Stats Section */}
                <section className="mb-8">
                    <Stats />
                </section>

                {/* Quick Actions */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        {m.helpful_busy_lionfish_view()}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ActionCard
                            title="Manage Users"
                            description="View and edit user accounts"
                            icon={Users}
                            color="primary"
                        />
                        <ActionCard
                            title="Activity Logs"
                            description="Review recent system activity"
                            icon={Activity}
                            color="blue"
                        />
                        <ActionCard
                            title="Reports"
                            description="Generate and export reports"
                            icon={FileText}
                            color="green"
                        />
                        <ActionCard
                            title="System Settings"
                            description="Configure application settings"
                            icon={Settings}
                            color="amber"
                        />
                    </div>
                </section>

                {/* Recent Activity Section */}
                <section>
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {m.flat_livid_dolphin_clasp()}
                            </h2>
                            <button className="text-sm text-primary font-medium hover:underline">
                                {m.giant_tame_lemming_assure()}
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentUsers.map((user) => (
                                <ActivityItem
                                    key={user.id}
                                    profileImg={user.profileImg}
                                    name={user.name}
                                    email={user.email}
                                    time={formatDistanceToNow(user.createdAt, {
                                        addSuffix: true,
                                    })}
                                />
                            ))}
                            {recentUsers.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-3">
                                    No recent activities
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

// Action Card Component
function ActionCard({
    title,
    description,
    icon: Icon,
    color,
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    color: "primary" | "blue" | "green" | "amber";
}) {
    const colorMap = {
        primary: "bg-primary/10 text-primary border-primary",
        blue: "bg-blue-100/80 text-blue-600 border-blue-400",
        green: "bg-emerald-100/80 text-emerald-600 border-emerald-400",
        amber: "bg-amber-100/80 text-amber-600 border-amber-400",
    };

    return (
        <div
            className={`p-4 rounded-xl border-l-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer ${colorMap[color]}`}
        >
            <div className="flex items-start">
                <div
                    className={`p-2 rounded-lg ${
                        colorMap[color].split(" ")[0]
                    }`}
                >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({
    profileImg,
    name,
    email,
    time,
}: {
    profileImg: string;
    name: string;
    email: string;
    time: string;
}) {
    return (
        <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                    src={profileImg || "/api/placeholder/40/40"}
                    alt={`${name}'s profile`}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{name}</p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
            <span className="text-xs">{time}</span>
        </div>
    );
}

import LanguageSwitcher from "@/app/_components/LanguageSwitcher";
import { Home, ArrowLeft, Search } from "lucide-react";
import * as m from "@/paraglide/messages.js";
import Link from "next/link";
import BackButton from "./BackButton";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Dashboard Header */}
            <div className="sticky top-0 left-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-lg sm:text-2xl font-semibold line-clamp-1">
                            {m.lucky_ideal_bumblebee_love()}
                        </h1>
                        <p className="text-sm text-gray-800 mt-1 line-clamp-1">
                            {m.safe_hour_squid_hug()}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-5 md:py-10">
                <div className="max-w-lg mx-auto text-center">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 mb-6">
                        <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
                            <Search className="w-8 h-8" strokeWidth={1.5} />
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                            {m.cute_fun_rat_laugh()}
                        </h2>

                        <p className="text-gray-600 mb-6">
                            {m.cute_royal_frog_clip()}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/admin"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                <span>{m.stale_mild_walrus_pick()}</span>
                            </Link>
                            <BackButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

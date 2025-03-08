import { Separator } from "@/components/ui/separator";
import * as m from "@/paraglide/messages.js";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-3xl font-bold text-center mt-6 text-gray-900">
                {m.full_same_gecko_express()}
            </div>
            <Separator className="my-6" />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Skeleton loaders for ride cards with styling matching Hero component */}
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-xl shadow-lg animate-pulse"
                    >
                        <div className="flex justify-between">
                            <div className="w-3/4 space-y-4">
                                <div className="h-7 bg-gray-200 rounded-md w-1/2"></div>
                                <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                            </div>
                            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10">
                                <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="h-3 bg-gray-200 rounded-md w-full"></div>
                            <div className="h-3 bg-gray-200 rounded-md w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded-md w-4/6"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center text-gray-500 mt-8">
                {`${m.wide_tired_shell_favor()}...`}
            </div>
        </div>
    );
}

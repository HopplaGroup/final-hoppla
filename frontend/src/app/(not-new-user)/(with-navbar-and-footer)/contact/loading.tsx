import { MapPin, Mail, Phone, MessageSquare, Settings } from "lucide-react";

export default function ContactPageLoading() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="container py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Card - Loading State */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-6"></div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="p-2 rounded-lg bg-gray-200 animate-pulse">
                                        <Mail
                                            className="w-5 h-5 text-gray-300"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse mt-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form - Loading State */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                <div>
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            <div className="mb-6">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                                <div className="h-32 w-full bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            <div className="flex justify-end">
                                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import React from "react";
import Image from "next/image";
import * as m from "@/paraglide/messages.js";
import SearchBarLanding from "./serch-bar-landing";

type HeroProps = {
    primaryColor?: string;
    backgroundImage: any; // For the Image component
};

export function Hero({ primaryColor = "primary", backgroundImage }: HeroProps) {
    return (
        <section className="relative w-full">
            {/* Background image container */}
            <div className="absolute inset-0 h-[600px] w-full overflow-hidden">
                <Image
                    className="object-cover object-center h-full w-full"
                    src={backgroundImage}
                    alt="Hero background image"
                    priority
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
            </div>

            {/* Content container */}
            <div className="relative h-[600px] z-10">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex flex-col h-full justify-between items-center py-12">
                        {/* Top section with headline */}
                        <div className="max-w-2xl mt-16 text-center">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                {m.ago_clean_fireant_zoom()}
                            </h1>
                            <p className="text-xl text-white/90 max-w-xl">
                                {m.steep_north_mongoose_feel()}
                            </p>
                        </div>

                        {/* Bottom section with search */}
                        <div className="w-full mb-12">
                            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto transform translate-y-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                                        {m.early_born_crow_arrive()}
                                    </h2>
                                    <p className="text-gray-600">
                                        {m.least_born_butterfly_commend()}
                                    </p>
                                </div>
                                <SearchBarLanding />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features section below the hero */}
            <div className="bg-gray-50 pt-20 pb-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: m.lost_loved_larva_conquer(),
                                description: m.least_born_butterfly_commend(),
                                icon: (
                                    <svg
                                        className="size-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                                        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                                        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                                        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                                        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                                    </svg>
                                ),
                            },
                            {
                                title: m.teal_wild_cheetah_heart(),
                                description: m.hour_wide_puma_file(),
                                icon: (
                                    <svg
                                        className="size-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m12 14 4-4" />
                                        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                                    </svg>
                                ),
                            },
                            {
                                title: m.jolly_safe_sawfish_play(),
                                description: m.mushy_soft_thrush_peel(),
                                icon: (
                                    <svg
                                        className="size-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                    </svg>
                                ),
                            },
                        ].map((feature, index) => (
                            <div key={index} className="flex">
                                <div
                                    className={`flex-shrink-0 mr-4 h-12 w-12 flex items-center justify-center rounded-lg bg-${primaryColor}/10 text-${primaryColor}`}
                                >
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

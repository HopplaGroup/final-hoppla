import React from "react";
import Image from "next/image";
import * as m from "@/paraglide/messages.js";

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: m.inclusive_patchy_tuna_mend(),
            description: m.lime_keen_swan_hope(),
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
            ),
        },
        {
            number: 2,
            title: m.that_same_stingray_leap(),
            description: m.tame_still_horse_enchant(),
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            ),
        },
        {
            number: 3,
            title: m.mellow_knotty_sheep_jolt(),
            description: m.fuzzy_mad_mallard_hunt(),
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            ),
        },
    ];

    return (
        <section className="mt-24 relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                        {m.hour_wide_puma_file()}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                        {m.such_fun_weasel_seek()}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {m.glad_sad_quail_bless()}
                    </p>
                </div>

                {/* Process timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting line */}
                    {/* <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div> */}

                    {/* Steps */}
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center"
                            >
                                {/* Step number with icon */}
                                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary text-white shadow-lg md:mb-8 z-10">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className="text-center px-4">
                                    <div className="inline-flex items-center justify-center w-8 h-8 mb-4 rounded-full bg-primary/10 text-primary font-bold">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow for mobile */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden flex justify-center w-full mt-8">
                                        <svg
                                            className="w-8 h-8 text-primary/30"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

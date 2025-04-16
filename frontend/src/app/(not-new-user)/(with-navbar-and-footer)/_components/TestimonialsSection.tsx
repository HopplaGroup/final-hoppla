import Image from "next/image";
import * as m from "@/paraglide/messages.js";

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: m.loose_odd_macaw_love(),
            image: "/assets/mari2.webp",
            alt: "Mariami",
            text: m.teary_nice_swan_adapt(),
        },
        {
            name: m.watery_formal_mantis_fear(),
            image: "/assets/ilia.webp",
            alt: "Ilia",
            text: m.teal_yummy_kangaroo_care(),
        },
        {
            name: m.loose_flat_dove_nourish(),
            image: "/assets/gaioz.jpg",
            alt: "Gaioz",
            text: m.bad_bland_swan_taste(),
        },
    ];

    return (
        <section className="relative w-full py-20 bg-gray-50">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100"></div>

            {/* Content container */}
            <div className="relative container mx-auto px-4 z-10">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                        {m.large_bad_swan_zoom()}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {m.active_that_reindeer_thrive()}
                    </p>
                </div>

                {/* Testimonials grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-2"
                        >
                            {/* Testimonial content */}
                            <div className="flex flex-col h-full">
                                {/* Quote mark */}
                                <div className="text-primary/20 mb-4">
                                    <svg
                                        className="w-12 h-12"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Testimonial text */}
                                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                    {testimonial.text}
                                </p>

                                {/* Author info */}
                                <div className="flex items-center mt-auto">
                                    <Image
                                        width={56}
                                        height={56}
                                        alt={testimonial.alt}
                                        src={testimonial.image}
                                        className="w-14 h-14 object-cover rounded-full shadow-md border-2 border-white"
                                    />
                                    <div className="ml-4">
                                        <h4 className="text-lg font-bold text-gray-800">
                                            {testimonial.name}
                                        </h4>

                                        {/* Star rating */}
                                        <div className="flex space-x-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 fill-primary"
                                                    viewBox="0 0 14 13"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

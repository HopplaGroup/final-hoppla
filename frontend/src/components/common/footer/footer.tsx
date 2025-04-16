import Image from "next/image";
import * as m from "@/paraglide/messages.js";
import Logo from "@/app/_components/Logo";

const TwoColumnFooter = () => {
    const navigation = {
        connect: [
            {
                name: m.clean_sunny_shad_intend(),
                href: "https://www.linkedin.com/company/hoppla1/",
            },
            {
                name: "Facebook",
                href: "https://www.facebook.com/hoppla.ge",
            },
            {
                name: "Instagram",
                href: "https://www.instagram.com/hoppla.ge/",
            },
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/company/hoppla1/",
            },
        ],
        company: [
            { name: m.each_last_buzzard_talk(), href: "/terms" },
            { name: m.stock_noble_carp_chop(), href: "/privacy" },
            {
                name: m.mild_this_parrot_launch(),
                href: "https://www.facebook.com/groups/139807159557518",
            },
        ],
    };

    return (
        <footer
            aria-labelledby="footer-heading"
            className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="container mx-auto max-w-7xl">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Company Info Section */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="transform transition hover:scale-105 duration-300">
                            <Logo />
                        </div>

                        <p className="text-md max-w-md leading-relaxed text-gray-600 dark:text-gray-400 font-light">
                            {m.quick_even_termite_roam()}
                        </p>

                        <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <div>{m.east_weak_racoon_roam()}</div>
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Connect Section */}
                            <div>
                                <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    {m.deft_wacky_gadfly_sew()}
                                </h3>
                                <ul className="space-y-4">
                                    {navigation.connect.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors duration-200"
                                            >
                                                <span className="relative inline-block pr-2">
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                                    {item.name}
                                                </span>
                                                <svg
                                                    className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company Section */}
                            <div>
                                <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    {m.tiny_mild_warthog_cut()}
                                </h3>
                                <ul className="space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className="group flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors duration-200 break-words"
                                            >
                                                <span className="relative inline-block pr-2">
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                                    {item.name}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} Hoppla Group.{" "}
                            {m.mealy_green_dragonfly_trip()}
                        </p>

                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Back to top</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default TwoColumnFooter;

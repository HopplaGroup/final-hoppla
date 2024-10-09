import Image from "next/image";
import { Logo } from "../logo";
import * as m from "@/paraglide/messages.js";

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
            { name: m.stock_noble_carp_chop(), href: "/terms" },
            {
                name: m.mild_this_parrot_launch(),
                href: "https://www.facebook.com/groups/139807159557518",
            },
        ],
    };
    return (
        <footer
            aria-labelledby="footer-heading"
            className="container mb-10 mt-10"
        >
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="">
                <div className="flex flex-col justify-between lg:flex-row">
                    <div className="space-y-8">
                        <Logo />
                        <p className="text-md max-w-xs leading-6 text-gray-700 dark:text-gray-300">
                            {m.quick_even_termite_roam()}
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-700  dark:text-gray-300">
                            <div>{m.east_weak_racoon_roam()}</div>
                        </div>
                    </div>
                    {/* Navigations */}
                    <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
                        <div className="md:mt-0">
                            <h3 className="text-sm font-semibold leading-6 text-gray-900  dark:text-gray-200">
                                {m.deft_wacky_gadfly_sew()}
                            </h3>
                            <div className="mt-6 space-y-4">
                                {navigation.connect.map((item) => (
                                    <div key={item.name}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                                        >
                                            {item.name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                                    {m.tiny_mild_warthog_cut()}
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <div key={item.name}>
                                            <a
                                                href={item.href}
                                                className="
                                                break-all
                                                text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                                            >
                                                {item.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-100/10">
                    <p className="text-xs leading-5 text-gray-700 dark:text-gray-300">
                        &copy; 2024 Hoppla Group.{" "}
                        {m.mealy_green_dragonfly_trip()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default TwoColumnFooter;

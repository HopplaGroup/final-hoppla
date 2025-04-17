"use client";
import { languageTag, AvailableLanguageTag } from "@/paraglide/runtime";
import * as m from "@/paraglide/messages.js";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, usePathname } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

export default function LanguageSwitcher({
    position = "right",
    customButton,
    className,
    labelClassName,
}: {
    position?: "left" | "right";
    customButton?: (onClick: () => void, label: string) => JSX.Element | null;
    className?: string;
    labelClassName?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const languages = {
        ka: {
            label: "ქართული",
            flagImg: "/assets/ka-flag.jpg",
        },
        en: {
            label: "English",
            flagImg: "/assets/en-flag.jpg",
        },
    } as Record<
        AvailableLanguageTag,
        {
            label: string;
            flagImg: string;
        }
    >;

    const currentLanguage = languageTag();
    const pathname = usePathname();

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div
            className={cn("relative  inline-block", className)}
            ref={dropdownRef}
        >
            {/* Dropdown Trigger Button */}

            {customButton ? (
                customButton(toggleDropdown, languages[currentLanguage].label)
            ) : (
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium bg-transparent hover:bg-gray-200 rounded-full focus:outline-none transition-colors"
                >
                    <Globe className="" size={18} />
                    <span className={cn("hidden md:block", labelClassName)}>
                        {languages[currentLanguage].label}
                    </span>
                </button>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={cn(
                        "absolute mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
                        {
                            "right-4": position === "right",
                            "left-4": position === "left",
                        }
                    )}
                >
                    {/* Dropdown Header */}
                    <div className="px-4 py-2 text-sm font-medium">
                        {m.bold_bland_puffin_fetch()}
                    </div>

                    {/* Dropdown Separator */}
                    <div className="h-px bg-gray-200"></div>

                    {/* Dropdown Items */}
                    <div className="py-1">
                        {Object.keys(languages).map((lang) => (
                            <Link
                                key={lang}
                                href={pathname}
                                locale={lang as AvailableLanguageTag}
                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => setIsOpen(false)}
                            >
                                <img
                                    src={
                                        languages[lang as AvailableLanguageTag]
                                            .flagImg
                                    }
                                    alt={
                                        languages[lang as AvailableLanguageTag]
                                            .label
                                    }
                                    className="h-5 w-8 object-cover mr-2"
                                />
                                {languages[lang as AvailableLanguageTag].label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

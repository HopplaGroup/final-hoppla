"use client";
import { Button } from "@/components/ui/actions/button";
import AuthBlock from "./auth-block";
import { Logo } from "../logo";
import { LanguageSwitcher } from "../language-switcher";
import {
    AlignJustify,
    Plus,
    Ticket,
    Search,
    X,
    User,
    Menu,
    Home,
    Info,
    Phone,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavigationDrawer from "./drawer";
import * as m from "@/paraglide/messages.js";
import { useUser } from "@/lib/providers/user-provider";
import { useCountCar } from "@/lib/hooks";

type NavbarProps = {
    driverHasCar?: boolean;
};

export function Navbar({}: NavbarProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const { user } = useUser();

    const NAV_ITEMS = [
        { href: "/", label: m.lofty_nimble_goat_succeed(), icon: Home },
        { href: "/about", label: m.tense_every_swallow_clap(), icon: Info },
        { href: "/contact", label: m.round_sour_gazelle_peel(), icon: Phone },
    ];

    const { data: carsCount } = useCountCar(
        {
            where: {
                ownerId: user?.id,
            },
        },
        {
            enabled: !!user,
        }
    );

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`top-0 left-0 right-0 w-screen fixed z-[100] transition-all duration-300 ${
                scrolled ? "bg-white shadow-md" : "bg-white "
            }`}
        >
            <div className="container">
                <NavigationDrawer
                    isOpen={isDrawerOpen}
                    toggleDrawer={toggleDrawer}
                />

                <div className="flex h-16 md:h-20 items-center justify-between">
                    {/* Left Side */}
                    <div className="flex items-center gap-6">
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 md:hidden"
                            onClick={toggleDrawer}
                            aria-label="Toggle menu"
                        >
                            {isDrawerOpen ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </button>

                        <div className="flex items-center">
                            <NavbarLogo />
                        </div>

                        <div className="items-center space-x-1 hidden md:flex">
                            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="relative font-medium px-3 py-2 text-sm text-gray-900 flex items-center gap-2 transition-colors group"
                                >
                                    {/* <Icon size={18} className="" /> */}
                                    <span>{label}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />

                        {carsCount !== undefined && carsCount > 0 && (
                            <Button
                                variant="ghost"
                                className="hidden md:flex items-center justify-center gap-2 rounded-full px-4 transition-colors duration-200"
                                href={"/add-ride"}
                            >
                                <Plus size={18} />
                                <span className="hidden md:inline font-medium text-sm">
                                    {m.actual_watery_fireant_foster()}
                                </span>
                            </Button>
                        )}

                        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

                        <div className="flex items-center gap-0">
                            <Button
                                variant="ghost"
                                className="hidden md:flex items-center justify-center gap-2 rounded-full px-4 transition-colors duration-200"
                                href={"/search/current-rides"}
                            >
                                <Ticket size={18} />
                                <span className="font-medium text-sm">
                                    {m.odd_sleek_mink_taste()}
                                </span>
                            </Button>
                            <AuthBlock />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom border - only visible on scroll */}
            <div
                className={`h-px bg-gray-200 dark:bg-gray-800 transition-opacity duration-300 ${
                    scrolled ? "opacity-0" : "opacity-100"
                }`}
            ></div>
        </nav>
    );
}

function NavbarLogo() {
    return (
        <div className="transition-transform duration-200 hover:scale-105">
            <Logo />
        </div>
    );
}

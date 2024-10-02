"use client";
import { Button } from "@/components/ui/actions/button";
import AuthBlock from "./auth-block";
import { Logo } from "../logo";
import { LanguageSwitcher } from "../language-switcher";
import { AlignJustify, Plus, Ticket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NavigationDrawer from "./drawer";

type NavbarProps = {
  driverHasCar?: boolean;
};

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  // { href: "/search", label: "Search" },
  { href: "/terms", label: "About" },
  { href: "/contact", label: "Contact" },
];

// TODO: NAVBARS RO AKLIKEB CONTEXT MENUZE, LEPTOPIS ZOMAZE, DATAMASHOBS IQET AQET
export function Navbar({ driverHasCar }: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <nav
      style={{
        paddingLeft: "calc(100vw - 100%)",
      }}
      className="top-0 left-0 w-full fixed z-[100] bg-background"
    >
      <div className="container">
        <NavigationDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="block md:hidden" onClick={toggleDrawer}>
              <AlignJustify />
            </button>
            <NavbarLogo />
            {/* <div className="items-center gap-2 hidden md:flex">
                            {NAV_ITEMS.slice(1).map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="font-medium px-2 py-2 text-base hover:underline"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div> */}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 font-semibold pl-2 pr-2"
              href={"/search/current-rides"}
            >
              <Ticket />
            </Button>

            {driverHasCar && (
              <Button
                variant="ghost"
                className="flex items-center gap-2 font-semibold"
                href={"/add-ride"}
              >
                <Plus />{" "}
                <span className="hidden md:inline">Publish the ride</span>
              </Button>
            )}
            <AuthBlock />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavbarLogo() {
  return <Logo />;
}

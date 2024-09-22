"use client";
import { Button } from "@/components/ui/actions/button";
import AuthBlock from "./auth-block";
import { Logo } from "../logo";
import { LanguageSwitcher } from "../language-switcher";
import { Plus } from "lucide-react";
import Link from "next/link";

type NavbarProps = {};

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  // { href: "/search", label: "Search" },
  { href: "/terms", label: "About" },
  { href: "/contact", label: "Contact" },
];

// TODO: NAVBARS RO AKLIKEB CONTEXT MENUZE, LEPTOPIS ZOMAZE, DATAMASHOBS IQET AQET
export function Navbar({}: NavbarProps) {
  const isDriver = true;
  //TODO: Here add user info, to check if it is driver or not
  return (
    <nav
      style={{
        paddingLeft: "calc(100vw - 100%)",
      }}
      className="top-0 left-0 w-full fixed z-[100] bg-background"
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <NavbarLogo />
            <div className="items-center gap-2 hidden md:flex">
              {NAV_ITEMS.slice(1).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-medium px-2 py-2 text-base hover:underline"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isDriver && (
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

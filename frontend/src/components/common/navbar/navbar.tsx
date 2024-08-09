"use client";
import { Button } from "@/components/ui/actions/button";
import {
  ThemeControllerDropdown,
  ThemeControllerSwap,
} from "@/components/ui/actions/theme-controller";
import { Avatar } from "@/components/ui/data-display/avatar";
import Image from "next/image";
import AuthBlock from "./auth-block";
import { Logo } from "../logo";
import { LanguageSwitcher } from "../language-switcher";

type NavbarProps = {};

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({}: NavbarProps) {
  return (
    <nav
      style={{
        paddingLeft: "calc(100vw - 100%)",
      }}
      className="top-0 left-0 w-full fixed z-[50] bg-background"
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <NavbarLogo />
          {/* <div className="items-center gap-4 hidden md:flex">
            {NAV_ITEMS.slice(1).map(({ href, label }) => (
              <Button key={href} href={href} variant="ghost">
                {label}
              </Button>
            ))}
          </div> */}
          <div className="flex items-center gap-1">
            {/* <ThemeControllerSwap /> */}
            <LanguageSwitcher />
            <AuthBlock />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavbarLogo() {
  return (
    <Button
      href="/"
      variant="ghost"
      className="font-bold text-xl relative -left-4"
    >
      <Logo />
    </Button>
  );
}

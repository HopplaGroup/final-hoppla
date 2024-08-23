"use client";
import { Button } from "@/components/ui/actions/button";
import AuthBlock from "./auth-block";
import { Logo } from "../logo";
import { LanguageSwitcher } from "../language-switcher";
import { Plus } from "lucide-react";

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
          <div className="flex items-center gap-6">
            <NavbarLogo />
            <div className="items-center gap-2 hidden md:flex">
              {NAV_ITEMS.slice(1).map(({ href, label }) => (
                <Button key={href} href={href} variant="ghost">
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="flex items-center gap-2 font-semibold"
              href={"/driver/add-ride"}
            >
              <Plus />{" "}
              <span className="hidden md:inline">Publish the ride</span>
            </Button>
            <AuthBlock />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavbarLogo() {
  return <Logo />;
}

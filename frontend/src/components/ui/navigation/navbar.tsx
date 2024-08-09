"use client";
import { Button } from "@/components/ui/actions/button";
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  DropdownItems,
} from "@/components/ui/actions/dropdown";
import { ThemeControllerSwap } from "@/components/ui/actions/theme-controller";
import { Ampersand, VenetianMask } from "lucide-react";

type NavbarProps = {};

export function Navbar({ }: NavbarProps) {
  return (
    <nav className="w-full fixed">
      <div className="container bg-background">
        <div className="flex h-20 items-center justify-between">
          <NavbarLogo />
          <div className="flex items-center gap-3">
            <ThemeControllerSwap />
            <DropdownMenu>
              <DropdownButton>Actions</DropdownButton>
              <DropdownItems>
                <DropdownItem href="/about">
                  <Ampersand size={18} />
                  About
                </DropdownItem>
                <DropdownItem href="/contact">
                  <VenetianMask />
                  Contact
                </DropdownItem>
              </DropdownItems>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavbarLogo() {
  return (
    <Button href="/" variant="ghost" className="font-bold text-xl">
      MILU
    </Button>
  );
}

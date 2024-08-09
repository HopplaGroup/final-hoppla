"use client";
import { useTheme } from "next-themes";
import Swap from "./swap";
import { Moon, Sun } from "lucide-react";
import { Dropdown } from ".";
import { cn } from "@/lib/utils/cn";

export function ThemeControllerSwap() {
  const { setTheme, theme } = useTheme();

  return (
    <Swap
      className="text-3xl"
      isOn={theme === "light"}
      swapOn={<Sun className="h-[1.5rem] w-[1.5rem]" />}
      swapOff={<Moon className="h-[1.5rem] w-[1.5rem]" />}
      onValueChange={(value) => setTheme(value ? "light" : "dark")}
    />
  );
}

export function ThemeControllerDropdown() {
  const { setTheme, theme } = useTheme();

  return (
    <Dropdown.Menu>
      <Dropdown.Button variant="ghost" size={"default-icon"}>
        <Sun
          className={cn(
            "h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all",
            {
              "-rotate-90 scale-0": theme === "dark",
            }
          )}
        />
        <Moon
          className={cn(
            "absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all",
            {
              "rotate-0 scale-100": theme === "dark",
            }
          )}
        />
        <span className="sr-only">Toggle theme</span>
      </Dropdown.Button>
      <Dropdown.Items>
        <Dropdown.Item onClick={() => setTheme("light")}>Light</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("dark")}>Dark</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("system")}>System</Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Menu>
  );
}

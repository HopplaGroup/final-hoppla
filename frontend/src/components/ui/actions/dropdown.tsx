"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  _internal_ComponentMenuItems,
} from "@headlessui/react";
import { Button, ButtonProps } from "./button";
import React from "react";
import { cn } from "@/lib/utils/cn";

export const DropdownMenu = Menu;

export const DropdownButton = (props: ButtonProps) => (
  <MenuButton
    as={Button}
    {...props}
    className={cn("font-semibold", props.className)}
  />
);

export const DropdownItem = (props: ButtonProps) => (
  <MenuItem
    as={Button}
    {...props}
    variant={props.variant || "ghost"}
    className={cn(
      "flex w-full justify-start gap-2 rounded-lg h-10",
      props.className
    )}
  />
);

export const DropdownItems = ({
  children,
  anchor,
}: {
  children: React.ReactNode;
  anchor?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top end"
    | "top start"
    | "bottom end"
    | "bottom start"
    | "left end"
    | "left start"
    | "right end"
    | "right start";
}) => (
  <MenuItems
    transition
    anchor={anchor || "bottom end"}
    className="w-52 z-[55] border origin-top-right mt-1 rounded-md bg-background p-1 text-sm/6 text-foreground transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
  >
    {children}
  </MenuItems>
);

export const DropdownSeparator = () => (
  <div className="border-t border-foreground/10 my-1" />
);

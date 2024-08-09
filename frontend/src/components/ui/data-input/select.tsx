import { cn } from "@/lib/utils/cn";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Key, useState } from "react";

interface SelectProps<T> {
  items: T[];
  defaultSelected?: T;
  value?: T;
  onChange?: (selected: T) => void;
  className?: string;
  displayValue: (item: T) => string;
  getKey: (item: T) => Key;
  placeholder?: string;
}

export function Select<T>({
  items,
  defaultSelected,
  value,
  onChange,
  displayValue,
  className,
  getKey,
  placeholder = "Select an option",
}: SelectProps<T>) {
  return (
    <div className={cn("min-w-52", className)}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <ListboxButton
              className={cn(
                "outline-foreground/25 relative rounded-lg block w-full border bg-background h-12 pr-12 pl-4 text-left text-sm/6 text-foreground join-item"
              )}
              style={{
                outline: open
                  ? "2px solid hsl(var(--foreground) / 0.25)"
                  : "none",
                outlineOffset: "2px",
              }}
            >
              {value ? displayValue(value) : placeholder}
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-4 size-4 fill-foreground/60"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                "w-[var(--button-width)] z-50 mt-1 rounded-lg border bg-background p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
              )}
            >
              {items.map((item) => (
                <ListboxOption
                  key={getKey(item)}
                  value={item}
                  className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[headlessui-state~='active']:bg-foreground/10"
                >
                  <CheckIcon className="invisible size-4 fill-foreground group-data-[headlessui-state~='selected']:visible" />
                  <div className="text-sm/6 text-foreground">
                    {displayValue(item)}
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </>
        )}
      </Listbox>
    </div>
  );
}

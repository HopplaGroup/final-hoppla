import { cn } from "@/lib/utils/cn";
import {
  Combobox as _Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Key, useState } from "react";

interface AutocompleteProps<T> {
  items: T[];
  defaultSelected?: T;
  onChange?: (selected: T | null) => void;
  className?: string;
  displayValue: (item: T) => string;
  getKey: (item: T) => Key;
  filterItems: (items: T[], query: string) => T[];
  placeholder?: string;
  startContent?: React.ReactNode;
  showMax?: number;
}

export function Autocomplete<T>({
  items,
  defaultSelected,
  onChange,
  displayValue,
  className,
  getKey,
  filterItems,
  placeholder = "Select an option",
  startContent,
  showMax,
}: AutocompleteProps<T>) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<T | null>(defaultSelected || null);
  const filteredItems = (
    query === "" ? items : filterItems(items, query)
  ).slice(0, showMax);
  const handleChange = (value: NoInfer<T> | null) => {
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <_Combobox
      value={selected}
      onChange={handleChange}
      onClose={() => setQuery("")}
    >
      <div className={cn("relative z-50", className)}>
        {startContent && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {startContent}
          </div>
        )}
        <ComboboxInput
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg bg-background h-12 border pr-[4.5rem] text-sm/6 text-foreground placeholder:text-foreground/70",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-foreground/25",
            "join-item",
            startContent ? "pl-10" : "pl-4"
          )}
          displayValue={(item: T | null | undefined) => {
            if (item) return displayValue(item);
            return "";
          }}
          // value={query}

          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-4">
          <ChevronDownIcon className="size-4 fill-foreground/60 group-data-[hover]:fill-foreground" />
        </ComboboxButton>
        {selected && (
          <button
            className="group absolute inset-y-0 right-12"
            onClick={() => {
              setSelected(null);
              setQuery("");
              onChange && onChange(null);
            }}
          >
            <XMarkIcon className="size-4 fill-foreground/60 group-hover:fill-foreground" />
          </button>
        )}
      </div>
      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] mt-1.5 bg-background rounded-lg border p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 z-50 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {filteredItems.map((item) => (
          <ComboboxOption
            key={getKey(item)}
            value={item}
            className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-foreground/10"
          >
            <CheckIcon className="invisible size-4 fill-foreground group-data-[selected]:visible" />
            <div className="text-sm/6 text-foreground">
              {displayValue(item)}
            </div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </_Combobox>
  );
}

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
import { useDebouncedCallback } from "use-debounce";

interface AsyncAutocompleteProps<T> {
  onChange?: (selected: T | null) => void;
  className?: string;
  displayValue: (item: T) => string;
  getKey: (item: T) => Key;
  fetchItems: (query: string) => Promise<T[]>;
  placeholder?: string;
  defaultSelected?: T;
}

export function AsyncAutocomplete<T>({
  onChange,
  displayValue,
  className,
  getKey,
  fetchItems,
  placeholder = "Select an option",
  defaultSelected,
}: AsyncAutocompleteProps<T>) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<T | null>(null);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const debounced = useDebouncedCallback((value) => {
    fetchItems(value).then((items) => {
      setItems(items);
      setLoading(false);
    });
  }, 500);

  const handleChange = (value: NoInfer<T> | null) => {
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <div className={className}>
      <_Combobox
        value={selected}
        onChange={handleChange}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            placeholder={placeholder}
            className={clsx(
              "w-full rounded-lg border bg-background h-12 pr-[4.5rem] pl-4 text-sm/6 text-foreground placeholder:text-foreground",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-foreground/25",
              "join-item"
            )}
            displayValue={(item: T | null | undefined) => {
              if (item) return displayValue(item);
              return "";
            }}
            onChange={(event) => {
              setLoading(true);
              setQuery(event.target.value);
              debounced(event.target.value);
            }}
          />
          <ComboboxButton className="group absolute inset-y-0 right-4">
            <ChevronDownIcon className="size-4 fill-foreground/60 group-data-[hover]:fill-foreground" />
          </ComboboxButton>
          {selected && (
            <button
              className="group absolute inset-y-0 right-12 z-50"
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
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {loading ? (
            <div className="text-sm/6 text-foreground py-1.5 px-3">
              Loading...
            </div>
          ) : (
            items.map((item) => (
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
            ))
          )}
        </ComboboxOptions>
      </_Combobox>
    </div>
  );
}

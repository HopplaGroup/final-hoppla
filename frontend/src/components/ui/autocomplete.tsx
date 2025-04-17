import { cn } from "@/lib/utils/cn";
import React, { useState, useEffect, useRef, Key } from "react";

interface AutocompleteProps<T> {
    items: T[];
    defaultSelected?: T;
    onChange?: (selected: T | null) => void;
    className?: string;
    displayValue: (item: T) => string;
    getKey: (item: T) => Key;
    filterItems: (items: T[], query: string) => T[];
    placeholder?: string;
    startIcon?: React.ReactNode;
    maxItems?: number;
    disabled?: boolean;
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
    startIcon,
    maxItems = 5,
    disabled = false,
}: AutocompleteProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<T | null>(defaultSelected || null);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredItems = (
        query === "" ? items : filterItems(items, query)
    ).slice(0, maxItems);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (item: T) => {
        setSelected(item);
        setQuery("");
        setIsOpen(false);
        onChange && onChange(item);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click from reaching the input
        setSelected(null);
        setQuery("");
        onChange && onChange(null);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    setHighlightedIndex((prev) =>
                        prev < filteredItems.length - 1 ? prev + 1 : 0
                    );
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredItems.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (
                    isOpen &&
                    highlightedIndex >= 0 &&
                    highlightedIndex < filteredItems.length
                ) {
                    handleSelect(filteredItems[highlightedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                break;
            case "Tab":
                setIsOpen(false);
                break;
            default:
                setHighlightedIndex(0);
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                `join-item relative placeholder-gray-900 w-full h-12 px-4 py-2 text-sm bg-white border border-input rounded-lg shadow-sm focus:outline-none ${
                    disabled ? "bg-gray-100  cursor-not-allowed" : ""
                } ${startIcon ? "pl-10" : ""}`,
                className
            )}
        >
            <div className="h-full w-full">
                {startIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
                        {startIcon}
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="text"
                    className="w-3/4 focus:outline-none h-full placeholder-gray-800"
                    // className={cn(
                    //     `join-item placeholder-gray-900 w-full h-12 px-4 py-2 text-sm bg-white border border-input rounded-lg shadow-sm focus:outline-none ${
                    //         disabled ? "bg-gray-100  cursor-not-allowed" : ""
                    //     } ${startIcon ? "pl-10" : ""}`,
                    //     className
                    // )}
                    placeholder={placeholder}
                    value={selected ? displayValue(selected) : query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (selected) setSelected(null);
                        setIsOpen(true);
                    }}
                    // onClick={handleInputClick}
                    onFocus={() => {
                        setHighlightedIndex(0);
                        setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    // readOnly={selected !== null}
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {selected && (
                        <button
                            type="button"
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                            onClick={handleClear}
                            disabled={disabled}
                        >
                            {/* X Mark Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    )}

                    <button
                        type="button"
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            // maybe focus?
                            inputRef.current?.focus();
                            setHighlightedIndex(0);
                            setIsOpen(!isOpen);
                        }}
                        disabled={disabled}
                    >
                        {/* Chevron Down Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-5 w-5 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && filteredItems.length > 0 && (
                <div
                    ref={optionsRef}
                    className="absolute left-0 top-12 w-full z-50 mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    {filteredItems.map((item, index) => (
                        <div
                            key={getKey(item).toString()}
                            onClick={() => handleSelect(item)}
                            className={`${
                                highlightedIndex === index
                                    ? "bg-primary/10 text-primary dark:text-blue-100"
                                    : "text-gray-900 dark:text-gray-100"
                            } cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            <div className="flex items-center">
                                {selected &&
                                    displayValue(selected) ===
                                        displayValue(item) && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary dark:text-blue-400">
                                            {/* Check Icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                <span
                                    className={`block truncate ${
                                        selected &&
                                        displayValue(selected) ===
                                            displayValue(item)
                                            ? "font-medium"
                                            : "font-normal"
                                    }`}
                                >
                                    {displayValue(item)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

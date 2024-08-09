"use client";
import { useMask } from "@react-input/mask";
import { Description, Field, Input as _Input, Label } from "@headlessui/react";
import { cn } from "@/lib/utils/cn";

export function HourInput({
  onChange,
  value,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const inputRef = useMask({
    mask: "(hh):m",
    replacement: {
      // 00 to 23 and m between 00 and 59
      h: /[0-2]/,
    },
  });

  return (
    <_Input
      className={cn(
        "block w-full rounded-lg border bg-background h-12 px-4 text-sm/6 text-foreground placeholder:text-foreground/70",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-foreground/25",
        "join-item"
      )}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      ref={inputRef}
    />
  );
}

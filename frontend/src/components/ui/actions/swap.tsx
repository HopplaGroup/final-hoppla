"use client";

import { cn } from "@/lib/utils/cn";
import { ButtonProps, Button } from "./button";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

type SwapProps = {
  swapOn: React.ReactNode;
  swapOff: React.ReactNode;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
  isOn?: boolean;
} & Omit<ButtonProps, "children" | "onClick" | "defaultValue" | "value">;

export default function Swap({
  defaultValue,
  swapOn,
  swapOff,
  onValueChange,
  isOn,
  ...props
}: SwapProps) {
  const [internalIsActive, setInternalIsActive] = useState(
    defaultValue || false
  );
  const [isMounted, setIsMounted] = useState(false);
  const isRealOn = isOn !== undefined ? isOn : internalIsActive;

  const handleToggle = () => {
    const newValue = !isOn;
    if (isOn === undefined) {
      setInternalIsActive(newValue);
    }
    onValueChange && onValueChange(newValue);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        {...props}
        size={props.size || "default-icon"}
        variant={props.variant || "ghost"}
        className={cn(
          props.className,
          "relative inline-flex items-center justify-center"
        )}
      >
        <LoaderCircle className="animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleToggle}
      {...props}
      size={props.size || "default-icon"}
      variant={props.variant || "ghost"}
      className={cn(
        props.className,
        "relative inline-flex items-center justify-center"
      )}
    >
      <div
        className={cn(`transition-all duration-300`, {
          "scale-0": isRealOn,
          "scale-100": !isRealOn,
        })}
      >
        {swapOff}
      </div>
      <div
        className={cn(`absolute transition-all duration-300`, {
          "scale-0": !isRealOn,
          "scale-100": isRealOn,
        })}
      >
        {swapOn}
      </div>
    </Button>
  );
}

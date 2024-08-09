import { cn } from "@/lib/utils/cn";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

export const NumericInput = React.forwardRef<
  NumericFormatProps,
  {
    disabled?: boolean;
    name?: string;
    value: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    startContent?: React.ReactNode;
  }
>(function NumericInput(
  { value, onChange, disabled, name, onBlur, placeholder, startContent },
  ref
) {
  return (
    <div className="relative">
      {startContent && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {startContent}
        </div>
      )}

      <NumericFormat
        name={name}
        disabled={disabled}
        onBlur={onBlur}
        value={value}
        getInputRef={ref}
        placeholder={placeholder}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        valueIsNumericString
        className={cn(
          "block w-full rounded-lg border bg-background h-12 px-4 text-sm/6 text-foreground placeholder:text-foreground/70",
          "join-item focus:outline-primary",
          startContent && "pl-10"
        )}
      />
    </div>
  );
});

NumericInput.displayName = "NumericInput";

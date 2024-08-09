"use client";
import React from "react";
import {
  PhoneInputRefType,
  PhoneInput as _PhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";

export const PhoneInput = React.forwardRef<
  PhoneInputRefType,
  {
    disabled?: boolean;
    name?: string;
    value: string;
    onChange?: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
  }
>(({ value, onChange, onBlur, placeholder, disabled, name }, ref) => {
  return (
    <_PhoneInput
      name={name}
      inputStyle={{
        fontSize: "0.875rem",
        lineHeight: "1.5rem",
        height: "3rem",
        borderTopRightRadius: "var(--radius)",
        borderBottomRightRadius: "var(--radius)",
        border: "1px solid hsl(var(--border))",
        width: "100%",
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
      inputClassName="input-outline"
      countrySelectorStyleProps={{
        buttonStyle: {
          fontSize: "0.875rem",
          lineHeight: "1.5rem",
          height: "3rem",
          width: "3.4rem",
          borderTopLeftRadius: "var(--radius)",
          borderBottomLeftRadius: "var(--radius)",
          border: "1px solid hsl(var(--border))",
          backgroundColor: "hsl(var(--background))",
        },
      }}
      defaultCountry="ge"
      prefix="+"
      defaultMask="...-..-..-.."
      forceDialCode={true}
      value={value}
      onChange={onChange}
      ref={ref}
      disabled={disabled}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

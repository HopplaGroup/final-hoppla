import { cn } from "@/lib/utils/cn";
import { Checkbox as _Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

type CheckboxProps = {
  className?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
};

export function Checkbox({
  className,
  defaultChecked,
  onChange,
  children,
}: CheckboxProps) {
  const [_checked, _setChecked] = useState(!!defaultChecked);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <_Checkbox
        checked={_checked}
        onChange={(checked) => {
          _setChecked(checked);
          onChange?.(checked);
        }}
        className={cn(
          "group cursor-pointer size-6 rounded-md bg-foreground/10 p-1 data-[checked]:bg-primary"
        )}
      >
        <CheckIcon className="hidden size-4 fill-primary-foreground group-data-[checked]:block" />
      </_Checkbox>
      <div
        className="cursor-pointer select-none"
        onClick={() => {
          _setChecked(!_checked);
          onChange?.(!_checked);
        }}
      >
        {children}
      </div>
    </div>
  );
}

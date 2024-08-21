"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils/cn";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns/format";
import { getDaysInMonth } from "date-fns";
import { Button } from "./actions/button";
import { ka, enUS } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select } from "./data-input/select";
import { languageTag } from "@/paraglide/runtime";
import {
  DateTimePickerTabs,
  DateTimePickerToolbar,
  DigitalClock,
} from "@mui/x-date-pickers";
import {
  DateCalendar,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
// If you are using date-fns v3.x, please import the v3 adapter
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type DatePickerProps = {
  disabled?: boolean;
  name?: string;
  onBlur?: () => void;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  startDate?: Date;
  endDate?: Date;
  isHour?: boolean;
};

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      onChange,
      value,
      startDate = new Date(1902, 4, 5),
      endDate = new Date(2026, 4, 10),
      isHour,
      disabled,
      placeholder = "Pick a date",
      name,
      onBlur,
    },
    ref
  ) => {
    const l = languageTag();
    const [popoverOpen, setPopoverOpen] = useState(false);

    const locale = l === "ka" ? ka : enUS;
    // const Comp = isHour ? DateTimeCale : DateCalendar;
    return (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger ref={ref} name={name} asChild>
          <Button
            onBlur={onBlur}
            disabled={disabled}
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal justify-start",
              !value && "text-muted-foreground"
            )}
            startContent={<CalendarIcon size={18} />}
          >
            {value ? (
              isHour ? (
                format(value, "dd MMM yyyy HH:mm eee", { locale })
              ) : (
                format(value, "dd MMM yyyy eee", { locale })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <LocalizationProvider
            adapterLocale={locale}
            dateAdapter={AdapterDateFns}
          >
            <div className="flex flex-col sm:flex-row gap-5 h-full">
              <DateCalendar
                className="w-full min-w-[300px]"
                views={["year", "month", "day"]}
                minDate={startDate}
                maxDate={endDate}
                value={value}
                onChange={(newValue, selectionState) => {
                  // if (selectionState === "finish") {
                  //   setPopoverOpen(false);
                  // }
                  onChange?.(newValue);
                }}
              />
              {isHour && (
                <DigitalClock
                  className="h-full"
                  value={value}
                  ampm={false}
                  onChange={(v) => {
                    onChange?.(v);
                  }}
                />
              )}
            </div>
          </LocalizationProvider>
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };

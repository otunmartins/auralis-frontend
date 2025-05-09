"use client";

import * as React from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "../icons";

interface DateRangeSelectorProps {
  className?: string;
  initialDateRange?: DateRange;
  onChange?: (dateRange: DateRange | undefined) => void;
}

export function DateRangeSelector({
  className,
  initialDateRange,
  onChange,
}: DateRangeSelectorProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateRange || {
      from: new Date(2025, 3, 12), // April 12, 2025
      to: new Date(2025, 5, 12), // June 12, 2025
    }
  );

  React.useEffect(() => {
    if (onChange && date) {
      onChange(date);
    }
  }, [date, onChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="ghost"
            className={cn(
              "p-3 !text-[#888888] w-full justify-start text-left font-normal bg-white hover:bg-gray-50",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <span>
                  {format(date.from, "dd-MM-yyyy")} to{" "}
                  {format(date.to, "dd-MM-yyyy")}
                </span>
              ) : (
                format(date.from, "dd-MM-yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="bg-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

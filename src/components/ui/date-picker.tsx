import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  className?: string;
  label?: string;
  onChange: (date: string | undefined) => void;
  placeholder?: string;
  value?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  label,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  // Parse YYYY-MM-DD string as local date to avoid timezone issues
  const date = value
    ? (() => {
        try {
          const parts = value.split("-");
          if (parts.length !== 3) {
            return;
          }
          const year = Number.parseInt(parts[0], 10);
          const month = Number.parseInt(parts[1], 10);
          const day = Number.parseInt(parts[2], 10);
          if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
            return;
          }
          const dateObj = new Date(year, month - 1, day);
          // Validate the date is valid
          if (
            dateObj.getFullYear() !== year ||
            dateObj.getMonth() !== month - 1 ||
            dateObj.getDate() !== day
          ) {
            return;
          }
          return dateObj;
        } catch {
          // Ignore invalid date strings.
        }
      })()
    : undefined;

  return (
    <div className={cn(className)}>
      {label ? (
        <label className="mb-1 block font-medium text-sm">{label}</label>
      ) : null}
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            variant={"outline"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            initialFocus
            mode="single"
            onSelect={(selectedDate) => {
              if (selectedDate) {
                // Format as YYYY-MM-DD using local timezone to avoid timezone issues
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(selectedDate.getDate()).padStart(2, "0");
                onChange(`${year}-${month}-${day}`);
              } else {
                onChange(undefined);
              }
              setOpen(false);
            }}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

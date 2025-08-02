"use client";

import { Controller, useFormContext } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

type TFormDateTimePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
};

const FormDateTimePicker = ({
  name,
  label,
  required,
  className,
}: TFormDateTimePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value ? new Date(field.value) : undefined;

        const handleDateSelect = (date: Date | undefined) => {
          if (date) {
            field.onChange(date);
          }
        };

        const handleTimeChange = (
          type: "hour" | "minute" | "ampm",
          val: string
        ) => {
          const currentDate = value || new Date();
          const newDate = new Date(currentDate);

          if (type === "hour") {
            const hour = parseInt(val, 10);
            newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
          } else if (type === "minute") {
            newDate.setMinutes(parseInt(val, 10));
          } else if (type === "ampm") {
            const hours = newDate.getHours();
            if (val === "AM" && hours >= 12) newDate.setHours(hours - 12);
            if (val === "PM" && hours < 12) newDate.setHours(hours + 12);
          }

          field.onChange(newDate);
        };

        return (
          <div className="w-full space-y-2">
            {label && (
              <Label htmlFor={name} className={cn(error && "text-destructive")}>
                {label}
                {required && <span className="text-destructive">{` `}*</span>}
              </Label>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !value && "text-muted-foreground",
                    className
                  )}
                >
                  {value ? (
                    format(value, "MM/dd/yyyy hh:mm aa")
                  ) : (
                    <span>Select date & time</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="sm:flex">
                  <Calendar
                    mode="single"
                    selected={value}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                  <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                    <ScrollArea className="w-64 sm:w-auto">
                      <div className="flex sm:flex-col p-2">
                        {Array.from({ length: 12 }, (_, i) => i + 1)
                          .reverse()
                          .map((hour) => (
                            <Button
                              key={hour}
                              size="icon"
                              variant={
                                value && value.getHours() % 12 === hour % 12
                                  ? "default"
                                  : "ghost"
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() =>
                                handleTimeChange("hour", hour.toString())
                              }
                            >
                              {hour}
                            </Button>
                          ))}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>

                    <ScrollArea className="w-64 sm:w-auto">
                      <div className="flex sm:flex-col p-2">
                        {Array.from({ length: 12 }, (_, i) => i * 5).map(
                          (minute) => (
                            <Button
                              key={minute}
                              size="icon"
                              variant={
                                value && value.getMinutes() === minute
                                  ? "default"
                                  : "ghost"
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() =>
                                handleTimeChange("minute", minute.toString())
                              }
                            >
                              {minute.toString().padStart(2, "0")}
                            </Button>
                          )
                        )}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>

                    <ScrollArea>
                      <div className="flex sm:flex-col p-2">
                        {["AM", "PM"].map((ampm) => (
                          <Button
                            key={ampm}
                            size="icon"
                            variant={
                              value &&
                              ((ampm === "AM" && value.getHours() < 12) ||
                                (ampm === "PM" && value.getHours() >= 12))
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full shrink-0 aspect-square"
                            onClick={() => handleTimeChange("ampm", ampm)}
                          >
                            {ampm}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {error?.message && (
              <p className="text-[0.8rem] text-destructive">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormDateTimePicker;

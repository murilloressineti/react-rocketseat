import React from "react";

import { cn } from "../../lib/utils";

import { Icon, Input } from "./";

import { CalendarBlank, CaretDown } from "../../assets/icons";

type DateInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "leftSection" | "rightSection"
>;

export default function DateInput({
  label = "Data",
  onClick,
  className,
  ...props
}: DateInputProps) {
  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    event.currentTarget.showPicker?.();
    onClick?.(event);
  }

  return (
    <Input
      {...props}
      label={label}
      type="date"
      leftSection={<Icon svg={CalendarBlank} />}
      rightSection={<Icon className="fill-gray-400" svg={CaretDown} />}
      onClick={handleClick}
      className={cn("date-input cursor-pointer", className)}
    />
  );
}

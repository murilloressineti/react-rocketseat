import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

import { Text } from "./";

export const timeSelectVariants = cva(
  "inline-flex items-center justify-center rounded-lg border transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:border-gray-500  disabled:text-text-quinary disabled:hover:bg-gray-600",
  {
    variants: {
      selected: {
        true: "bg-gray-600 border-yellow text-yellow",
        false:
          "bg-gray-600 border-gray-500 text-text-secondary hover:bg-gray-500",
      },
      size: {
        sm: "py-2 px-5",
        md: "py-4 px-6",
        lg: "py-6 px-8",
      },
    },
    defaultVariants: {
      selected: false,
      size: "sm",
    },
  },
);

interface TimeSelect
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof timeSelectVariants> {
  time: string;
  selected?: boolean;
}

export default function TimeSelect({
  selected,
  size,
  time,
  type = "button",
  className,
  ...props
}: TimeSelect) {
  return (
    <button
      type={type}
      className={cn(timeSelectVariants({ selected, size }), className)}
      {...props}
    >
      <Text className="text-inherit">{time}</Text>
    </button>
  );
}

import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

import Text from "./Text";

export const buttonVariants = cva(
  "group inline-flex cursor-pointer items-center justify-center rounded-lg transition-all duration-300 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-yellow/30",
  {
    variants: {
      variant: {
        default: "bg-yellow border-2 border-yellow hover:border-yellow-light",
        none: "",
      },
      size: {
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
}

export default function Button({
  as: Component = "button",
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string") {
          return (
            <Text
              size={"title-sm"}
              weight={"bold"}
              textColor={"senary"}
            >
              {child}
            </Text>
          );
        }

        return child;
      })}
    </Component>
  );
}

import React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import Text from "./Text";

export const buttonVariants = tv({
  base: "group inline-flex cursor-pointer items-center justify-center rounded-lg transition-all duration-300 disabled:cursor-not-allowed gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-light focus-visible:ring-offset-2",
  variants: {
    variant: {
      default: "bg-green-dark hover:bg-green-light disabled:bg-green-dark/50",
      ghost: "bg-transparent",
    },
    size: {
      xs: "p-1",
      sm: "p-3",
      md: "px-5 py-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
  to?: string;
}

export default function Button({
  as: ButtonComponent = "button",
  type = "button",
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonComponent
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string") {
          return (
            <Text
              textColor={variant === "ghost" ? "brand" : "inverted"}
              weight="bold"
              className={
                variant === "ghost"
                  ? "group-hover:text-green-light transition-all duration-300"
                  : undefined
              }
            >
              {child}
            </Text>
          );
        }

        return child;
      })}
    </ButtonComponent>
  );
}

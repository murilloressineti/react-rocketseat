import React from "react";

import { tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
  base: "font-sans",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl leading-normal",
    },
    textColor: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      inverted: "text-text-inverted",
      brand: "text-text-brand",
    },
    weight: {
      regular: "font-normal",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "sm",
    textColor: "primary",
    weight: "regular",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType;
  htmlFor?: string;
}

export default function Text({
  as: Component = "p",
  size,
  textColor,
  weight,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={textVariants({
        size,
        textColor,
        weight,
        className,
      })}
      {...props}
    >
      {children}
    </Component>
  );
}

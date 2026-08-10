import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const textVariants = cva("font-sans", {
  variants: {
    size: {
      sm: "text-sm leading-tight",
      md: "text-base",
      "title-sm": "text-sm leading-tight font-bold",
      "title-md": "text-base font-bold",
      "title-lg": "text-2xl font-bold",
    },
    textColor: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      quaternary: "text-text-quaternary",
      quinary: "text-text-quinary",
      senary: "text-text-senary",
      title: "text-text-yellow",
    },
    weight: {
      regular: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md",
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
      className={cn(textVariants({ size, textColor, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const iconVariants = cva(
  "shrink-0 transition-all duration-300 ease-in-out",
  {
    variants: {
      animate: {
        none: "",
        spin: "animate-spin",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
      size: {
        sm: "size-4",
        md: "size-5 ",
        lg: "size-6",
      },
      fillColor: {
        yellowLight: "fill-yellow-light",
        yellow: "fill-yellow",
        yellowDark: "fill-yellow-dark",
      },
    },
    defaultVariants: {
      animate: "none",
      size: "md",
      fillColor: "yellow",
    },
  },
);

interface IconProps
  extends React.SVGProps<SVGElement>, VariantProps<typeof iconVariants> {
  svg: React.ElementType;
}

export default function Icon({
  svg: SvgComponent,
  animate,
  size,
  fillColor,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent
      className={cn(iconVariants({ animate, size, fillColor }), className)}
      {...props}
    />
  );
}

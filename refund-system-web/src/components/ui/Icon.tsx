import React from "react";

import { tv, type VariantProps } from "tailwind-variants";

export const iconVariants = tv({
  base: "shrink-0 transition-all duration-300 ease-in-out",
  variants: {
    animate: {
      none: "",
      spin: "animate-spin",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
    },
    size: {
      sm: "size-4",
      md: "size-4.5",
      lg: "size-6",
    },
    fillColor: {
      greenDark: "fill-green-dark",
      greenLight: "fill-green-light",
      white: "fill-white",
    },
  },
  defaultVariants: {
    animate: "none",
    size: "md",
    fillColor: "greenDark",
  },
});

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
      className={iconVariants({ animate, size, fillColor, className })}
      {...props}
    />
  );
}

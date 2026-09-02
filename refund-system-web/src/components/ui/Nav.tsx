import React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { NavLink } from "react-router";

import { textVariants } from "./Text";

export const navVariants = tv({
  base: "group inline-flex items-center transition-colors duration-300 cursor-pointer leading-relaxed",
  variants: {
    active: {
      true: "text-text-brand",
      false: "text-text-secondary hover:text-text-brand-hover",
    },
  },
  defaultVariants: {
    active: false,
  },
});

type NavTextProps = Pick<VariantProps<typeof textVariants>, "size" | "weight">;

interface NavProps
  extends
    Omit<React.ComponentProps<typeof NavLink>, "className">,
    NavTextProps {
  className?: string;
}

export default function Nav({
  size,
  weight = "semiBold",
  className,
  children,
  ...props
}: NavProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        textVariants({
          size,
          weight,
          className: navVariants({
            active: isActive,
            className,
          }),
        })
      }
    >
      {children}
    </NavLink>
  );
}

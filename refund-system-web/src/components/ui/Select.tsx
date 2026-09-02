import React from "react";

import { Icon, Text } from "./";

import { inputVariants } from "./Input";

import { CaretDown } from "../../assets/icons";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export default function Select({
  label,
  error,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  const errorId = `${selectId}-error`;
  const hasError = Boolean(error);

  return (
    <div className="group flex flex-col">
      {label && (
        <Text
          as="label"
          htmlFor={selectId}
          size="xs"
          textColor="secondary"
          className={`mb-2 uppercase transition-colors duration-300
            ${
              hasError
                ? "text-feedback-danger font-bold"
                : "group-focus-within:text-green-dark group-focus-within:font-bold"
            }
          `}
        >
          {label}
        </Text>
      )}

      <div className="relative">
        <select
          id={selectId}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={inputVariants({
            variant: hasError ? "error" : "default",
            className: `appearance-none pr-10 ${className ?? ""}`,
          })}
          {...props}
        >
          {children}
        </select>

        <Icon
          svg={CaretDown}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 fill-gray-300"
        />
      </div>

      {error && (
        <Text id={errorId} size="xs" className="mt-1 text-feedback-danger">
          {error}
        </Text>
      )}
    </div>
  );
}

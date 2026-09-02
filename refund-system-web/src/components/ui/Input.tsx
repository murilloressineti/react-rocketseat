import React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import Text from "./Text";

export const inputVariants = tv({
  base: "w-full p-3 bg-transparent border outline-none rounded-lg text-text-primary placeholder:text-text-secondary transition-all duration-300",
  variants: {
    variant: {
      default: "border-gray-300 caret-green-dark focus:border-green-dark",
      error: "border-feedback-danger caret-feedback-danger",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

export default function Input({
  variant,
  label,
  error,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className="group flex flex-col">
      {label && (
        <Text
          as="label"
          htmlFor={inputId}
          size="xs"
          textColor="secondary"
          className={`mb-2 uppercase transition-colors duration-300 
            ${
              hasError
                ? " text-feedback-danger font-bold"
                : "group-focus-within:text-green-dark group-focus-within:font-bold"
            }
            `}
        >
          {label}
        </Text>
      )}

      <div className="relative">
        <input
          id={inputId}
          aria-invalid={hasError} // Indica se o campo de entrada tem um erro
          aria-describedby={hasError ? errorId : undefined} // Associa o campo de entrada à mensagem de erro, se houver
          className={inputVariants({
            variant: hasError ? "error" : variant,
            className,
          })}
          {...props}
        />
      </div>

      {error && (
        <Text id={errorId} size="xs" className="text-feedback-danger mt-1">
          {error}
        </Text>
      )}
    </div>
  );
}

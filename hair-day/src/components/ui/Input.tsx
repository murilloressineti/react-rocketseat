import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

import { Text } from "./";

export const inputVariants = cva(
  "w-full p-3 bg-transparent border outline-none rounded-lg text-text-secondary placeholder:text-gray-400 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-gray-500 caret-yellow-dark focus:border-yellow-dark",
        error: "border-feedback-danger caret-feedback-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

export default function Input({
  variant,
  label,
  error,
  leftSection,
  rightSection,
  type,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Text
          as="label"
          htmlFor={inputId}
          size="title-md"
          weight="bold"
          textColor="secondary"
        >
          {label}
        </Text>
      )}

      <div className="relative">
        {leftSection && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            {leftSection}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          aria-invalid={hasError} // Indica se o campo de entrada tem um erro
          aria-describedby={hasError ? errorId : undefined} // Associa o campo de entrada à mensagem de erro, se houver
          className={cn(
            inputVariants({
              variant: hasError ? "error" : variant,
            }),
            leftSection && "pl-10",
            rightSection && "pr-10",
            className,
          )}
          {...props}
        />

        {rightSection && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            {rightSection}
          </div>
        )}
      </div>

      {error && (
        <Text id={errorId} size="sm" className="text-feedback-danger">
          {error}
        </Text>
      )}
    </div>
  );
}

import React from "react";

import { tv } from "tailwind-variants";

import { Icon, Text } from "./";

import { CloudArrowUp } from "../../assets/icons";

const fileInputVariants = tv({
  base: "flex cursor-pointer items-stretch overflow-hidden rounded-lg border transition-colors duration-300",
  variants: {
    error: {
      true: "border-feedback-danger",
      false: "border-gray-300 hover:border-green-dark group-focus-within:border-green-dark",
    },
  },
});

interface FileInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
  > {
  label?: string;
  error?: string;
}

export default function FileInput({
  label,
  error,
  id,
  className,
  onChange,
  ...props
}: FileInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  const [fileName, setFileName] = React.useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setFileName(file?.name ?? "");

    onChange?.(event);
  }

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

      <label
        htmlFor={inputId}
        className={fileInputVariants({
          error: hasError,
          className,
        })}
      >
        <div className="flex min-w-0 flex-1 items-center p-3">
          <Text
            as={"span"}
            textColor={fileName ? "primary" : "secondary"}
            className="truncate"
          >
            {fileName || "Selecione um arquivo"}
          </Text>
        </div>

        <div className="flex items-center justify-center bg-green-dark p-3 rounded-l-lg">
          <Icon svg={CloudArrowUp} size="lg" className="fill-white" />
        </div>
      </label>

      <input
        id={inputId}
        type="file"
        className="sr-only"
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        onChange={handleChange}
        {...props}
      />

      {error && (
        <Text id={errorId} size="xs" className="mt-1 text-feedback-danger">
          {error}
        </Text>
      )}
    </div>
  );
}

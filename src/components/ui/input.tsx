"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-slate-700">{label}</label>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition",
            "border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
            error && "border-red-400 focus:border-red-500 focus:ring-red-300",
            className
          )}
          {...rest}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

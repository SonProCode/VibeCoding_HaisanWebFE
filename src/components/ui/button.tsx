"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  loading?: boolean;
  leftIcon?: ReactNode;
}

export const Button = ({
  variant = "primary",
  loading,
  leftIcon,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary: "bg-sky-500 text-white hover:bg-sky-600",
    secondary:
      "bg-white text-sky-700 border border-sky-200 hover:bg-sky-50",
    ghost: "bg-transparent text-slate-800 hover:bg-slate-100",
    outline: "border border-slate-300 text-slate-800 hover:bg-slate-50",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      disabled={loading}
      {...rest}
    >
      {loading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </button>
  );
};

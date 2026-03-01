"use client";

import { type ReactNode } from "react";
import { clsx } from "clsx";

export const Badge = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={clsx(
      "inline-flex items-center rounded-full bg-sky-600 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm",
      className
    )}
  >
    {children}
  </span>
);

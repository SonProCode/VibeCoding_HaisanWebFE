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
      "inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700",
      className
    )}
  >
    {children}
  </span>
);

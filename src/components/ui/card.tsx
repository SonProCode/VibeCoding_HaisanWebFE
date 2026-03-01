"use client";

import { type ReactNode } from "react";
import { clsx } from "clsx";

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      "rounded-xl bg-white/90 shadow-sm backdrop-blur-sm border border-slate-100",
      className
    )}
  >
    {children}
  </div>
);

export const CardContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={clsx("p-4", className)}>{children}</div>;

export const CardHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={clsx("border-b border-slate-100 p-4", className)}>
    {children}
  </div>
);

"use client";

import { type ReactNode, useEffect } from "react";
import { I18nProvider } from "@/hooks/useI18n";
import { ToastProvider } from "@/hooks/useToast";
import { useUiStore } from "@/store/uiStore";
import { LoadingOverlay } from "./LoadingOverlay";

export const Providers = ({ children }: { children: ReactNode }) => {
  const isDarkMode = useUiStore((s) => s.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <I18nProvider>
      <ToastProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
          {children}
          <LoadingOverlay />
        </div>
      </ToastProvider>
    </I18nProvider>
  );
};

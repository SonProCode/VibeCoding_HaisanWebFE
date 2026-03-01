"use client";

import { useUiStore } from "@/store/uiStore";

export const LoadingOverlay = () => {
  const isGlobalLoading = useUiStore((s) => s.isGlobalLoading);
  if (!isGlobalLoading) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-lg">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
        <p className="text-sm font-medium text-slate-700">
          Đang xử lý, vui lòng chờ…
        </p>
      </div>
    </div>
  );
};

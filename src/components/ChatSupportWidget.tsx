"use client";

import { useState } from "react";

export const ChatSupportWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-600"
        aria-label="Chat support"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800">
              Hỗ trợ khách hàng
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-600">
            Hotline: 0988.123.456
            <br />
            Zalo: haisanquangninh
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Giờ làm việc: 7h - 21h
          </p>
        </div>
      )}
    </>
  );
};

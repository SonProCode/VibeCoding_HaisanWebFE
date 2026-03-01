"use client";

import { useEffect } from "react";
import Link from "next/link";
import { paths } from "@/routes/paths";
import { useUiStore } from "@/store/uiStore";
import { useCountdown } from "@/hooks/useCountdown";

export const BannerFlashSale = () => {
  const { flashSaleEnd, setFlashSaleEnd } = useUiStore();
  const countdown = useCountdown(flashSaleEnd);

  useEffect(() => {
    if (!flashSaleEnd) {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      setFlashSaleEnd(end.toISOString());
    }
  }, [flashSaleEnd, setFlashSaleEnd]);

  if (!countdown || countdown.isExpired) return null;

  return (
    <Link
      href={paths.products}
      className="block rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white shadow-lg"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">⚡ Flash Sale</h3>
          <p className="text-sm opacity-90">
            Giảm 10% với mã FLASH10 - Còn lại:
          </p>
        </div>
        <div className="flex gap-2">
          <span className="rounded bg-white/20 px-2 py-1 font-mono text-sm">
            {String(countdown.hours).padStart(2, "0")}h
          </span>
          <span className="rounded bg-white/20 px-2 py-1 font-mono text-sm">
            {String(countdown.minutes).padStart(2, "0")}m
          </span>
          <span className="rounded bg-white/20 px-2 py-1 font-mono text-sm">
            {String(countdown.seconds).padStart(2, "0")}s
          </span>
        </div>
      </div>
    </Link>
  );
};

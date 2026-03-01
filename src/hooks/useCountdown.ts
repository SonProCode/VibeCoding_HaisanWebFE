"use client";

import { useEffect, useState } from "react";

export const useCountdown = (endIso?: string) => {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!endIso) {
      setRemaining(null);
      return;
    }
    const end = new Date(endIso).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = end - now;
      setRemaining(diff > 0 ? diff : 0);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endIso]);

  if (remaining == null) return null;

  const seconds = Math.floor(remaining / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return { hours: h, minutes: m, seconds: s, isExpired: remaining <= 0 };
};

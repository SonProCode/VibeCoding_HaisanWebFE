"use client";

import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/orderStore";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from "@/utils/orderStatus";

const TrackingPage = () => {
  const [code, setCode] = useState("");
  const { currentOrder, trackOrder, loading } = useOrderStore();
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await trackOrder(code.trim());
    if (!res) {
      setError("Không tìm thấy đơn hàng.");
    }
  };

  return (
    <MainLayout>
      <section className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 px-6 py-6 text-white shadow-lg md:px-8 md:py-7">
          <h1 className="text-2xl font-bold md:text-3xl">
            Tra cứu trạng thái đơn hàng
          </h1>
          <p className="mt-2 text-sm text-sky-50 md:text-base">
            Nhập mã vận đơn được gửi qua SMS hoặc Zalo để kiểm tra hành trình
            đơn hàng của bạn.
          </p>
          <form
            onSubmit={handleSearch}
            className="mt-4 flex flex-col gap-3 md:flex-row"
          >
            <div className="flex-1">
              <Input
                placeholder="Ví dụ: VN123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-white/95"
              />
            </div>
            <Button
              type="submit"
              loading={loading}
              className="h-11 px-6 text-sm font-semibold"
            >
              Xem trạng thái
            </Button>
          </form>
          {error && (
            <p className="mt-2 text-sm font-medium text-amber-100">{error}</p>
          )}
        </div>

        {currentOrder && (
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Thông tin đơn hàng
                </div>
                <div className="mt-1 text-base font-semibold text-slate-900 md:text-lg">
                  Đơn #{currentOrder.id}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Mã vận đơn:{" "}
                  <span className="font-mono text-slate-800">
                    {currentOrder.trackingCode}
                  </span>
                </div>
              </div>
              <span
                className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${ORDER_STATUS_COLORS[currentOrder.status]}`}
              >
                {ORDER_STATUS_LABELS[currentOrder.status]}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-sm font-semibold text-slate-800">
                Hành trình đơn hàng
              </div>
              <ol className="mt-3 space-y-3 text-sm text-slate-700">
                {currentOrder.timeline.map((t, idx) => {
                  const isLast = idx === currentOrder.timeline.length - 1;
                  return (
                    <li key={t.timestamp} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="mt-1 h-3 w-3 rounded-full bg-sky-500" />
                        {!isLast && (
                          <div className="h-10 w-px bg-slate-200" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {ORDER_STATUS_LABELS[t.status]}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(t.timestamp).toLocaleString("vi-VN")}
                        </div>
                        {t.note && (
                          <div className="mt-1 text-xs text-slate-600">
                            {t.note}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default TrackingPage;

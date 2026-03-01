"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";
import { useOrderStore } from "@/store/orderStore";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "@/utils/orderStatus";

const UserDashboardPage = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(paths.login);
      return;
    }
    fetchOrders();
  }, [isAuthenticated, fetchOrders, router]);

  if (!isAuthenticated) return null;

  return (
    <MainLayout>
      <div className="grid gap-6 md:grid-cols-[1.2fr,1.8fr]">
        <section className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            Thông tin cá nhân
          </h2>
          <div className="text-xs text-slate-600">
            <div>Họ tên: {user?.name}</div>
            <div>Email: {user?.email}</div>
            <div>SĐT: {user?.phone}</div>
            <div>Vai trò: {user?.role === "admin" ? "Admin" : "Khách hàng"}</div>
          </div>
        </section>

        <section className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            Lịch sử đặt hàng
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
              >
                <div>
                  <div className="font-mono text-[11px]">#{o.id}</div>
                  <div className="text-[11px]">
                    {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      ORDER_STATUS_COLORS[o.status]
                    }`}
                  >
                    {ORDER_STATUS_LABELS[o.status]}
                  </span>
                  <div className="mt-1 text-right font-semibold">
                    {o.total.toLocaleString("vi-VN")}₫
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-xs text-slate-500">
                Bạn chưa có đơn hàng nào.
              </p>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default UserDashboardPage;

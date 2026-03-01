"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";
import { useOrderStore } from "@/store/orderStore";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "@/utils/orderStatus";
import { formatCurrency } from "@/utils/formatCurrency";
import { Skeleton } from "@/components/ui/skeleton";

const AdminOrdersPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { orders, loading, fetchOrders } = useOrderStore();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace(paths.login);
      return;
    }
    fetchOrders();
  }, [isAuthenticated, isAdmin, fetchOrders, router]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <AdminLayout>
      <h2 className="mb-4 text-base font-semibold text-slate-800">
        Quản lý đơn hàng
      </h2>
      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="p-3 text-left">Mã đơn</th>
                <th className="p-3 text-left">Mã vận đơn</th>
                <th className="p-3 text-right">Tổng tiền</th>
                <th className="p-3 text-center">Trạng thái</th>
                <th className="p-3 text-left">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-slate-100">
                  <td className="p-3 font-mono text-xs">{o.id}</td>
                  <td className="p-3 font-mono text-xs">{o.trackingCode}</td>
                  <td className="p-3 text-right">
                    {formatCurrency(o.total)}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        ORDER_STATUS_COLORS[o.status]
                      }`}
                    >
                      {ORDER_STATUS_LABELS[o.status]}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-slate-600">
                    {new Date(o.createdAt).toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-xs text-slate-500">
        Mock: Chỉ xem danh sách. Cập nhật trạng thái cần kết nối backend.
      </p>
    </AdminLayout>
  );
};

export default AdminOrdersPage;

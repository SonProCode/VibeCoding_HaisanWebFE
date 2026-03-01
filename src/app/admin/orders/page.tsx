"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminOrdersPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { orders, loading, fetchOrders } = useOrderStore();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace(paths.login);
      return;
    }
    fetchOrders();
  }, [isAuthenticated, isAdmin, fetchOrders, router]);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) => {
      return (
        o.id.toLowerCase().includes(q) ||
        o.trackingCode.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q)
      );
    });
  }, [orders, search]);

  const selectedOrder = useMemo(
    () => filteredOrders.find((o) => o.id === selectedId),
    [filteredOrders, selectedId]
  );

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <AdminLayout>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Quản lý đơn hàng
        </h2>
        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            placeholder="Tìm theo mã đơn, mã vận đơn, SĐT, địa chỉ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="grid gap-4 md:grid-cols-[3fr,2fr]">
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="p-3 text-left">Mã đơn</th>
                  <th className="p-3 text-left">Mã vận đơn</th>
                  <th className="p-3 text-right">Tổng tiền</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3 text-left">Ngày tạo</th>
                  <th className="p-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100">
                    <td className="p-3 font-mono text-[11px] md:text-xs">
                      {o.id}
                    </td>
                    <td className="p-3 font-mono text-[11px] md:text-xs">
                      {o.trackingCode}
                    </td>
                    <td className="p-3 text-right">
                      {formatCurrency(o.total)}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] md:text-xs ${
                          ORDER_STATUS_COLORS[o.status]
                        }`}
                      >
                        {ORDER_STATUS_LABELS[o.status]}
                      </span>
                    </td>
                    <td className="p-3 text-[11px] text-slate-600 md:text-xs">
                      {new Date(o.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="p-3 text-center">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-7 px-3 text-[11px]"
                        onClick={() => setSelectedId(o.id)}
                      >
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      className="p-3 text-center text-xs text-slate-500"
                      colSpan={6}
                    >
                      Không tìm thấy đơn hàng phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedOrder && (
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Đơn hàng
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    #{selectedOrder.id}
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Mã vận đơn:{" "}
                    <span className="font-mono text-slate-800">
                      {selectedOrder.trackingCode}
                    </span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    ORDER_STATUS_COLORS[selectedOrder.status]
                  }`}
                >
                  {ORDER_STATUS_LABELS[selectedOrder.status]}
                </span>
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-700">
                <div className="font-semibold text-slate-800">
                  Thông tin giao hàng
                </div>
                <p className="mt-1">
                  SĐT: <span className="font-medium">{selectedOrder.phone}</span>
                </p>
                <p className="mt-1">
                  Địa chỉ:{" "}
                  <span className="font-medium">{selectedOrder.address}</span>
                </p>
                {selectedOrder.note && (
                  <p className="mt-1">
                    Ghi chú:{" "}
                    <span className="font-medium">{selectedOrder.note}</span>
                  </p>
                )}
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-700">
                <div className="mb-1 font-semibold text-slate-800">
                  Sản phẩm đã mua
                </div>
                <ul className="space-y-1">
                  {selectedOrder.items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-sm">
                  <span className="font-semibold text-slate-800">Tổng cộng</span>
                  <span className="font-bold text-sky-700">
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <p className="mt-2 text-xs text-slate-500">
        Mock: Chỉ xem danh sách. Cập nhật trạng thái cần kết nối backend.
      </p>
    </AdminLayout>
  );
};

export default AdminOrdersPage;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";
import { useOrderStore } from "@/store/orderStore";
import { useProductStore } from "@/store/productStore";
import usersData from "@/mocks/users.json";
import type { User } from "@/types/user";
import { formatCurrency } from "@/utils/formatCurrency";

const users = usersData as User[];

const AdminStatsPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { orders, fetchOrders } = useOrderStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace(paths.login);
      return;
    }
    fetchOrders();
    fetchProducts();
  }, [isAuthenticated, isAdmin, fetchOrders, fetchProducts, router]);

  if (!isAuthenticated || !isAdmin) return null;

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const orderCount = orders.length;
  const customerCount = users.length;
  const avgOrderValue = orderCount ? totalRevenue / orderCount : 0;

  const monthlyMock = [65, 80, 45, 90, 70, 85];

  return (
    <AdminLayout>
      <div className="mb-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 px-6 py-5 text-white shadow-md">
        <h2 className="text-lg font-semibold md:text-xl">
          Tổng quan kinh doanh
        </h2>
        <p className="mt-1 text-xs md:text-sm text-sky-100">
          Theo dõi nhanh doanh thu, số đơn và khách hàng để nắm bắt hiệu quả bán
          hàng.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-sky-100">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Tổng doanh thu
          </div>
          <div className="mt-2 text-xl font-bold text-sky-700 md:text-2xl">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Bao gồm tất cả đơn hàng đã tạo.
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Số đơn hàng
          </div>
          <div className="mt-2 text-xl font-bold text-emerald-700 md:text-2xl">
            {orderCount}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Bao gồm cả đơn đang xử lý và đã giao.
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-amber-100">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Khách hàng & giá trị đơn
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-xl font-bold text-amber-700 md:text-2xl">
              {customerCount}
            </span>
            <span className="text-xs text-slate-500">
              Khách • Trung bình{" "}
              <span className="font-semibold text-slate-700">
                {formatCurrency(avgOrderValue || 0)}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[2fr,1fr]">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">
            Doanh thu theo tháng (mock)
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Biểu đồ cột thể hiện xu hướng doanh thu 6 tháng gần nhất.
          </p>
          <div className="mt-4 flex h-40 items-end gap-2 rounded-lg bg-slate-50 px-3 pb-3 pt-2">
            {monthlyMock.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="flex-1 w-full rounded-t-lg bg-gradient-to-t from-sky-500 to-sky-300 shadow-sm"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-slate-500">T{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">
            Tóm tắt nhanh
          </h3>
          <ul className="space-y-1 text-xs text-slate-600">
            <li>
              • Doanh thu trung bình / đơn:{" "}
              <span className="font-semibold text-slate-800">
                {formatCurrency(avgOrderValue || 0)}
              </span>
            </li>
            <li>• Tổng số sản phẩm đang bán: {products.length}</li>
            <li>• Số khách hàng đã đăng ký: {customerCount}</li>
          </ul>
          <p className="mt-2 text-[11px] text-slate-400">
            Lưu ý: Các con số trên chỉ là mock từ dữ liệu frontend. Khi kết
            nối backend, phần này sẽ hiển thị số liệu thực tế theo thời gian
            thực.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStatsPage;

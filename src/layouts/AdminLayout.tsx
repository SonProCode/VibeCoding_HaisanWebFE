"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { paths } from "@/routes/paths";

export const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen bg-slate-50">
    <aside className="hidden w-60 border-r border-slate-200 bg-white/90 p-4 md:block">
      <h2 className="text-sm font-semibold text-slate-800">Admin Dashboard</h2>
      <nav className="mt-4 space-y-2 text-sm">
        <Link
          href={paths.adminStats}
          className="block text-slate-700 hover:text-sky-600"
        >
          Thống kê
        </Link>
        <Link
          href={paths.adminOrders}
          className="block text-slate-700 hover:text-sky-600"
        >
          Đơn hàng
        </Link>
        <Link
          href={paths.adminProducts}
          className="block text-slate-700 hover:text-sky-600"
        >
          Sản phẩm
        </Link>
        <Link
          href={paths.adminUsers}
          className="block text-slate-700 hover:text-sky-600"
        >
          Người dùng
        </Link>
      </nav>
    </aside>
    <main className="flex-1 px-4 py-4 md:px-8 md:py-6">
      <h1 className="mb-4 text-lg font-semibold text-slate-800">
        Quản trị hệ thống
      </h1>
      {children}
    </main>
  </div>
);

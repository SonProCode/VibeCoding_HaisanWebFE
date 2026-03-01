"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";

const AdminIndexPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace(paths.login);
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <AdminLayout>
      <p className="text-sm text-slate-600">
        Chọn mục bên trái để quản lý sản phẩm, đơn hàng, người dùng và thống
        kê doanh thu.
      </p>
    </AdminLayout>
  );
};

export default AdminIndexPage;

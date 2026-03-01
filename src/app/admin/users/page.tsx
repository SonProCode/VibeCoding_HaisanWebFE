"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";
import usersData from "@/mocks/users.json";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";

const users = usersData as User[];

const AdminUsersPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace(paths.login);
      return;
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <AdminLayout>
      <h2 className="mb-4 text-base font-semibold text-slate-800">
        Quản lý người dùng
      </h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="p-3 text-left">Tên</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">SĐT</th>
              <th className="p-3 text-center">Vai trò</th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-slate-100">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone}</td>
                <td className="p-3 text-center">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      u.role === "admin"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {u.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      u.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.isActive ? "Hoạt động" : "Khoá"}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-7 px-3 text-xs"
                      onClick={() =>
                        showToast("Tính năng sửa người dùng sẽ được bổ sung.", "info")
                      }
                    >
                      Sửa
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-7 px-3 text-xs text-red-600 hover:bg-red-50"
                      onClick={() =>
                        showToast("Tính năng khoá tài khoản sẽ được bổ sung.", "info")
                      }
                    >
                      Khoá
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Mock: Chỉ xem danh sách. Khoá/chỉnh sửa tài khoản cần kết nối backend.
      </p>
    </AdminLayout>
  );
};

export default AdminUsersPage;

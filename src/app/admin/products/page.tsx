"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";
import { useProductStore } from "@/store/productStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";

const AdminProductsPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { products, loading, fetchProducts } = useProductStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace(paths.login);
      return;
    }
    fetchProducts();
  }, [isAuthenticated, isAdmin, fetchProducts, router]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <AdminLayout>
      <h2 className="mb-4 text-base font-semibold text-slate-800">
        Quản lý sản phẩm
      </h2>
      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="p-3 text-left">Tên</th>
                <th className="p-3 text-left">Loại</th>
                <th className="p-3 text-right">Giá</th>
                <th className="p-3 text-right">Tồn kho</th>
                <th className="p-3 text-center">Trạng thái</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 text-right">
                    {formatCurrency(p.salePrice ?? p.price)}
                  </td>
                  <td className="p-3 text-right">{p.stock}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        p.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.stock > 0 ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-7 px-3 text-xs"
                        onClick={() =>
                          showToast("Tính năng sửa sản phẩm sẽ được bổ sung.", "info")
                        }
                      >
                        Sửa
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-7 px-3 text-xs text-red-600 hover:bg-red-50"
                        onClick={() =>
                          showToast("Tính năng xoá sản phẩm sẽ được bổ sung.", "info")
                        }
                      >
                        Xoá
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-xs text-slate-500">
        Mock: Chỉ xem danh sách. Thêm/sửa/xoá cần kết nối backend.
      </p>
    </AdminLayout>
  );
};

export default AdminProductsPage;

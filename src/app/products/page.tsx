"use client";

import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT_CATEGORIES } from "@/constants/categories";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsPage = () => {
  const { products, loading, fetchProducts, filter, setFilter } =
    useProductStore();
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    fetchProducts();
  }, [filter, fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const displayed = products.slice(start, start + pageSize);

  return (
    <MainLayout>
      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Hải sản Quảng Ninh
            </h1>
            <p className="text-xs text-slate-500">
              Lọc theo loại hải sản, giá, sắp xếp theo bán chạy…
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Tìm theo tên sản phẩm…"
              className="w-52"
              value={filter.search ?? ""}
              onChange={(e) => setFilter({ search: e.target.value })}
            />
            <select
              className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs"
              value={filter.category ?? ""}
              onChange={(e) =>
                setFilter({ category: e.target.value || undefined })
              }
            >
              <option value="">Tất cả loại</option>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.labelVi}
                </option>
              ))}
            </select>
            <select
              className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs"
              value={filter.sort ?? ""}
              onChange={(e) =>
                setFilter({
                  sort: (e.target.value || undefined) as
                    | "price_asc"
                    | "price_desc"
                    | "best_seller"
                    | undefined,
                })
              }
            >
              <option value="">Mặc định</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="best_seller">Bán chạy</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {displayed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  const active = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      className={`h-7 w-7 rounded-full text-xs font-medium ${
                        active
                          ? "bg-sky-500 text-white"
                          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                      }`}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default ProductsPage;

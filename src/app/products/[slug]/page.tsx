"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { productApi } from "@/api/productApi";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media";

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) ?? "";
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!slug) return;
    const run = async () => {
      try {
        setLoading(true);
        const res = await productApi.getBySlug(slug);
        setProduct(res.data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <p className="text-sm text-slate-600">Không tìm thấy sản phẩm.</p>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, qty);
    showToast("Đã thêm vào giỏ hàng", "success");
  };

  return (
    <MainLayout>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <img
            src={product.thumbnailUrl || DEFAULT_PRODUCT_IMAGE}
            alt={product.name}
            onError={(e) => {
              if (e.currentTarget.src !== DEFAULT_PRODUCT_IMAGE) {
                e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
              }
            }}
            className="h-64 w-full rounded-2xl object-cover"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.galleryUrls.map((url) => (
              <img
                key={url}
                src={url || DEFAULT_PRODUCT_IMAGE}
                alt={product.name}
                onError={(e) => {
                  if (e.currentTarget.src !== DEFAULT_PRODUCT_IMAGE) {
                    e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                  }
                }}
                className="h-16 w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-lg font-semibold text-slate-800">
            {product.name}
          </h1>
          <p className="text-xs text-slate-500">
            Nguồn gốc: {product.origin}
          </p>
          <p className="text-sm text-slate-700">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-sky-700">
              {formatCurrency(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-600">Số lượng:</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
              className="h-8 w-16 rounded-lg border border-slate-200 px-2 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAddToCart}>Thêm vào giỏ</Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/cart")}
            >
              Xem giỏ hàng
            </Button>
          </div>

          <div className="text-xs text-slate-500">
            ⭐ {product.rating.toFixed(1)} ({product.ratingCount} đánh giá)
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;

"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/utils/formatCurrency";
import { paths } from "@/routes/paths";
import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useUiStore } from "@/store/uiStore";
import { useToast } from "@/hooks/useToast";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useUiStore();
  const { showToast } = useToast();
  const inWishlist = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addItem(product, 1);
    showToast("Đã thêm vào giỏ hàng", "success");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    showToast(
      inWishlist ? "Đã xoá khỏi wishlist" : "Đã thêm vào wishlist",
      "info"
    );
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-40 w-full overflow-hidden">
        <Link href={paths.productDetail(product.slug)}>
          <img
            src={product.thumbnailUrl || DEFAULT_PRODUCT_IMAGE}
            alt={product.name}
            onError={(e) => {
              if (e.currentTarget.src !== DEFAULT_PRODUCT_IMAGE) {
                e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
              }
            }}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </Link>
        <button
          type="button"
          onClick={handleToggleWishlist}
          className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-xs shadow"
        >
          {inWishlist ? "❤️" : "🤍"}
        </button>
        {product.isOnSale && (
          <Badge className="absolute left-2 top-2 bg-red-500/90 text-white">
            Khuyến mãi
          </Badge>
        )}
        {product.isBestSeller && (
          <Badge className="absolute left-2 bottom-2 bg-amber-500/90 text-white">
            Bán chạy
          </Badge>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <Link
            href={paths.productDetail(product.slug)}
            className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-sky-600"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-slate-500">{product.origin}</p>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-sky-700">
                {formatCurrency(product.salePrice ?? product.price)}
              </span>
              {product.salePrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              ⭐ {product.rating.toFixed(1)} ({product.ratingCount})
            </div>
          </div>
          <Button variant="primary" className="text-xs" onClick={handleAddToCart}>
            Thêm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

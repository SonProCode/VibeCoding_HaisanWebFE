"use client";

import { useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { BannerFlashSale } from "@/components/BannerFlashSale";
import { ReviewSection } from "@/components/ReviewSection";
import { ChatSupportWidget } from "@/components/ChatSupportWidget";
import { useProductStore } from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <MainLayout>
      <div className="space-y-10">
        <HeroSlider />
        <BannerFlashSale />
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Hải sản bán chạy
            </h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        <ReviewSection />
      </div>
      <ChatSupportWidget />
    </MainLayout>
  );
};

export default HomePage;

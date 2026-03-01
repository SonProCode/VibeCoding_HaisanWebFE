import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/common";
import productsData from "@/mocks/products.json";

const products = productsData as Product[];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface ProductFilter {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "best_seller";
}

export const productApi = {
  async list(filter: ProductFilter = {}): Promise<ApiResponse<Product[]>> {
    await delay(400);

    let result = [...products];

    if (filter.category) {
      result = result.filter((p) => p.category === filter.category);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filter.minPrice != null) {
      result = result.filter((p) => (p.salePrice ?? p.price) >= filter.minPrice!);
    }
    if (filter.maxPrice != null) {
      result = result.filter((p) => (p.salePrice ?? p.price) <= filter.maxPrice!);
    }
    if (filter.sort === "price_asc") {
      result = [...result].sort(
        (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
      );
    } else if (filter.sort === "price_desc") {
      result = [...result].sort(
        (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
      );
    } else if (filter.sort === "best_seller") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return { data: result };
  },

  async getBySlug(slug: string): Promise<ApiResponse<Product>> {
    await delay(300);
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      throw new Error("Product not found");
    }
    return { data: product };
  },
};

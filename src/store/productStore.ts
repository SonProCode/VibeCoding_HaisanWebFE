import { create } from "zustand";
import type { Product } from "@/types/product";
import { productApi, type ProductFilter } from "@/api/productApi";

interface ProductState {
  products: Product[];
  loading: boolean;
  error?: string;
  filter: ProductFilter;
  setFilter: (filter: Partial<ProductFilter>) => void;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: undefined,
  filter: {},
  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),
  fetchProducts: async () => {
    set({ loading: true, error: undefined });
    try {
      const { filter } = get();
      const res = await productApi.list(filter);
      set({ products: res.data, loading: false });
    } catch (e) {
      set({ loading: false, error: (e as Error).message });
    }
  },
}));

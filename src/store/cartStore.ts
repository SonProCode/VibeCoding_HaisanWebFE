import { create } from "zustand";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode?: string;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setCouponCode: (code?: string) => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  couponCode: undefined,
  addItem: (product, quantity = 1) =>
    set((state) => {
      const idx = state.items.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const updated = [...state.items];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + quantity,
        };
        return { items: updated };
      }
      return { items: [...state.items, { product, quantity }] };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),
  clear: () => set({ items: [], couponCode: undefined }),
  setCouponCode: (code) => set({ couponCode: code }),
  total: () => {
    const { items, couponCode } = get();
    const sum = items.reduce((acc, i) => {
      const price = i.product.salePrice ?? i.product.price;
      return acc + price * i.quantity;
    }, 0);
    if (couponCode === "FLASH10") {
      return sum * 0.9;
    }
    return sum;
  },
}));

import { create } from "zustand";
import type { Order } from "@/types/order";
import { orderApi } from "@/api/orderApi";

interface OrderState {
  orders: Order[];
  loading: boolean;
  currentOrder: Order | undefined;
  fetchOrders: () => Promise<void>;
  trackOrder: (trackingCode: string) => Promise<Order | null>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  loading: false,
  currentOrder: undefined,
  fetchOrders: async () => {
    set({ loading: true });
    try {
      const res = await orderApi.list();
      set({ orders: res.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  trackOrder: async (trackingCode) => {
    set({ loading: true, currentOrder: undefined });
    try {
      const res = await orderApi.tracking(trackingCode);
      set({ loading: false, currentOrder: res.data ?? undefined });
      return res.data;
    } catch {
      set({ loading: false });
      return null;
    }
  },
}));

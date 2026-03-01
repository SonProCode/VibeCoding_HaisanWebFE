import type { Order, OrderStatus } from "@/types/order";
import type { ApiResponse } from "@/types/common";
import ordersData from "@/mocks/orders.json";

const orders = ordersData as Order[];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface CreateOrderPayload {
  userId: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  address: string;
  phone: string;
  note?: string;
  paymentMethod: "cod" | "bank_transfer";
}

export const orderApi = {
  async create(payload: CreateOrderPayload): Promise<ApiResponse<Order>> {
    await delay(500);
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...payload,
      id: `ORD-${Date.now()}`,
      trackingCode: `VN${Math.floor(100000 + Math.random() * 899999)}`,
      status: "pending",
      createdAt: now,
      updatedAt: now,
      timeline: [
        { status: "pending", timestamp: now, note: "Đơn hàng vừa được tạo" },
      ],
    };
    orders.push(newOrder);
    return { data: newOrder };
  },

  async tracking(trackingCode: string): Promise<ApiResponse<Order | null>> {
    await delay(300);
    const order = orders.find((o) => o.trackingCode === trackingCode);
    return { data: order ?? null };
  },

  async list(): Promise<ApiResponse<Order[]>> {
    await delay(300);
    return { data: [...orders] };
  },

  async updateStatus(
    id: string,
    status: OrderStatus
  ): Promise<ApiResponse<Order>> {
    await delay(300);
    const order = orders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    const now = new Date().toISOString();
    order.status = status;
    order.updatedAt = now;
    order.timeline.push({ status, timestamp: now });
    return { data: order };
  },
};

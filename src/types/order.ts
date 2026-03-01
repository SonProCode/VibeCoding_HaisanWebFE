export type OrderStatus =
  | "pending"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  trackingCode: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  address: string;
  phone: string;
  note?: string;
  paymentMethod: "cod" | "bank_transfer";
  timeline: Array<{
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }>;
}

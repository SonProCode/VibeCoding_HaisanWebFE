import { useCartStore } from "@/store/cartStore";

export const useCart = () => {
  const {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    setCouponCode,
    total,
  } = useCartStore();
  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    setCouponCode,
    total: total(),
  };
};

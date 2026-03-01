"use client";

import { MainLayout } from "@/layouts/MainLayout";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    total,
    setCouponCode,
  } = useCart();
  const router = useRouter();

  const handleApplyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const code = (form.elements.namedItem("coupon") as HTMLInputElement).value
      .trim();
    setCouponCode(code || undefined);
  };

  return (
    <MainLayout>
      <h1 className="mb-4 text-lg font-semibold text-slate-800">Giỏ hàng</h1>

      {items.length === 0 ? (
        <p className="text-sm text-slate-600">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
              >
                <img
                  src={item.product.thumbnailUrl}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">
                    {item.product.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatCurrency(
                      item.product.salePrice ?? item.product.price
                    )}{" "}
                    / phần
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span>Số lượng:</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.product.id,
                          Number(e.target.value) || 1
                        )
                      }
                      className="h-7 w-16 rounded-lg border border-slate-200 px-2"
                    />
                    <button
                      className="ml-2 text-xs text-red-500 hover:underline"
                      onClick={() => removeItem(item.product.id)}
                    >
                      Xoá
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {formatCurrency(
                    (item.product.salePrice ?? item.product.price) *
                      item.quantity
                  )}
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              Tổng tiền
            </h2>
            <form onSubmit={handleApplyCoupon} className="space-y-2 text-xs">
              <label className="text-slate-600">Mã giảm giá</label>
              <div className="flex gap-2">
                <input
                  name="coupon"
                  placeholder="Nhập mã (ví dụ: FLASH10)"
                  className="flex-1 rounded-lg border border-slate-200 px-2 py-1"
                />
                <Button type="submit" variant="outline" className="text-xs">
                  Áp dụng
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Tạm tính:</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(total)}
              </span>
            </div>
            <Button
              className="w-full"
              onClick={() => router.push(paths.checkout)}
            >
              Thanh toán
            </Button>
          </aside>
        </div>
      )}
    </MainLayout>
  );
};

export default CartPage;

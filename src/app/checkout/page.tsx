"use client";

import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderApi } from "@/api/orderApi";

const CheckoutSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Vui lòng nhập địa chỉ giao hàng"),
  note: z.string().optional(),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
});

type CheckoutFormValues = z.infer<typeof CheckoutSchema>;

const CheckoutPage = () => {
  const { items, total, clear } = useCart();
  const [result, setResult] = useState<{
    orderId: string;
    trackingCode: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) return;
    const orderPayload = {
      userId: "guest",
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.salePrice ?? i.product.price,
        quantity: i.quantity,
      })),
      total,
      address: values.address,
      phone: values.phone,
      note: values.note,
      paymentMethod: values.paymentMethod,
    };

    const res = await orderApi.create(orderPayload);
    clear();
    setResult({
      orderId: res.data.id,
      trackingCode: res.data.trackingCode,
    });
  };

  return (
    <MainLayout>
      <h1 className="mb-4 text-lg font-semibold text-slate-800">
        Thanh toán
      </h1>

      {result ? (
        <div className="max-w-md rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            Đặt hàng thành công
          </h2>
          <p className="mt-2 text-xs text-slate-600">
            Mã đơn hàng:{" "}
            <span className="font-mono font-semibold">{result.orderId}</span>
            <br />
            Mã vận đơn:{" "}
            <span className="font-mono font-semibold">
              {result.trackingCode}
            </span>
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <form
            className="space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Họ tên"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="Số điện thoại"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <Input
              label="Địa chỉ giao hàng"
              {...register("address")}
              error={errors.address?.message}
            />
            <Input label="Ghi chú" {...register("note")} />

            <div className="space-y-1 text-xs">
              <div className="font-medium text-slate-700">
                Phương thức thanh toán
              </div>
              <label className="flex items-center gap-2">
                <input type="radio" value="cod" {...register("paymentMethod")} />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="bank_transfer"
                  {...register("paymentMethod")}
                />
                <span>Chuyển khoản ngân hàng</span>
              </label>
            </div>

            <Button type="submit" loading={isSubmitting}>
              Xác nhận đặt hàng
            </Button>
          </form>

          <aside className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              Đơn hàng
            </h2>
            <ul className="space-y-1 text-xs text-slate-600">
              {items.map((i) => (
                <li key={i.product.id} className="flex justify-between">
                  <span>
                    {i.product.name} × {i.quantity}
                  </span>
                  <span>
                    {formatCurrency(
                      (i.product.salePrice ?? i.product.price) * i.quantity
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-sm">
              <span className="text-slate-700">Tổng thanh toán</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(total)}
              </span>
            </div>
          </aside>
        </div>
      )}
    </MainLayout>
  );
};

export default CheckoutPage;

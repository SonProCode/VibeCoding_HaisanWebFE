"use client";

import Link from "next/link";
import { paths } from "@/routes/paths";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "./ui/button";

export const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-sky-100 to-white px-6 py-10 text-slate-800 md:px-10 md:py-14">
      <div className="relative z-10 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Hải sản tươi sống từ{" "}
            <span className="text-sky-700">Quảng Ninh</span>
          </h1>
          <p className="max-w-md text-sm text-slate-700 md:text-base">
            Chọn lọc từ vùng biển Hạ Long, Cô Tô, Vân Đồn. Đóng gói chuẩn lạnh,
            giao nhanh trong ngày tại Quảng Ninh & Hà Nội.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={paths.products}>
              <Button variant="primary">{t("hero.cta")}</Button>
            </Link>
            <Link href={paths.tracking}>
              <Button variant="secondary">Theo dõi đơn hàng</Button>
            </Link>
          </div>
          <dl className="mt-4 grid max-w-xs grid-cols-3 gap-4 text-xs">
            <div>
              <dt className="font-semibold text-slate-800">+10 năm</dt>
              <dd className="text-slate-600">Kinh nghiệm hải sản</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">100%</dt>
              <dd className="text-slate-600">Nguồn gốc rõ ràng</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">4.9/5</dt>
              <dd className="text-slate-600">Đánh giá khách hàng</dd>
            </div>
          </dl>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-52 w-full max-w-sm overflow-hidden rounded-3xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1604908176997-1251884b08a7?w=600"
              alt="Hải sản tươi sống Quảng Ninh"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

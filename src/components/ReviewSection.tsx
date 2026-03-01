"use client";

import reviewsData from "@/mocks/reviews.json";

const reviews = reviewsData as Array<{
  id: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
}>;

export const ReviewSection = () => (
  <section className="rounded-2xl bg-white/80 p-6 shadow-sm">
    <h2 className="mb-4 text-lg font-semibold text-slate-800">
      Đánh giá khách hàng
    </h2>
    <div className="grid gap-4 md:grid-cols-3">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-amber-500">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </span>
            <span className="text-xs text-slate-500">{r.date}</span>
          </div>
          <p className="text-sm text-slate-700">{r.content}</p>
          <p className="mt-2 text-xs font-medium text-slate-600">
            — {r.userName}
          </p>
        </div>
      ))}
    </div>
  </section>
);

 "use client";

 import { useState, useEffect } from "react";
 import Link from "next/link";
 import { paths } from "@/routes/paths";

const DEFAULT_SLIDE_IMAGE =
  "https://images.unsplash.com/photo-1604908176997-1251884b08a7?w=1200&auto=format&fit=crop&q=80";

const SLIDES = [
   {
     id: 1,
     title: "Hải sản tươi sống Quảng Ninh",
     subtitle: "Đánh bắt trong ngày – Giao nhanh trong 2 giờ tại Hạ Long & Hà Nội.",
     image:
      "https://images.unsplash.com/photo-1604908176997-1251884b08a7?w=1200&auto=format&fit=crop&q=80",
   },
   {
     id: 2,
     title: "Đặc sản biển cao cấp",
     subtitle: "Tôm, cua, ghẹ, mực… chọn lọc từ vùng biển Hạ Long, Vân Đồn, Cô Tô.",
     image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
   },
   {
     id: 3,
     title: "Đóng gói chuẩn lạnh – An toàn",
     subtitle: "Đảm bảo chuỗi lạnh, giữ trọn độ tươi và dinh dưỡng đến tay khách hàng.",
     image:
       "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop",
   },
 ];

 const HOTLINE = "0988.123.456";
 const FACEBOOK_URL = "https://facebook.com/haisanquangninh";

 export const HeroSlider = () => {
   const [index, setIndex] = useState(0);

   useEffect(() => {
     const timer = setInterval(() => {
       setIndex((prev) => (prev + 1) % SLIDES.length);
     }, 7000);
     return () => clearInterval(timer);
   }, []);

   const current = SLIDES[index];

   const goTo = (nextIndex: number) => {
     if (nextIndex < 0) {
       setIndex(SLIDES.length - 1);
     } else if (nextIndex >= SLIDES.length) {
       setIndex(0);
     } else {
       setIndex(nextIndex);
     }
   };

   return (
     <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-lg">
       <div className="relative h-[260px] w-full md:h-[340px]">
         <img
           key={current.id}
           src={current.image || DEFAULT_SLIDE_IMAGE}
           alt={current.title}
           onError={(e) => {
             if (e.currentTarget.src !== DEFAULT_SLIDE_IMAGE) {
               e.currentTarget.src = DEFAULT_SLIDE_IMAGE;
             }
           }}
           className="h-full w-full object-cover transition-transform duration-700 ease-out"
         />
         <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent" />

         {/* Content */}
         <div className="absolute inset-0 z-10 flex items-center px-6 py-6 md:px-10">
           <div className="max-w-xl space-y-3">
             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
               HẢI SẢN QUẢNG NINH CHÍNH GỐC
             </p>
             <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
               {current.title}
             </h1>
             <p className="text-sm text-sky-50/90 md:text-base">{current.subtitle}</p>

             <div className="mt-3 flex flex-wrap items-center gap-3 text-xs md:text-sm">
               <div className="rounded-2xl bg-slate-900/60 px-3 py-2 md:px-4">
                 <div className="text-sky-300">Hotline đặt hàng</div>
                 <a
                   href={`tel:${HOTLINE.replace(/\D/g, "")}`}
                   className="text-base font-semibold text-white md:text-lg"
                 >
                   {HOTLINE}
                 </a>
               </div>
               <Link
                 href={FACEBOOK_URL}
                 target="_blank"
                 className="inline-flex items-center rounded-2xl bg-sky-500 px-4 py-2 text-xs font-medium text-white shadow-md hover:bg-sky-400"
               >
                 Fanpage Facebook
               </Link>
               <Link
                 href={paths.products}
                 className="inline-flex items-center rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-sky-100 backdrop-blur hover:bg-white/20"
               >
                 Xem menu hải sản
               </Link>
             </div>
           </div>
         </div>

        {/* Controls */}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          <button
            type="button"
            aria-label="Slide trước"
            onClick={() => goTo(index - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-xs text-white shadow-md ring-1 ring-white/40 hover:bg-slate-800/90"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Slide tiếp theo"
            onClick={() => goTo(index + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-xs text-white shadow-md ring-1 ring-white/40 hover:bg-slate-800/90"
          >
            ›
          </button>
        </div>

         {/* Dots */}
         <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
           {SLIDES.map((slide, i) => (
             <button
               key={slide.id}
               type="button"
               aria-label={`Chuyển tới slide ${i + 1}`}
               onClick={() => goTo(i)}
               className={`h-1.5 rounded-full transition-all ${
                 i === index ? "w-6 bg-sky-400" : "w-2 bg-slate-500/60 hover:bg-slate-300"
               }`}
             />
           ))}
         </div>
       </div>
     </section>
   );
 };


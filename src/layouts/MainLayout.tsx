"use client";

import { type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />
    <main className="mx-auto mt-4 max-w-6xl px-4 pb-10">{children}</main>
    <Footer />
  </div>
);

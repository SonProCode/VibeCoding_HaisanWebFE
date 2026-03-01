"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { paths } from "@/routes/paths";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useI18n } from "@/hooks/useI18n";
import { useUiStore } from "@/store/uiStore";
import { Button } from "./ui/button";
import { useState } from "react";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { items } = useCart();
  const { lang, setLang, t } = useI18n();
  const { isDarkMode, toggleDarkMode } = useUiStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`text-sm font-medium ${
          active ? "text-sky-600" : "text-slate-700 hover:text-sky-600"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={paths.home} className="flex items-center gap-2">
          <span className="text-2xl">🌊</span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              haisanquangninh
            </span>
            <span className="text-xs text-slate-500">
              Hải sản tươi sống Quảng Ninh
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLink(paths.home, t("nav.home"))}
          {navLink(paths.products, t("nav.products"))}
          {navLink(paths.tracking, t("nav.tracking"))}
          {isAuthenticated && navLink(paths.userDashboard, t("nav.user"))}
          {isAdmin && navLink(paths.admin, t("nav.admin"))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="rounded-full border border-slate-200 p-1.5 text-xs text-slate-700 hover:bg-slate-50"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          <select
            className="hidden rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 sm:block"
            value={lang}
            onChange={(e) => setLang(e.target.value as "vi" | "en")}
          >
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>

          <Link
            href={paths.cart}
            className="relative rounded-full border border-slate-200 p-2 hover:bg-slate-50"
          >
            <span>🛒</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-600 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {!isAuthenticated ? (
            <Button
              variant="primary"
              className="hidden text-xs md:inline-flex"
              onClick={() => router.push(paths.login)}
            >
              Đăng nhập
            </Button>
          ) : (
            <div className="hidden md:block">
              <span className="text-xs text-slate-600">
                Xin chào, {user?.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="ml-2 text-xs text-sky-600 hover:underline"
              >
                Đăng xuất
              </button>
            </div>
          )}

          <button
            className="md:hidden rounded p-2 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link href={paths.home} onClick={() => setMobileOpen(false)}>
              {t("nav.home")}
            </Link>
            <Link href={paths.products} onClick={() => setMobileOpen(false)}>
              {t("nav.products")}
            </Link>
            <Link href={paths.tracking} onClick={() => setMobileOpen(false)}>
              {t("nav.tracking")}
            </Link>
            {isAuthenticated && (
              <Link href={paths.userDashboard} onClick={() => setMobileOpen(false)}>
                {t("nav.user")}
              </Link>
            )}
            {isAdmin && (
              <Link href={paths.admin} onClick={() => setMobileOpen(false)}>
                {t("nav.admin")}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

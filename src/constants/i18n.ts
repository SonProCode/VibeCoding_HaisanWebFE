import type { Language } from "@/types/common";

export const DEFAULT_LANGUAGE: Language = "vi";

export const translations: Record<Language, Record<string, string>> = {
  vi: {
    "brand.name": "🌊 haisanquangninh",
    "brand.slogan": "Hải sản tươi sống chuẩn vị Quảng Ninh",
    "nav.home": "Trang chủ",
    "nav.products": "Sản phẩm",
    "nav.cart": "Giỏ hàng",
    "nav.tracking": "Tra cứu đơn",
    "nav.user": "Tài khoản",
    "nav.admin": "Admin",
    "hero.cta": "Đặt hải sản tươi ngay",
    "hero.secondary": "Giao nhanh trong ngày tại Quảng Ninh & Hà Nội",
  },
  en: {
    "brand.name": "🌊 haisanquangninh",
    "brand.slogan": "Fresh seafood from Quang Ninh",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.cart": "Cart",
    "nav.tracking": "Tracking",
    "nav.user": "Account",
    "nav.admin": "Admin",
    "hero.cta": "Order fresh seafood now",
    "hero.secondary": "Same-day delivery in Quang Ninh & Hanoi",
  },
};

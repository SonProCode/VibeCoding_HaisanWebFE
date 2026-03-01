import type { ProductCategory } from "@/types/product";

export const PRODUCT_CATEGORIES: {
  id: ProductCategory;
  labelVi: string;
  labelEn: string;
}[] = [
  { id: "shrimp", labelVi: "Tôm", labelEn: "Shrimp" },
  { id: "crab", labelVi: "Cua/Ghẹ", labelEn: "Crab" },
  { id: "squid", labelVi: "Mực", labelEn: "Squid" },
  { id: "fish", labelVi: "Cá", labelEn: "Fish" },
  { id: "clam", labelVi: "Ngao/Sò/Hàu", labelEn: "Shellfish" },
  { id: "other", labelVi: "Khác", labelEn: "Other" },
];

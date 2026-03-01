export type ProductCategory =
  | "shrimp"
  | "crab"
  | "squid"
  | "fish"
  | "clam"
  | "other";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  origin: string;
  price: number;
  salePrice?: number;
  isFresh: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  badges: string[];
  category: ProductCategory;
  thumbnailUrl: string;
  galleryUrls: string[];
  stock: number;
  rating: number;
  ratingCount: number;
}

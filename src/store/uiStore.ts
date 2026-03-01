import { create } from "zustand";

interface UiState {
  isDarkMode: boolean;
  isGlobalLoading: boolean;
  wishlist: string[];
  flashSaleEnd: string | undefined;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  setGlobalLoading: (val: boolean) => void;
  toggleWishlist: (productId: string) => void;
  setFlashSaleEnd: (isoDate: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isDarkMode: false,
  isGlobalLoading: false,
  wishlist: [],
  flashSaleEnd: undefined,
  setDarkMode: (val) => set({ isDarkMode: val }),
  toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
  setGlobalLoading: (val) => set({ isGlobalLoading: val }),
  toggleWishlist: (productId) =>
    set((s) => ({
      wishlist: s.wishlist.includes(productId)
        ? s.wishlist.filter((id) => id !== productId)
        : [...s.wishlist, productId],
    })),
  setFlashSaleEnd: (isoDate) => set({ flashSaleEnd: isoDate }),
}));

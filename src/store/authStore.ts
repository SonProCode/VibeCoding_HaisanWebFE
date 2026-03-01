import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  login: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
      isAdmin: user.role === "admin",
    }),
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
    }),
}));

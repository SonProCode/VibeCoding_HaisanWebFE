import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuthStore();
  return { user, isAuthenticated, isAdmin, login, logout };
};

import type { User } from "@/types/user";
import type { ApiResponse } from "@/types/common";
import usersData from "@/mocks/users.json";

const users = usersData as User[];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponse>> {
    await delay(400);
    const user = users.find((u) => u.email === payload.email);
    if (!user) {
      throw new Error("Tài khoản không tồn tại");
    }
    const token = `mock-token-${user.id}`;
    return { data: { user, token } };
  },

  async register(payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> {
    await delay(500);
    const exists = users.some((u) => u.email === payload.email);
    if (exists) {
      throw new Error("Email đã tồn tại");
    }
    const user: User = {
      id: `U-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: "user",
      isActive: true,
    };
    users.push(user);
    const token = `mock-token-${user.id}`;
    return { data: { user, token } };
  },
};

import axios from "axios";

/**
 * Axios client - dễ dàng thay baseURL khi kết nối backend thật
 */
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

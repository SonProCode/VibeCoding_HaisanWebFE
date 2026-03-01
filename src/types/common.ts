export type Language = "vi" | "en";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

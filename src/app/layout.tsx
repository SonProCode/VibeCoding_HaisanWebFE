import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "🌊 haisanquangninh - Hải sản tươi sống Quảng Ninh",
  description:
    "Hải sản tươi sống, nguồn gốc Quảng Ninh, giao hàng nhanh, chất lượng nhà hàng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

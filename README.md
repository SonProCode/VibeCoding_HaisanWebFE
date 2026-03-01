# 🌊 haisanquangninh

Website bán hải sản tươi sống Quảng Ninh - Frontend React + TypeScript.

## Tech Stack

- **Next.js 16** (App Router)
- **React 18** + **TypeScript**
- **TailwindCSS**
- **Zustand** (state management)
- **React Hook Form** + **Zod** (form validation)
- **Axios** (API client - sẵn sàng kết nối backend)

## Cấu trúc thư mục

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components
├── layouts/          # MainLayout, AdminLayout
├── routes/           # paths constants
├── store/            # Zustand stores (auth, cart, product, order, ui)
├── api/              # API layer (mock hiện tại)
├── hooks/            # useAuth, useCart, useI18n, useToast, useCountdown
├── utils/            # formatCurrency, orderStatus, seo
├── types/            # TypeScript types
├── constants/        # categories, i18n
└── mocks/            # Mock data JSON
```

## Chạy project

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Tài khoản demo

- **Admin**: admin@haisanquangninh.vn (mật khẩu bất kỳ)
- **User**: user@example.com (mật khẩu bất kỳ)

## Tra cứu đơn hàng

Dùng mã vận đơn mẫu: **VN123456**

## Kết nối backend

1. Đặt `NEXT_PUBLIC_API_URL` trong `.env.local`
2. Thay thế logic trong `src/api/*` gọi `axiosClient` thay vì mock
3. Cập nhật `authApi` lưu token, gắn `Authorization` header

## Tính năng

- Trang chủ, danh sách sản phẩm, chi tiết sản phẩm
- Giỏ hàng, thanh toán, tra cứu đơn
- Đăng nhập/đăng ký, dashboard user
- Admin: quản lý sản phẩm, đơn hàng, người dùng, thống kê
- Wishlist, toast, dark mode, đa ngôn ngữ (VI/EN)
- Flash sale countdown, chat support widget

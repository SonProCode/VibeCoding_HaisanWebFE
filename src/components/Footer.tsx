"use client";

export const Footer = () => (
  <footer className="mt-12 border-t border-slate-100 bg-slate-50">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-4">
      <div>
        <h4 className="text-sm font-semibold text-slate-800">
          🌊 haisanquangninh
        </h4>
        <p className="mt-2 text-xs text-slate-600">
          Hải sản tươi sống, tuyển chọn từ Quảng Ninh. Giao nhanh, đóng gói
          chuẩn lạnh.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-800">Liên hệ</h4>
        <p className="mt-2 text-xs text-slate-600">
          Địa chỉ: Hạ Long, Quảng Ninh
          <br />
          Hotline: <a href="tel:0988123456">0988.123.456</a>
          <br />
          Email: cskh@haisanquangninh.vn
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-800">Kết nối</h4>
        <p className="mt-2 text-xs text-slate-600">
          Fanpage: facebook.com/haisanquangninh
          <br />
          Zalo OA: haisanquangninh
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-800">Chính sách</h4>
        <ul className="mt-2 space-y-1 text-xs text-slate-600">
          <li>Chính sách đổi trả</li>
          <li>Chính sách bảo mật</li>
          <li>Điều khoản sử dụng</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-slate-100 py-3 text-center text-[11px] text-slate-500">
      © {new Date().getFullYear()} haisanquangninh. All rights reserved.
    </div>
  </footer>
);

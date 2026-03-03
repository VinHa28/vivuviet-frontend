"use client";

import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useAuth();

  // Nếu showLoginModal là false, biến mất hoàn toàn
  if (!showLoginModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={() => setShowLoginModal(false)} // Bấm ra ngoài để đóng
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // Ngăn đóng modal khi bấm bên trong
      >
        {/* Nút đóng */}
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Nội dung */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Đăng nhập</h1>
          <p className="text-gray-500 mt-2 font-primary">
            Chào mừng bạn trở lại VivuViet
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <Button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold transition-transform active:scale-95">
            Đăng nhập
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Chưa có tài khoản?{" "}
            <span className="text-primary font-semibold hover:underline cursor-pointer">
              Đăng ký đối tác
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

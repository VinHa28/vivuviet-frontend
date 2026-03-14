"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();
  const { showLoginModal, setShowLoginModal } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  // 1. Thêm state lưu lỗi từ server
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!showLoginModal) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Xóa lỗi field và lỗi server khi người dùng gõ lại
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log("1. start");
    setServerError("");

    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
      valid = false;
    }

    setErrors(newErrors);
    console.log("handleSubmit called", e);

    if (valid) {
      setIsLoading(true);
      console.log("3. calling login...");

      try {
        const user = await login(formData);
        // Thành công
        if (user) router.push("/dashboard");
      } catch (error) {
        console.log("5. login error", error);
        const errorMessage =
          error.response?.data?.message ||
          "Tài khoản hoặc mật khẩu không chính xác";
        setServerError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={() => setShowLoginModal(false)}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Đăng nhập</h1>
          <p className="text-gray-500 mt-2">Chào mừng bạn trở lại VivuViet</p>
        </div>

        {/* 3. Hiển thị thông báo lỗi Server ngay tại đây */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-shake">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-primary"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                errors.password
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-primary"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold transition-transform active:scale-95 mt-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
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

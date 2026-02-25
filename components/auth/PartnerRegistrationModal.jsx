"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { registerPartner } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function PartnerRegistrationModal({ isOpen, onClose, selectedTier = "basic" }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        businessName: "",
        phone: "",
        website: "",
        fanpage: "",
        partnerTier: selectedTier,
    });

    const tierInfo = {
        basic: { name: "Gói 1 – Đối tác Cơ Bản", price: "Miễn phí" },
        standard: { name: "Gói 2 – Đối tác Nâng Cao", price: "Liên hệ" },
        premium: { name: "Gói 3 – Đối tác Chiến Lược", price: "79.000đ/tháng" },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.email || !formData.password || !formData.businessName || !formData.phone) {
            setError("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        if (formData.password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setIsLoading(true);

        try {
            await registerPartner({
                email: formData.email,
                password: formData.password,
                businessName: formData.businessName,
                phone: formData.phone,
                website: formData.website,
                fanpage: formData.fanpage,
                partnerTier: formData.partnerTier,
            });

            onClose();
            window.location.href = "/?showLoginModal=true";
        } catch (err) {
            setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary">Đăng ký đối tác</h2>
                        <p className="text-sm text-text-secondary mt-1">
                            {tierInfo[formData.partnerTier]?.name} - {tierInfo[formData.partnerTier]?.price}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                placeholder="email@example.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-primary mb-2">
                                    Mật khẩu <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-primary mb-2">
                                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Business Name */}
                        <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">
                                Tên doanh nghiệp <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                placeholder="VD: Công ty Du lịch ABC"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">
                                Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                placeholder="0912345678"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">
                                Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                placeholder="https://example.com"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Fanpage */}
                        <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">
                                Fanpage Facebook
                            </label>
                            <input
                                type="url"
                                name="fanpage"
                                value={formData.fanpage}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                placeholder="https://facebook.com/your-page"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Partner Tier (hidden) */}
                        <input type="hidden" name="partnerTier" value={formData.partnerTier} />
                    </div>

                    {/* Info notice */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Lưu ý:</strong> Sau khi đăng ký, bạn sẽ cần đợi quản trị viên duyệt tài khoản.
                            Bạn có thể đăng nhập ngay nhưng các tính năng đối tác sẽ được kích hoạt sau khi được duyệt.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-text-primary hover:bg-gray-50 transition-colors"
                            disabled={isLoading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Đang xử lý...
                                </>
                            ) : (
                                "Đăng ký"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

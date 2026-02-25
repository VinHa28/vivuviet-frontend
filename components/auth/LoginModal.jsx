// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { login } from "@/services/authService";
// import { X } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
// import Link from "next/link";
// import Button from "@/components/ui/Button";

// export default function LoginModal() {
//     const router = useRouter();
//     const { setUser, showLoginModal, setShowLoginModal } = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     useEffect(() => {
//         if (searchParams.get("showLoginModal") === "true") {
//             setShowLoginModal(true);
//             setShowRegistrationSuccess(true);
//         }
//     }, [searchParams, setShowLoginModal]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         setError("");
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (!formData.email || !formData.password) {
//             setError("Vui lòng điền đầy đủ thông tin");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const user = await login(formData);
//             setUser(user);
//             setShowLoginModal(false);

//             if (user.role === "partner" && !user.isPartnerActive) {
//                 router.push("/dashboard?status=pending");
//             } else {
//                 router.push("/dashboard");
//             }
//         } catch (err) {
//             setError(err.message || "Email hoặc mật khẩu không đúng");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!showLoginModal) return null;

//     return (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//             <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//                 {/* Close Button */}
//                 <button
//                     onClick={() => setShowLoginModal(false)}
//                     className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                     <X size={24} className="text-gray-600" />
//                 </button>

//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-text-primary">Đăng nhập</h1>
//                     <p className="text-text-secondary mt-2">Chào mừng bạn trở lại VivuViet</p>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                     <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                         <p className="text-red-600 text-sm">{error}</p>
//                     </div>
//                 )}

//                 {showRegistrationSuccess && (
//                     <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                         <p className="text-green-800 text-sm">
//                             ✓ Đăng ký thành công! Vui lòng đăng nhập. Tài khoản của bạn sẽ được kích hoạt sau khi quản trị viên duyệt.
//                         </p>
//                     </div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label className="block text-sm font-semibold text-text-primary mb-2">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
//                             placeholder="email@example.com"
//                             disabled={isLoading}
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-semibold text-text-primary mb-2">
//                             Mật khẩu
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
//                             placeholder="••••••••"
//                             disabled={isLoading}
//                         />
//                     </div>

//                     <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full px-6 py-3 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 "
//                     >
//                         {isLoading ? (
//                             <>
//                                 Đang đăng nhập...
//                             </>
//                         ) : (
//                             "Đăng nhập"
//                         )}
//                     </Button>
//                 </form>

//                 {/* Register Link */}
//                 <div className="mt-6 text-center">
//                     <p className="text-sm text-text-secondary">
//                         Chưa có tài khoản?{" "}
//                         <Link href="/about" className="text-primary font-semibold hover:underline">
//                             Đăng ký đối tác
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react'

export default function LoginModal() {
  return (
    <div>LoginModal</div>
  )
}

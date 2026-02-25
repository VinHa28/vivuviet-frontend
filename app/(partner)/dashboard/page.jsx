// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { User, Mail, Phone, Building2, Globe, Facebook, Shield, Clock, CheckCircle } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
// import { getMyPartnerRequest } from "@/services/partnerService";

// export default function Dashboard() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const { user, loading, refreshUser } = useAuth();
//     const status = searchParams.get("status");
//     const [partnerRequest, setPartnerRequest] = useState(null);
//     const [loadingRequest, setLoadingRequest] = useState(true);

//     useEffect(() => {
//         if (!loading && !user) {
//             router.replace("/login");
//         }
//     }, [user, loading, router]);

//     useEffect(() => {
//         if (user) {
//             fetchPartnerRequest();
//             const interval = !user.isPartnerActive ? setInterval(() => {
//                 refreshUser();
//             }, 5000) : null;

//             return () => {
//                 if (interval) clearInterval(interval);
//             };
//         }
//     }, [user?.isPartnerActive]);

//     const fetchPartnerRequest = async () => {
//         try {
//             const data = await getMyPartnerRequest();
//             setPartnerRequest(data);
//         } catch (error) {
//             console.error("Error fetching partner request:", error);
//         } finally {
//             setLoadingRequest(false);
//         }
//     };

//     useEffect(() => {
//         if (!loading && !user) {
//             router.replace("/login");
//         }
//     }, [user, loading, router]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
//             </div>
//         );
//     }

//     if (!user) {
//         return null; // Will redirect
//     }

//     const tierInfo = {
//         basic: {
//             name: "Gói Cơ Bản",
//             color: "bg-blue-100 text-blue-700",
//             features: ["Tạo bài giới thiệu", "Hiển thị thông tin cơ bản", "Gắn link website/fanpage"]
//         },
//         standard: {
//             name: "Gói Nâng Cao",
//             color: "bg-purple-100 text-purple-700",
//             features: ["Tất cả quyền lợi Gói 1", "Xuất hiện trong bài viết", "Ưu tiên hiển thị"]
//         },
//         premium: {
//             name: "Gói Chiến Lược",
//             color: "bg-amber-100 text-amber-700",
//             features: ["Tất cả quyền lợi Gói 2", "Tài khoản quản trị", "Tự tạo bài viết", "Hỗ trợ ưu tiên"]
//         }
//     };

//     const currentTier = tierInfo[user.partnerTier] || tierInfo.basic;

//     return (
//         <div className="min-h-[calc(100vh-90px)] bg-gray-50 py-8 px-4">
//             <div className="max-w-5xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-text-primary">Dashboard Đối Tác</h1>
//                     <p className="text-text-secondary mt-2">Quản lý thông tin tài khoản và dịch vụ của bạn</p>
//                 </div>

//                 {/* Pending Notice */}
//                 {status === "pending" || !user.isPartnerActive ? (
//                     <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
//                         <div className="flex items-start gap-3">
//                             <Clock className="text-yellow-600 mt-1" size={24} />
//                             <div>
//                                 <h3 className="font-semibold text-yellow-800 text-lg">Tài khoản đang chờ duyệt</h3>
//                                 <p className="text-yellow-700 mt-1">
//                                     Cảm ơn bạn đã đăng ký! Tài khoản của bạn đang được quản trị viên xem xét.
//                                     Các tính năng đối tác sẽ được kích hoạt sau khi tài khoản được phê duyệt.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
//                         <div className="flex items-start gap-3">
//                             <CheckCircle className="text-green-600 mt-1" size={24} />
//                             <div>
//                                 <h3 className="font-semibold text-green-800 text-lg">Tài khoản đã được kích hoạt</h3>
//                                 <p className="text-green-700 mt-1">
//                                     Tài khoản của bạn đã được phê duyệt. Bạn có thể sử dụng đầy đủ các tính năng đối tác.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Account Info Card */}
//                     <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
//                         <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
//                             <User className="text-secondary" size={24} />
//                             Thông tin tài khoản
//                         </h2>

//                         <div className="space-y-4">
//                             <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
//                                 <Building2 className="text-gray-400 mt-1" size={20} />
//                                 <div className="flex-1">
//                                     <p className="text-sm text-text-secondary">Tên doanh nghiệp</p>
//                                     <p className="text-base font-semibold text-text-primary mt-1">
//                                         {user.businessName || "Chưa cập nhật"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
//                                 <Mail className="text-gray-400 mt-1" size={20} />
//                                 <div className="flex-1">
//                                     <p className="text-sm text-text-secondary">Email</p>
//                                     <p className="text-base font-medium text-text-primary mt-1">{user.email}</p>
//                                 </div>
//                             </div>

//                             {user.phone && (
//                                 <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
//                                     <Phone className="text-gray-400 mt-1" size={20} />
//                                     <div className="flex-1">
//                                         <p className="text-sm text-text-secondary">Số điện thoại</p>
//                                         <p className="text-base font-medium text-text-primary mt-1">{user.phone}</p>
//                                     </div>
//                                 </div>
//                             )}

//                             {user.website && (
//                                 <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
//                                     <Globe className="text-gray-400 mt-1" size={20} />
//                                     <div className="flex-1">
//                                         <p className="text-sm text-text-secondary">Website</p>
//                                         <a
//                                             href={user.website}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-base font-medium text-secondary hover:underline mt-1 inline-block"
//                                         >
//                                             {user.website}
//                                         </a>
//                                     </div>
//                                 </div>
//                             )}

//                             {user.fanpage && (
//                                 <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
//                                     <Facebook className="text-gray-400 mt-1" size={20} />
//                                     <div className="flex-1">
//                                         <p className="text-sm text-text-secondary">Fanpage Facebook</p>
//                                         <a
//                                             href={user.fanpage}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-base font-medium text-secondary hover:underline mt-1 inline-block"
//                                         >
//                                             {user.fanpage}
//                                         </a>
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="flex items-start gap-3">
//                                 <Shield className="text-gray-400 mt-1" size={20} />
//                                 <div className="flex-1">
//                                     <p className="text-sm text-text-secondary">Vai trò</p>
//                                     <div className="mt-2 flex gap-2">
//                                         <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
//                                             {user.role === "admin" ? "Quản trị viên" : "Đối tác"}
//                                         </span>
//                                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.isPartnerActive
//                                             ? "bg-green-100 text-green-700"
//                                             : "bg-yellow-100 text-yellow-700"
//                                             }`}>
//                                             {user.isPartnerActive ? "Đã kích hoạt" : "Chờ duyệt"}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Subscription Card */}
//                     <div className="bg-white rounded-xl shadow-md p-8">
//                         <h2 className="text-xl font-bold text-text-primary mb-6">Gói đăng ký</h2>

//                         <div className={`p-4 rounded-lg ${currentTier.color} mb-4`}>
//                             <p className="font-bold text-lg">{currentTier.name}</p>
//                             <p className="text-xs mt-1 opacity-80">
//                                 Gói {user.partnerTier}
//                             </p>
//                         </div>

//                         <div className="space-y-3">
//                             <p className="text-sm font-semibold text-text-primary">Quyền lợi:</p>
//                             {currentTier.features.map((feature, index) => (
//                                 <div key={index} className="flex items-start gap-2">
//                                     <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
//                                     <p className="text-sm text-text-secondary">{feature}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         {!user.isPartnerActive && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <p className="text-xs text-text-secondary text-center">
//                                     Các tính năng sẽ được mở khóa sau khi tài khoản được duyệt
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from "react";

export default function DashboardPage() {
  return <div>DashboardPage</div>;
}

"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { Check, X, Crown } from "lucide-react";
import { useState } from "react";
import PartnerRegistrationModal from "@/components/auth/PartnerRegistrationModal";
import { useAuth } from "@/contexts/AuthContext";
import FloatingChat from "@/components/ui/FloatingChat";

export default function About() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("basic");

  // Get current partner tier from user
  const currentPartnerTier = user?.partnerTier || null;
  const isPartner = user?.role === "partner" && user?.isPartnerActive;

  const handleRegisterClick = (tier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const plans = [
    {
      name: "Gói 1 – Đối tác Cơ Bản",
      price: "Miễn phí",
      tier: "basic",
      description:
        "Phù hợp với: quán ăn nhỏ, homestay, dịch vụ địa phương quy mô nhỏ.",
      features: [
        { text: "Tạo hồ sơ doanh nghiệp trên VivuViet", status: true },
        { text: "Đề xuất tour nhằm hỗ trợ quảng bá", status: true },
        { text: "Gắn link Website / Fanpage Facebook", status: true },
        { text: "Điều hướng khách về kênh riêng", status: true },
        { text: "Marketing nội dung hệ thống", status: false },
        { text: "Tài khoản quản trị bài viết", status: false },
      ],
      cta: "Bắt đầu ngay",
      popular: false,
    },
    {
      name: "Gói 2 – Đối tác Nâng Cao",
      price: "Liên hệ",
      tier: "standard",
      description:
        "Phù hợp với: nhà hàng, khách sạn, đơn vị tour muốn quảng bá mạnh.",
      features: [
        { text: "Bao gồm toàn bộ quyền lợi Gói 1", status: true },
        { text: "Xuất hiện trong các bài viết địa điểm", status: true },
        { text: "Đề xuất nổi bật trong bài tổng hợp", status: true },
        { text: "Ưu tiên hiển thị tại địa phương", status: true },
        { text: "Tự quản lý cập nhật thông tin", status: false },
        { text: "Tài khoản quản trị bài viết", status: false },
      ],
      cta: "Đăng ký ngay",
      popular: false,
    },
    {
      name: "Gói 3 – Đối tác Chiến Lược",
      price: "79.000đ/tháng",
      tier: "premium",
      description:
        "Phù hợp với: chuỗi khách sạn, công ty tour, doanh nghiệp lâu dài.",
      features: [
        { text: "Bao gồm toàn bộ quyền lợi Gói 2", status: true },
        { text: "Cấp tài khoản quản trị hệ thống", status: true },
        { text: "Tự tạo và cập nhật bài giới thiệu", status: true },
        { text: "Quyền đề xuất bài viết lên trang chủ", status: true },
        { text: "Gắn sản phẩm/dịch vụ trực tiếp", status: true },
        { text: "Hỗ trợ kiểm duyệt ưu tiên", status: true },
      ],
      cta: "Đăng ký ngay",
      popular: true,
    },
  ];
  return (
    <main className="bg-white overflow-hidden">
      <FloatingChat />

      {/* HERO – Statement + Images */}
      <section className="min-h-[90vh] flex items-center px-[80px]">
        <div className="grid grid-cols-2 gap-[80px] items-center max-w-[1400px] mx-auto">
          {/* Text */}
          <div>
            <h1 className="text-[50px] leading-tight font-semibold text-text-primary">
              Chúng tôi không chỉ
              <br />
              <span className="font-script-1 text-secondary text-[72px]">
                giới thiệu điểm đến
              </span>
              <br />
              mà kể lại những hành trình
            </h1>

            <p className="mt-8 text-[18px] text-text-secondary max-w-[520px]">
              VivuViet được sinh ra từ mong muốn giúp bạn cảm nhận Việt Nam bằng
              tất cả giác quan — chậm rãi, chân thực và đầy cảm xúc.
            </p>
          </div>

          {/* Image collage */}
          <div className="relative h-[520px]">
            <div className="absolute top-0 left-0 w-[65%] h-[70%] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/about_1.jpg"
                alt="Vietnam nature"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/about_2.jpg"
                alt="Vietnam culture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER OFFERS SECTION - Thay thế Image Strip */}
      <section className="py-[120px]">
        <div className="max-w-[1400px] mx-auto px-[80px]">
          <div className="mb-12">
            <h2 className="text-[42px] font-semibold text-text-primary">
              Ưu đãi đối tác VivuViet
            </h2>
            <p className="text-text-secondary mt-2">
              Đồng hành cùng chúng tôi để lan tỏa vẻ đẹp Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const isCurrentPlan =
                isPartner && currentPartnerTier === plan.tier;

              return (
                <div
                  key={index}
                  className={`relative p-8 rounded-3xl bg-white border transition-all duration-300 hover:shadow-2xl ${
                    isCurrentPlan
                      ? "border-green-500 ring-2 ring-green-500 shadow-lg"
                      : plan.popular
                        ? "border-secondary ring-1 ring-secondary"
                        : "border-gray-100 shadow-sm"
                  }`}
                >
                  {isCurrentPlan && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
                      <Crown size={14} />
                      ĐANG SỬ DỤNG
                    </span>
                  )}

                  {!isCurrentPlan && plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                      LỰA CHỌN TỐI ƯU
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-text-primary">
                    {plan.name}
                  </h3>
                  <div className="mt-4 mb-8">
                    <span className="text-3xl font-bold text-secondary">
                      {plan.price}
                    </span>
                    {plan.price.includes("đ") && (
                      <span className="text-text-secondary"> / tháng</span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-start gap-3 text-[15px]"
                      >
                        {feature.status ? (
                          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.status
                              ? "text-text-primary"
                              : "text-gray-400"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleRegisterClick(plan.tier)}
                    disabled={isCurrentPlan}
                    className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                      isCurrentPlan
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : plan.popular
                          ? "bg-secondary text-white hover:bg-secondary/90"
                          : "bg-gray-100 text-text-primary hover:bg-gray-200"
                    }`}
                  >
                    {isCurrentPlan ? "Gói hiện tại" : plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <PartnerRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTier={selectedTier}
      />

      {/* STORY – Text + Tall Image */}
      <section className="px-[80px] pb-[140px]">
        <div className="grid grid-cols-2 gap-[80px] max-w-[1200px] mx-auto items-center">
          <div>
            <p className="text-[18px] text-text-secondary leading-loose">
              Việt Nam không chỉ là những danh lam thắng cảnh.
              <br />
              Đó là buổi sáng yên bình bên bờ biển, là mùi khói bếp, là nhịp
              sống chậm rãi trong những con phố nhỏ.
            </p>

            <p className="mt-8 text-[18px] text-text-secondary leading-loose">
              VivuViet mong muốn lưu giữ những khoảnh khắc đó — để mỗi chuyến đi
              không chỉ là “đã đến”, mà là “đã cảm nhận”.
            </p>
          </div>

          <div className="relative h-[520px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/about_story.jpg"
              alt="Vietnam daily life"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BRAND VALUES */}
      <section className="relative py-[140px]">
        <div className="absolute inset-0">
          <Image
            src="/images/about_3.jpg"
            alt="Vietnam landscape"
            fill
            className="object-cover opacity-[0.08]"
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto grid grid-cols-2 gap-[80px] px-[80px]">
          <div>
            <h2 className="mt-4 text-[42px] font-semibold text-text-primary leading-tight">
              Điều làm nên
              <br />
              <span className="font-script-1 text-secondary text-[56px]">
                VivuViet
              </span>
            </h2>

            <p className="mt-6 text-text-secondary max-w-[420px] leading-relaxed">
              Chúng tôi tin rằng du lịch không chỉ là đi — mà là cảm, là hiểu và
              là kết nối với nơi mình đặt chân đến.
            </p>
          </div>

          <div className="space-y-[32px]">
            {[
              {
                id: "01",
                title: "Chân thực",
                desc: "Không tô vẽ quá mức — chỉ là Việt Nam như chính nó vốn có.",
              },
              {
                id: "02",
                title: "Cảm xúc",
                desc: "Những khoảnh khắc nhỏ nhưng đủ để bạn nhớ rất lâu.",
              },
              {
                id: "03",
                title: "Tôn trọng",
                desc: "Thiên nhiên, văn hoá và cộng đồng địa phương.",
              },
            ].map((item, i) => (
              <div
                key={item.id}
                className={`bg-white p-[32px] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${
                  i % 2 === 0 ? "translate-x-[40px]" : ""
                }`}
              >
                <span className="text-secondary text-[14px] font-medium">
                  {item.id}
                </span>
                <h3 className="mt-2 text-[22px] font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA – Image Focus */}
      <section className="relative h-[520px] flex items-center px-[80px]">
        <Image
          src="/images/about_cta.jpg"
          alt="Vietnam journey"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-[800px] text-white">
          <h2 className="text-[40px] font-semibold">
            Việt Nam vẫn đang chờ bạn khám phá
          </h2>

          <p className="mt-4 max-w-[520px] text-white/90">
            VivuViet không hứa mang đến chuyến đi hoàn hảo — nhưng hứa đồng hành
            cùng bạn trên những hành trình đáng nhớ.
          </p>

          <div className="mt-8">
            <Button variant="light">Khám phá điểm đến</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

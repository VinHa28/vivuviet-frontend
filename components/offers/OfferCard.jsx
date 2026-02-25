"use client";

import Image from "next/image";
import { MapPin, Clock, Users, Eye, Heart, CheckCircle } from "lucide-react";
import React, { useState } from "react";

export default function OfferCard({ offer }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const getServiceTypeInfo = (type) => {
    // Map service types to color tokens defined in fe/app/globals.css
    const typeConfig = {
      tour: {
        label: "Tour",
        // primary red
        bgVar: "var(--color-primary)",
        priceUnit: "/ người",
      },
      hotel: {
        label: "Khách sạn",
        // secondary yellow
        bgVar: "var(--color-secondary)",
        priceUnit: "/ đêm",
      },
      restaurant: {
        label: "Nhà hàng",
        bgVar: "var(--color-secondary)",
        priceUnit: "/ suất ăn",
      },
      transport: {
        label: "Vận chuyển",
        bgVar: "var(--color-primary)",
        priceUnit: "/ chuyến",
      },
      experience: {
        label: "Trải nghiệm",
        bgVar: "var(--color-secondary)",
        priceUnit: "/ hoạt động",
      },
      other: {
        label: "Dịch vụ khác",
        bgVar: "var(--color-text-secondary)",
        priceUnit: "",
      },
    };
    return typeConfig[type] || typeConfig.other;
  };

  const serviceInfo = getServiceTypeInfo(offer.type);

  const priceDisplay =
    offer.priceFrom === offer.priceTo
      ? formatPrice(offer.priceFrom)
      : `${formatPrice(offer.priceFrom)} - ${formatPrice(offer.priceTo)}`;

  return (
    <div className="group relative h-110 w-full max-w-90 cursor-pointer perspective-1000">
      <div className="relative h-full w-full transition-transform duration-700 ease-in-out preserve-3d group-hover:rotate-y-180">
        {/* ===== MẶT TRƯỚC ===== */}
        <div
          className="
          absolute inset-0 h-full w-full rounded-2xl overflow-hidden
          border border-gray-200 shadow-xl
          backface-hidden
          group-hover:pointer-events-none
        "
        >
          <Image
            src={
              offer.images?.[0] ||
              "https://via.placeholder.com/360x460?text=No+Image"
            }
            alt={offer.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 360px"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          <div
            className="absolute top-5 left-5 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 z-10"
            style={{ backgroundColor: serviceInfo.bgVar }}
          >
            {serviceInfo.label}
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white z-10">
            <h3 className="text-2xl font-bold line-clamp-2 drop-shadow-lg mb-2">
              {offer.name}
            </h3>
            <div className="flex items-center gap-2 text-base drop-shadow-md">
              <MapPin size={18} style={{ color: "var(--color-primary)" }} />
              <span className="truncate">{offer.address || "Việt Nam"}</span>
            </div>
          </div>
        </div>

        {/* ===== MẶT SAU (CLICK ĐƯỢC) ===== */}
        <div
          className="
          absolute inset-0 h-full w-full bg-white rounded-2xl
          flex flex-col border border-gray-100 shadow-2xl
          backface-hidden
          pointer-events-auto
        "
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex-1 p-5">
            <div className="flex justify-between items-start mb-4">
              <span
                className="px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider"
                style={{ backgroundColor: serviceInfo.bgVar }}
              >
                {serviceInfo.label}
              </span>

              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Giá từ
                </p>
                <p className="text-xl font-black text-gray-900 leading-none">
                  {formatPrice(offer.priceFrom)}
                  <span className="text-[10px] font-medium text-gray-500 block">
                    {serviceInfo.priceUnit}
                  </span>
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
              {offer.name}
            </h3>

            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} style={{ color: "var(--color-primary)" }} />
                <span className="truncate">{offer.address}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye size={16} style={{ color: "var(--color-secondary)" }} />
                <span>
                  {offer.views?.toLocaleString("vi-VN") || 0} lượt xem
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-4" />

            {offer.type === "tour" && offer.highlights?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {offer.highlights.slice(0, 2).map((h, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <CheckCircle
                      size={12}
                      style={{ color: "var(--color-primary)" }}
                    />
                    {h}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-500 italic line-clamp-3">
              {offer.description
                ? `"${offer.description}"`
                : `"Trải nghiệm tuyệt vời đang chờ bạn..."`}
            </p>
          </div>

          {/* ===== NÚT ĐẶT TOUR ===== */}
          <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(
                  offer.linkAffiliate,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              className="
              w-full text-white font-bold text-sm py-3 px-4 rounded-xl
              flex items-center justify-center gap-2
              transition-all duration-300 active:scale-95
            "
              style={{ backgroundColor: serviceInfo.bgVar }}
            >
              {offer.type === "tour"
                ? "Đặt Tour"
                : offer.type === "hotel"
                  ? "Đặt Phòng"
                  : offer.type === "restaurant"
                    ? "Đặt Bàn"
                    : "Liên Hệ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

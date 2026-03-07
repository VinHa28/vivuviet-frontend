"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { provinces } from "@/mock/offers";
import Button from "@/components/ui/Button";
import OfferCard from "@/components/offers/OfferCard";
import OfferFilters from "@/components/offers/OfferFilters";
import PartnersRow from "@/components/offers/PartnersRow";
import FloatingChat from "../ui/FloatingChat";
import { getAllOffers } from "@/services/offerService";

export default function OffersSection({ initialFilters = null }) {
  const ITEMS_PER_PAGE = 6;

  const [filters, setFilters] = useState({
    province: initialFilters?.province || "All",
    type: initialFilters?.type || "all",
    priceRange: initialFilters?.priceRange || "all",
    minRating: 0,
    minPrice: initialFilters?.minPrice || 0,
    maxPrice: initialFilters?.maxPrice || 999999999,
  });

  const [offers, setOffers] = useState([]);

  const [sortBy, setSortBy] = useState("featured");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOffers = useMemo(() => {
    let result = [...offers];

    result = result.filter((offer) => offer.status === "approved");

    if (filters.type !== "all") {
      result = result.filter((offer) => offer.type === filters.type);
    }

    // Filter by location (address contains province/keyword)
    // Normalize both strings to lowercase for comparison
    if (filters.province && filters.province !== "All") {
      const searchTerm = filters.province.toLowerCase().trim();
      result = result.filter((offer) => {
        const addressLower = offer.address.toLowerCase();
        // Check if search term appears in address
        // This handles cases like "Hạ Long" appearing in "Hạ Long, Quảng Ninh"
        return addressLower.includes(searchTerm);
      });
    }

    // Filter by price range
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      result = result.filter((offer) => {
        const offerMinPrice = offer.priceFrom || 0;
        const offerMaxPrice = offer.priceTo || offer.priceFrom || 999999999;
        return (
          (offerMinPrice <= filters.maxPrice &&
            offerMaxPrice >= filters.minPrice) ||
          (offerMinPrice >= filters.minPrice &&
            offerMinPrice <= filters.maxPrice)
        );
      });
    }

    // Sort logic with business priorities
    switch (sortBy) {
      case "featured":
        result.sort((a, b) => {
          // Priority: Featured > Priority > Views > Latest
          if (a.isFeatured !== b.isFeatured) return b.isFeatured - a.isFeatured;
          if (a.isPriority !== b.isPriority) return b.isPriority - a.isPriority;
          if (a.views !== b.views) return b.views - a.views;
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        break;
      case "price-low":
        result.sort((a, b) => (a.priceFrom || 0) - (b.priceFrom || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.priceFrom || 0) - (a.priceFrom || 0));
        break;
      case "popular":
        result.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return result;
  }, [offers, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredOffers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOffers = filteredOffers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const sortOptions = [
    {
      value: "featured",
      label: "Ưu đãi nổi bật",
      desc: "Kết hợp ưu tiên và phổ biến",
    },
    {
      value: "price-low",
      label: "Giá: Thấp đến Cao",
      desc: "Tiết kiệm nhất trước",
    },
    {
      value: "price-high",
      label: "Giá: Cao đến Thấp",
      desc: "Dịch vụ cao cấp",
    },
    { value: "popular", label: "Phổ biến nhất", desc: "Nhiều người xem nhất" },
    { value: "newest", label: "Mới nhất", desc: "Cập nhật gần đây" },
  ];

  const currentSort = sortOptions.find((opt) => opt.value === sortBy);

  const partners = [
    { id: 1, name: "Vivu Travel", logo: "/icons/tabler_beach.svg" },
    { id: 2, name: "Ocean Hotels", logo: "/icons/mingcute_hotel-line.svg" },
    { id: 3, name: "Sky Transport", logo: "/icons/tdesign_vehicle.svg" },
    { id: 4, name: "Golden Restaurant", logo: "/icons/plane_vector.svg" },
    { id: 5, name: "Local Guides", logo: "/icons/Vector.svg" },
  ];

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getAllOffers();
        setOffers(data);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className="mt-15 pb-20">
      <FloatingChat />
      {/* Header – Editorial Split */}
      <div className="max-w-[1200px] mx-auto px-[40px] mb-[80px] grid grid-cols-2 gap-[60px] items-center">
        {/* Left content */}
        <div>
          <span className="inline-flex items-center gap-2 text-secondary text-sm tracking-wide">
            <span className="w-6 h-[1px] bg-secondary"></span>
            Travel Deals
          </span>

          <h1 className="mt-6 text-[44px] leading-tight font-semibold text-text-primary">
            Ưu đãi du lịch <br />
            <span className="font-script-1 text-[58px] text-secondary">
              được tuyển chọn
            </span>
          </h1>

          <p className="mt-6 max-w-[520px] text-text-secondary text-lg leading-relaxed">
            Những hành trình, trải nghiệm và dịch vụ du lịch chất lượng cao —
            được VivuViet chọn lọc từ các đối tác uy tín trên khắp Việt Nam.
          </p>
        </div>

        {/* Right visual */}
        <div className="relative h-[320px]">
          <div className="absolute top-0 right-0 w-[220px] h-[280px] rounded-2xl overflow-hidden">
            <Image
              src="/images/ha_long.jpg"
              fill
              className="object-cover"
              alt=""
            />
          </div>

          <div className="absolute bottom-0 left-[40px] w-[180px] h-[220px] rounded-2xl overflow-hidden border border-white shadow-md">
            <Image
              src="/images/hoi_an.jpg"
              fill
              className="object-cover"
              alt=""
            />
          </div>

          <div className="absolute left-0 top-[40px] w-[120px] h-[120px] rounded-full bg-secondary/10" />
        </div>
      </div>

      <PartnersRow partners={partners} />

      {/* Main Content */}
      <div className="flex gap-7.5">
        {/* Sidebar Filters */}
        <OfferFilters
          onFilterChange={handleFilterChange}
          provinces={provinces}
          initialFilters={initialFilters}
        />

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Top Bar - Sort */}
          <div className="flex justify-between items-center mb-[30px]">
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2 border border-primary rounded-md hover:bg-gray-50 transition"
              >
                <span>Sắp xếp:</span>
                <span className="font-normal text-primary">
                  {currentSort?.label || "Ưu đãi nổi bật"}
                </span>
                <ChevronDown size={16} />
              </button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-[280px] bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0 ${sortBy === option.value ? "bg-gray-100" : ""}`}
                    >
                      <div className="font-semibold text-text-primary">
                        {option.label}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        {option.desc}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Offers Grid */}
          {filteredOffers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedOffers.map((offer) => (
                  <OfferCard key={offer._id} offer={offer} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12.5">
                  {/* Previous Button */}
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center border border-primary rounded-sm disabled:opacity-30 transition"
                  >
                    <span
                      className={`text-xl ${currentPage === 1 ? "text-gray-400" : "text-primary"}`}
                    >
                      ❮
                    </span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {totalPages <= 5 ? (
                      [...Array(totalPages)].map((_, i) => {
                        const pageNumber = i + 1;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => {
                              setCurrentPage(pageNumber);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`w-10 h-10 rounded-sm border font-bold transition ${
                              currentPage === pageNumber
                                ? "bg-primary text-white border-primary"
                                : "border-primary text-primary bg-white"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })
                    ) : (
                      <>
                        {/* Logic hiển thị thu gọn khi nhiều trang */}
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNumber = i + 1;
                          // Hiển thị trang 1, 2, 3 và trang cuối, hoặc trang đang active
                          if (
                            pageNumber <= 3 ||
                            pageNumber === totalPages ||
                            pageNumber === currentPage
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => {
                                  setCurrentPage(pageNumber);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                                className={`w-10 h-10 rounded-sm border font-bold transition ${
                                  currentPage === pageNumber
                                    ? "bg-primary text-white border-primary"
                                    : "border-primary text-primary bg-white"
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          }
                          // Hiển thị dấu ba chấm
                          if (pageNumber === 4 && totalPages > 5) {
                            return (
                              <span
                                key="dots"
                                className="w-10 h-10 flex items-end justify-center text-[#A5200B] font-bold"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center border border-primary rounded-lg disabled:opacity-30 transition"
                  >
                    <span
                      className={`text-xl ${currentPage === totalPages ? "text-gray-400" : "text-primary"}`}
                    >
                      ❯
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Enhanced Empty State */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🧭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Không tìm thấy kết quả phù hợp
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Hãy thử thêm điều kiện tìm kiếm khác hoặc xóa một số bộ lọc để
                xem thêm ưu đãi.
              </p>
              <button
                onClick={() =>
                  handleFilterChange({
                    province: "All",
                    type: "all",
                    priceRange: "all",
                    minRating: 0,
                    minPrice: 0,
                    maxPrice: 999999999,
                  })
                }
                className="bg-[#A5200B] hover:bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

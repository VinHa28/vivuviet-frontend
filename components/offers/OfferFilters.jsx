"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import Image from "next/image";

export default function OfferFilters({
  onFilterChange,
  provinces,
  initialFilters = null,
}) {
  // Add icon paths so the service buttons match the tab titles in ServiceSection
  const serviceTypes = [
    { value: "all", label: "Tất cả", icon: "/icons/Vector.svg" },
    { value: "tour", label: "Tour du lịch", icon: "/icons/tabler_beach.svg" },
    {
      value: "hotel",
      label: "Khách sạn",
      icon: "/icons/mingcute_hotel-line.svg",
    },
    { value: "restaurant", label: "Nhà hàng", icon: "/icons/tabler_beach.svg" },
    {
      value: "transport",
      label: "Vận chuyển",
      icon: "/icons/tdesign_vehicle.svg",
    },
    { value: "experience", label: "Trải nghiệm", icon: "/icons/Vector.svg" },
    { value: "homestay", label: "Homstay", icon: "/icons/Vector.svg" },
    { value: "other", label: "Khác", icon: "/icons/tabler_beach.svg" },
  ];

  const priceRanges = [
    { value: "all", label: "Tất cả mức giá", min: 0, max: 999999999 },
    { value: "under-500k", label: "Dưới 500K", min: 0, max: 500000 },
    { value: "500k-1m", label: "500K - 1M", min: 500000, max: 1000000 },
    { value: "1m-3m", label: "1M - 3M", min: 1000000, max: 3000000 },
    { value: "over-3m", label: "Trên 3M", min: 3000000, max: 999999999 },
  ];

  // Initialize state from initialFilters if provided
  const [selectedProvince, setSelectedProvince] = useState(
    initialFilters?.province || "All",
  );
  const [selectedType, setSelectedType] = useState(
    initialFilters?.type || "all",
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    initialFilters?.priceRange || "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState(provinces);

  // Note: component state is initialized from `initialFilters` via useState above.
  // If `initialFilters` needs to dynamically update the controls later, we can
  // re-introduce a controlled sync effect that compares previous values first.

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      setFilteredProvinces(
        provinces.filter((province) =>
          province.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setFilteredProvinces(provinces);
    }
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    updateFilters({ province });
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    updateFilters({ type });
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    const selectedRange = priceRanges.find((r) => r.value === range);
    updateFilters({
      priceRange: range,
      minPrice: selectedRange?.min || 0,
      maxPrice: selectedRange?.max || 999999999,
    });
  };

  const updateFilters = (newFilter) => {
    const filters = {
      province: selectedProvince,
      type: selectedType,
      priceRange: selectedPriceRange,
      ...newFilter,
    };
    onFilterChange(filters);
  };

  const handleReset = () => {
    setSelectedProvince("All");
    setSelectedType("all");
    setSelectedPriceRange("all");
    setSearchTerm("");
    onFilterChange({
      province: "All",
      type: "all",
      priceRange: "all",
      minPrice: 0,
      maxPrice: 999999999,
    });
  };

  return (
    <div className="w-[320px] bg-white h-fit">
      {/* Header */}
      <div className="bg-primary p-2.5 rounded-t-lg text-white flex justify-between items-center">
        <h2 className="font-medium text-lg flex items-center gap-2">
          Bộ lọc tìm kiếm
        </h2>
      </div>

      <div className="p-5 space-y-8 border border-primary rounded-b-lg">
        {/* 1. Loại dịch vụ */}
        <div>
          <h3 className="text-[20px] font-medium text-text-primary mb-4 flex items-center gap-2">
            <span className="w-1 h-6.5 bg-secondary "></span>
            Loại dịch vụ
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {serviceTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleTypeChange(type.value)}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-left ${
                  selectedType === type.value
                    ? "text-red-600 border-b-2 border-red-600 pb-2"
                    : "text-gray-600 hover:text-black border-b-2 border-transparent"
                }`}
              >
                {type.icon && (
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src={type.icon}
                      alt={type.label}
                      fill
                      className="object-contain"
                      style={{
                        filter:
                          selectedType === type.value
                            ? "invert(26%) sepia(76%) saturate(1831%) hue-rotate(347deg) brightness(99%) contrast(101%)"
                            : "grayscale(100%) opacity(0.7)",
                      }}
                    />
                  </div>
                )}
                <span className="truncate">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Địa điểm */}
        <div>
          <h3 className="text-[20px] font-medium text-text-primary mb-4 flex items-center gap-2">
            <span className="w-1 h-6.5 bg-secondary "></span>
            Địa điểm
          </h3>
          <div className="relative mb-3">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Nhập tỉnh thành..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-secondary outline-none transition-all"
            />
          </div>

          {selectedProvince !== "All" && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium">
                {selectedProvince}
                <button
                  onClick={() => handleProvinceSelect("All")}
                  className="hover:text-secondary"
                >
                  <X size={14} />
                </button>
              </span>
            </div>
          )}

          {(searchTerm || selectedProvince === "All") && (
            <div className="max-h-37.5 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-1">
                {filteredProvinces.slice(0, 10).map((province) => (
                  <button
                    key={province}
                    onClick={() => handleProvinceSelect(province)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      selectedProvince === province
                        ? "bg-gray-50 text-primary font-bold"
                        : "hover:bg-gray-50 text-text-secondary"
                    }`}
                  >
                    {province}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Khoảng giá */}
        <div>
          <h3 className="text-[20px] font-medium text-text-primary mb-4 flex items-center gap-2">
            <span className="w-1 h-6.5 bg-secondary "></span>
            Mức giá mong muốn
          </h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => handlePriceRangeChange(range.value)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all border ${
                  selectedPriceRange === range.value
                    ? "bg-primary border-primary text-white font-bold shadow-md"
                    : "bg-white border-gray-200 text-text-primary hover:bg-gray-50"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nút Xóa bộ lọc */}
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleReset}
            className="w-full py-3 text-sm font-bold text-text-secondary hover:text-red-500  transition-colors flex items-center justify-center gap-2"
          >
            Làm mới bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}

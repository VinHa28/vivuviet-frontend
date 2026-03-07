"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AutocompleteInput from "@/components/ui/AutocompleteInput";
import { provinces } from "@/mock/offers";

const ServiceSection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tours");
  const [searchInputs, setSearchInputs] = useState({
    hotels: { location: "", checkIn: "", checkOut: "", rooms: "1" },
    transport: { from: "", to: "", date: "", ticketType: "one-way" },
    tours: { destination: "", date: "", group: "", budget: "" },
    culture: { location: "", date: "", tourType: "", count: "" },
    activities: { type: "", location: "", date: "", level: "" },
  });

  const tabs = [
    {
      id: "hotels",
      label: "Khách sạn",
      icon: "/icons/mingcute_hotel-line.svg",
    },
    {
      id: "transport",
      label: "Phương tiện",
      icon: "/icons/tdesign_vehicle.svg",
    },
    { id: "tours", label: "Tour du lịch", icon: "/icons/tabler_beach.svg" },
    { id: "culture", label: "Du lịch văn hóa", icon: "/icons/Vector.svg" },
    { id: "activities", label: "Hoạt động khác" },
  ];

  const serviceTypeMap = {
    tours: "tour",
    hotels: "hotel",
    transport: "transport",
    culture: "experience",
    activities: "experience",
  };

  const budgetMap = {
    "under-500k": { min: 0, max: 500000 },
    "500k-1m": { min: 500000, max: 1000000 },
    "1m-3m": { min: 1000000, max: 3000000 },
    "over-3m": { min: 3000000, max: 999999999 },
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Map service type to offer type
    const offerType = serviceTypeMap[activeTab] || "all";
    params.append("type", offerType);

    // Add destination/location based on tab
    const currentInputs = searchInputs[activeTab];
    let destinationValue = null;

    if (currentInputs.destination) {
      destinationValue = currentInputs.destination.trim();
    } else if (currentInputs.location) {
      destinationValue = currentInputs.location.trim();
    } else if (currentInputs.to) {
      destinationValue = currentInputs.to.trim();
    }

    // Only append province if a destination was provided
    if (destinationValue) {
      params.append("province", destinationValue);
    } else {
      params.append("province", "All");
    }

    // Add price range if budget selected
    if (currentInputs.budget && budgetMap[currentInputs.budget]) {
      const { min, max } = budgetMap[currentInputs.budget];
      params.append("minPrice", min);
      params.append("maxPrice", max);
      params.append("priceRange", currentInputs.budget);
    }

    // Redirect to offers page with params
    router.push(`/offers?${params.toString()}`);
  };

  const handleInputChange = (key, value) => {
    setSearchInputs((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [key]: value,
      },
    }));
  };

  const services = {
    hotels: [
      {
        id: 1,
        question: "Bạn muốn ở đâu?",
        description: "Chọn thành phố hoặc điểm đến",
      },
      { id: 2, question: "Ngày nhận phòng", description: "Chọn ngày" },
      { id: 3, question: "Ngày trả phòng", description: "Chọn ngày" },
      { id: 4, question: "Phòng & Khách", description: "1 phòng, 1 khách" },
    ],
    transport: [
      { id: 1, question: "Điểm khởi hành", description: "Chọn nơi bắt đầu" },
      { id: 2, question: "Điểm đến", description: "Bạn muốn đi đâu?" },
      { id: 3, question: "Ngày khởi hành", description: "Chọn ngày" },
      { id: 4, question: "Loại vé", description: "Một chiều hoặc khứ hồi" },
    ],
    tours: [
      {
        id: 1,
        question: "Bạn muốn đi đâu ?",
        description: "Khám phá cuộc phiêu lưu tiếp theo của bạn - Tìm điểm đến",
      },
      { id: 2, question: "Bao giờ bạn đi?", description: "T5, ngày 6/11/2025" },
      { id: 3, question: "Bạn đi cùng ai?", description: "Gia đình" },
      { id: 4, question: "Ngân sách", description: "Chọn mức giá" },
    ],
    culture: [
      {
        id: 1,
        question: "Địa điểm văn hóa",
        description: "Chọn di tích hoặc bảo tàng",
      },
      { id: 2, question: "Ngày tham quan", description: "Chọn ngày" },
      {
        id: 3,
        question: "Loại tour",
        description: "Có hướng dẫn viên hoặc tự do",
      },
      {
        id: 4,
        question: "Số lượng người",
        description: "Chọn số người tham gia",
      },
    ],
    activities: [
      {
        id: 1,
        question: "Loại hoạt động",
        description: "Thể thao, mạo hiểm, giải trí...",
      },
      { id: 2, question: "Địa điểm", description: "Chọn nơi muốn tham gia" },
      { id: 3, question: "Ngày tham gia", description: "Chọn ngày" },
      { id: 4, question: "Cấp độ", description: "Sơ cấp, trung cấp, nâng cao" },
    ],
  };

  return (
    <section className="mt-15 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-start gap-10 border-b border-gray-100 mb-0 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 text-[15px] font-medium transition-all relative group ${
                activeTab === tab.id
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-black border-b-2 border-transparent"
              }`}
            >
              {tab.icon && (
                <div className="relative w-5 h-5">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    fill
                    className={`object-contain ${
                      activeTab !== tab.id
                        ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-0"
                        : ""
                    }`}
                    style={{
                      filter:
                        activeTab === tab.id
                          ? "invert(26%) sepia(76%) saturate(1831%) hue-rotate(347deg) brightness(99%) contrast(101%)"
                          : "none",
                    }}
                  />
                </div>
              )}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 2. Search Bar Container */}
        <div className="relative mt-6 bg-white flex items-center py-2 px-2 gap-2">
          {activeTab === "tours" && (
            <>
              {/* Destination Autocomplete */}
              <AutocompleteInput
                label="Bạn muốn đi đâu?"
                placeholder="Khám phá cuộc phiêu lưu tiếp theo"
                value={searchInputs.tours.destination}
                onChange={(value) => handleInputChange("destination", value)}
                options={provinces.filter((p) => p !== "All")}
              />
              <div className="h-8 w-px bg-gray-200"></div>

              {/* Date Input */}
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Bao giờ bạn đi?
                </h3>
                <input
                  type="date"
                  value={searchInputs.tours.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                />
              </div>
              <div className="h-8 w-px bg-gray-200"></div>

              {/* Group Input */}
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Bạn đi cùng ai?
                </h3>
                <select
                  value={searchInputs.tours.group}
                  onChange={(e) => handleInputChange("group", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                >
                  <option value="">-- Chọn --</option>
                  <option value="family">Gia đình</option>
                  <option value="friends">Bạn bè</option>
                  <option value="couple">Đôi</option>
                  <option value="solo">Một mình</option>
                </select>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>

              {/* Budget Input */}
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Ngân sách
                </h3>
                <select
                  value={searchInputs.tours.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                >
                  <option value="">-- Tất cả --</option>
                  <option value="under-500k">Dưới 500K</option>
                  <option value="500k-1m">500K - 1M</option>
                  <option value="1m-3m">1M - 3M</option>
                  <option value="over-3m">Trên 3M</option>
                </select>
              </div>
            </>
          )}

          {activeTab === "hotels" && (
            <>
              <AutocompleteInput
                label="Bạn muốn ở đâu?"
                placeholder="Chọn thành phố hoặc điểm đến"
                value={searchInputs.hotels.location}
                onChange={(value) => handleInputChange("location", value)}
                options={provinces.filter((p) => p !== "All")}
              />
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Ngày nhận
                </h3>
                <input
                  type="date"
                  value={searchInputs.hotels.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                />
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Ngày trả
                </h3>
                <input
                  type="date"
                  value={searchInputs.hotels.checkOut}
                  onChange={(e) =>
                    handleInputChange("checkOut", e.target.value)
                  }
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                />
              </div>
            </>
          )}

          {activeTab === "transport" && (
            <>
              <AutocompleteInput
                label="Khởi hành từ"
                placeholder="Nơi bắt đầu"
                value={searchInputs.transport.from}
                onChange={(value) => handleInputChange("from", value)}
                options={provinces.filter((p) => p !== "All")}
              />
              <div className="h-8 w-px bg-gray-200"></div>
              <AutocompleteInput
                label="Điểm đến"
                placeholder="Bạn muốn đi đâu?"
                value={searchInputs.transport.to}
                onChange={(value) => handleInputChange("to", value)}
                options={provinces.filter((p) => p !== "All")}
              />
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Ngày khởi hành
                </h3>
                <input
                  type="date"
                  value={searchInputs.transport.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                />
              </div>
            </>
          )}

          {activeTab === "culture" && (
            <>
              <AutocompleteInput
                label="Địa điểm văn hóa"
                placeholder="Chọn di tích hoặc bảo tàng"
                value={searchInputs.culture.location}
                onChange={(value) => handleInputChange("location", value)}
                options={provinces.filter((p) => p !== "All")}
              />
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Ngày tham quan
                </h3>
                <input
                  type="date"
                  value={searchInputs.culture.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                />
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Số lượng người
                </h3>
                <input
                  type="number"
                  min="1"
                  value={searchInputs.culture.count}
                  onChange={(e) => handleInputChange("count", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                />
              </div>
            </>
          )}

          {activeTab === "activities" && (
            <>
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Loại hoạt động
                </h3>
                <select
                  value={searchInputs.activities.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="sports">Thể thao</option>
                  <option value="adventure">Mạo hiểm</option>
                  <option value="entertainment">Giải trí</option>
                </select>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <AutocompleteInput
                label="Địa điểm"
                placeholder="Chọn nơi muốn tham gia"
                value={searchInputs.activities.location}
                onChange={(value) => handleInputChange("location", value)}
                options={provinces.filter((p) => p !== "All")}
              />
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 px-4 py-3">
                <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                  Ngày tham gia
                </h3>
                <input
                  type="date"
                  value={searchInputs.activities.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="text-[13px] text-gray-500 bg-transparent outline-none w-full"
                />
              </div>
            </>
          )}

          <button
            onClick={handleSearch}
            className="cursor-pointer w-12 h-12 ml-2 bg-primary hover:bg-secondary text-white p-4 rounded-tl-[10px] rounded-br-[10px] rounded-bl-[5px] rounded-tr-[5px] transition-all shadow-md flex items-center justify-center"
          >
            <Search size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;

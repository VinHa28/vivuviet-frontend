"use client";
import Province from "@/components/maps/Province";
import { provinces } from "@/mock/provinces";
import React, { useState } from "react";

export default function VietnamMaps({ setActiveProvince }) {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    name: "",
  });

  const hanldeMouseMove = (e, provinceId, provinceName) => {
    setTooltip({
      visible: true,
      x: e.pageX + 12,
      y: e.clientY + 12,
      name: provinceName,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="maps relative">
      {tooltip.visible && (
        <div
          className="fixed bg-black text-white text-xs px-2 py-1 rounded pointer-events-none z-50 "
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="570"
        height="555"
        viewBox="0 0 570 555"
        fill="none"
        role="img"
        aria-label="Bản đồ các tỉnh thành Việt Nam"
      >
        {provinces.map((province) => (
          <Province
            key={province.slug}
            province={province}
            onProvinceLeave={handleMouseLeave}
            onProvinceHover={hanldeMouseMove}
            setActiveProvince={setActiveProvince}
          />
        ))}
      </svg>
    </div>
  );
}

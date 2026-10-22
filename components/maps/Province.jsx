import React from "react";

export default function Province({
  onProvinceHover,
  onProvinceLeave,
  setActiveProvince,
  province,
}) {
  return (
    <path
      d={province.pathSvg}
      fill={province.fill}
      fillOpacity={province.fillOpacity}
      stroke="#5D5D5D"
      strokeWidth="0.4"
      strokeLinejoin="round"
      id={province.slug}
      data-name={province.name}
      className={`province ${province.active ? "active" : ""}`}
      onMouseMove={(e) => onProvinceHover(e, province.slug, province.name)}
      onMouseLeave={onProvinceLeave}
      onClick={() => setActiveProvince(province)}
    />
  );
}

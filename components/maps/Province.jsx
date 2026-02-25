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
      id={province.slug}
      data-name={province.name}
      className={`province ${province.active ? "active" : ""}`}
      onMouseMove={(e) => onProvinceHover(e, province.slug, province.name)}
      onMouseLeave={onProvinceLeave}
      onClick={() => setActiveProvince(province)}
    />
  );
}

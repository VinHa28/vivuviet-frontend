/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllPartnerPremium } from "@/services/partnerService";
import Link from "next/link";

export default function PartnersRow() {
  const containerRef = useRef(null);
  const [partners, setPartners] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const getPartnersPremium = async () => {
    try {
      const data = await getAllPartnerPremium();
      setPartners(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPartnersPremium();
  }, []);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    // Kiểm tra xem nội dung có dài hơn container không
    const hasOverflow = el.scrollWidth > el.clientWidth;
    setIsOverflowing(hasOverflow);

    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [partners]);

  // Xử lý kéo chuột
  const handleMouseDown = (e) => {
    if (!isOverflowing) return; // Nếu không tràn thì không cho kéo
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isOverflowing) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftState - walk;
    checkScroll();
  };

  const scrollByButton = (direction) => {
    const el = containerRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.6 * direction;
    el.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <div className="mb-6 select-none">
      <div className="relative group">
        {isOverflowing && canScrollLeft && (
          <button
            onClick={() => scrollByButton(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow-md border border-gray-100 transition-all hidden md:flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {isOverflowing && canScrollRight && (
          <button
            onClick={() => scrollByButton(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow-md border border-gray-100 transition-all hidden md:flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onScroll={checkScroll}
          className={`
            w-full overflow-x-auto flex gap-4 pb-4 px-2
            scrollbar-none scroll-smooth
            ${isOverflowing ? "cursor-grab active:cursor-grabbing justify-start" : "justify-center"}
          `}
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {partners.map((p) => (
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              key={p._id}
              className="min-w-[120px] md:min-w-[150px] shrink-0 bg-white border border-gray-50 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 relative">
                <Image
                  src={p.logo}
                  alt={p.businessName}
                  fill
                  sizes="64px"
                  className="object-contain"
                  draggable={false}
                />
              </div>

              <div className="text-[11px] md:text-xs text-center text-gray-500 font-medium uppercase">
                {p.businessName}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

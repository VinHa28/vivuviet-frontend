"use client";
import VietnamMaps from "@/components/maps/VietnamMaps";
import Button from "@/components/ui/Button";
import Link from "next/link";
import React, { useState } from "react";

export default function ExploreSection() {
  const [activeProvince, setActiveProvince] = useState(null);
  return (
    <section className="pt-40 -mt-22.5" id="explore">
      <div className="grid grid-cols-2">
        <div>
          <VietnamMaps setActiveProvince={setActiveProvince} />
        </div>
        <div>
          {activeProvince ? (
            <>
              <Button size="md" isButton={false} hoverable={false}>
                Khám Phá Việt Nam
              </Button>
              <h1 className="mt-5 text-[32px] text-text-primary w-120.5 leading-9 font-semibold">
                <span className="font-medium font-script-1 text-[48px] text-secondary">
                  {activeProvince.name}
                </span>
              </h1>
              <p className="mt-2.5 text-[20px] font-light text-text-secondary w-133">
                {activeProvince.shortDesc}
              </p>

              <Link
                href={`/destinations/${activeProvince.slug}`}
                className="mt-4 block text-blue-400 hover:opacity-75 hover:underline"
              >
                Khám phá ngay
              </Link>
            </>
          ) : (
            <>
              <Button size="md" isButton={false} hoverable={false}>
                Khám Phá Việt Nam
              </Button>
              <h1 className="mt-5 text-[32px] text-text-primary w-120.5 leading-9 font-semibold">
                Cùng{" "}
                <span className="font-medium font-script-1 text-[48px] text-secondary">
                  VivuViet
                </span>{" "}
                bắt đầu hành trình của bạn
              </h1>
              <p className="mt-2.5 text-[20px] font-light text-text-secondary w-133">
                Việt Nam là một đất nước đa dạng tuyệt vời, với vô vàn địa điểm
                hấp dẫn để khám phá. Những trải nghiệm tuyệt vời này là khởi đầu
                tuyệt vời để bạn lên kế hoạch cho chuyến đi của mình.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

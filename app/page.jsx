import VietnamMaps from "@/components/maps/VietnamMaps";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import ServiceSection from "@/components/home/ServiceSection";
import EventsSection from "@/components/home/EventsSection";
import ExploreSection from "@/components/home/ExploreSection";

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="mt-17.5">
        <div className="mx-auto flex justify-between gap-17">
          <div className="w-133">
            <Button size="md" isButton={false} hoverable={false}>
              Welcome to Vietnam
            </Button>

            <h1 className="mt-7.5 text-[36px] text-text-primary leading-9 font-semibold">
              Hãy để{" "}
              <span className="font-medium font-script-1 text-[54px] text-secondary">
                VivuViet
              </span>{" "}
              đưa bạn đến mọi miền đất nước
            </h1>

            <p className="mt-7.5 text-[20px] font-normal text-text-secondary">
              Cùng VivuViet lên kế hoạch cho chuyến đi — chọn điểm đến, tìm ưu
              đãi, và bắt đầu hành trình của bạn.
            </p>

            <div className="flex items-center gap-3.5 mt-5">
              <Link href="#explore">
                <Button>Khám phá ngay</Button>
              </Link>
              <Link href="/offers">
                <Button>Xem ưu đãi</Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-between w-[50%] relative">
            <div className="relative w-41.5 h-87.5 border-2 border-secondary">
              <Image
                src="/images/herro_1.jpg"
                alt="Vinh-Ha-Long"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="relative w-41.5 h-87.5 border-2 border-secondary mt-9.5">
              <Image
                src="/images/herro_2.jpg"
                alt="Vinh-Ha-Long"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="relative w-41.5 h-87.5 border-2 border-secondary mt-19">
              <Image
                src="/images/herro_3.jpg"
                alt="Vinh-Ha-Long"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-27.5 top-7.5 w-144.25 h-32.5">
              <Image
                src="/icons/plane_vector.svg"
                alt="plane icon"
                fill
                className="object-contain" 
              />
            </div>
          </div>
        </div>
      </section>
      {/* Service Section */}
      <ServiceSection />
      {/* Explores section*/}
      <ExploreSection />
      {/* Destinations */}
      <section className=" py-20">
        <div className=" mx-auto">
          {/* Title */}
          <Button
            size="md"
            isButton={false}
            hoverable={false}
            className="mb-8"
          >
            Địa điểm nổi bật
          </Button>

          <div className="grid grid-cols-3 grid-rows-[260px_200px_200px] gap-6">
            {/* Hạ Long – tall */}
            <DestinationCard
              name="Hạ Long"
              sub="Quảng Ninh"
              slug="quang-ninh"
              img="/images/ha_long.jpg"
              className="row-span-2"
            />
            {/* Nha Trang – wide */}
            <DestinationCard
              name="Nha Trang"
              sub="Khánh Hoà"
              slug="khanh-hoa"
              img="/images/nha_trang.jpg"
              className="col-span-2"
            />
            {/* Hội An */}
            <DestinationCard
              name="Hội An"
              sub="Đà Nẵng"
              slug="da-nang"
              img="/images/hoi_an.jpg"
            />

            {/* Hà Nội */}
            <DestinationCard
              name="Hà Nội"
              sub=""
              slug="ha-noi"
              img="/images/ha_noi.jpg"
            />

            {/* Tràng An */}
            <DestinationCard
              name="Tràng An"
              sub="Ninh Bình"
              slug="ninh-binh"
              img="/images/trang_an.jpg"
            />

            {/* Phú Quốc */}
            <DestinationCard
              name="Phú Quốc"
              sub="An Giang"
              slug="phu-quoc"
              img="/images/phu_quoc.jpg"
            />

            {/* Huế */}
            <DestinationCard
              name="Huế"
              sub=""
              slug="hue"
              img="/images/hue.jpg"
            />
          </div>
        </div>
      </section>

      {/* Events */}
      <EventsSection />
    </>
  );
}

function DestinationCard({ name, sub, img, slug, className = "" }) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className={`relative overflow-hidden rounded-2xl group ${className}`}
    >
      <Image
        src={img}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-all" />

      {/* text */}
      <div className="absolute bottom-5 left-5 text-white">
        <p className="font-script-2 text-[42px] leading-none">{name}</p>
        {sub && <span className="text-sm opacity-90">{sub}</span>}
      </div>
    </Link>
  );
}

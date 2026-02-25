import OffersSection from "@/components/offers/OffersSection";

export const metadata = {
  title: "Ưu đãi du lịch - VivuViet",
  description: "Khám phá các ưu đãi du lịch tuyệt vời với giảm giá lên đến 50%",
};

export default async function OffersPage({ searchParams }) {
  const params = await searchParams;
  // Parse URL search params
  const initialFilters = {
    province: params?.province || "All",
    type: params?.type || "all",
    priceRange: params?.priceRange || "all",
    minPrice: params?.minPrice ? parseInt(params.minPrice) : 0,
    maxPrice: params?.maxPrice ? parseInt(params.maxPrice) : 999999999,
  };

  return (
    <div className="container mx-auto ">
      <OffersSection initialFilters={initialFilters} />
    </div>
  );
}

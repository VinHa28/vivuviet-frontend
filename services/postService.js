import axiosClient from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// Dùng ở Server Component: trả null nếu 404, ném lỗi nếu lỗi khác
export const getDestinationServer = async (slug) => {
  const res = await fetch(`${API_URL}/destinations/${slug}`, {
    next: { revalidate: 300 }, // cache 5 phút, không gọi API mỗi lượt xem
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Destination API lỗi ${res.status}`);

  return res.json();
}

export const getDestinationDetail = async (slug) => {
  try {
    const data = await axiosClient.get(`/destinations/${slug}`);
    return data;
  } catch (error) {
    console.error("Get destination detail error:", error);
    throw error;
  }
};

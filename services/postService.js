import axiosClient from "@/lib/axios";

export const getDestinationDetail = async (slug) => {
  try {
    const data = await axiosClient.get(`/destinations/${slug}`);
    return data;
  } catch (error) {
    console.error("Get destination detail error:", error);
    throw error;
  }
};

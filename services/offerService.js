import axiosClient from "@/lib/axios";

export const getAllOffers = async () => {
  const res = await axiosClient.get("/services");
  return res.data || res;
};

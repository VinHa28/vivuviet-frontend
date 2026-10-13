import axiosClient from "@/lib/axios";

export const getDestinations = async () => {
  return axiosClient.get("/destinations");
};

export const getActiveDestinations = async () => {
  try {
    const response = await axiosClient.get("/destinations/active");
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

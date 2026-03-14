import axiosClient from "@/lib/axios";

export const getPartnerDashboard = async () => {
  try {
    const response = await axiosClient.get("/users/profiles");
    return response;
  } catch (error) {
    console.error("Dashboard API Error:", error);
    throw error;
  }
};

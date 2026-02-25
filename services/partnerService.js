import axiosClient from "@/lib/axios";

export const getMyPartnerRequest = async () => {
  const res = await axiosClient.get("/partners/my-request");
  return res.data || res;
};

export const getCurrentUserFromServer = async () => {
  const res = await axiosClient.get("/auth/me");
  return res.data || res;
};

export const getAllPartnerPremium = async () => {
  const res = await axiosClient.get("/users/premium");
  return res.data || res;
};

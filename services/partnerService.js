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

export const createPartnerServiceApi = async (serviceData) => {
  try {
    const response = await axiosClient.post("/services", serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axiosClient.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateService = async (id, data) => {
  const url = `/services/${id}`;
  try {
    const response = await axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getMyServicesApi = async () => {
  try {
    const res = await axiosClient.get("/services/my-services");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

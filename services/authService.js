import axiosClient from "@/lib/axios";

/**
 * Gọi API login
 * @param {Object} data { email, password }
 */
export const login = async (data) => {
  const res = await axiosClient.post("/auth/login", data);

  const responseData = res.data || res;
  const { token, user } = responseData;

  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
};

/**
 * Gọi API register partner
 * @param {Object} data { email, password, businessName, phone, website, fanpage, partnerTier }
 */
export const registerPartner = async (data) => {
  const res = await axiosClient.post("/auth/register-partner", data);
  return res;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const updateUserInStorage = (userData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

/* ================= REQUEST INTERCEPTOR ================= */
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("Axios error:", error);
    if (error.response) {
      const { status, data } = error.response;

      // Handle unauthorized - token invalid or expired
      if (status === 401 && typeof window !== "undefined") {
        // Không redirect nếu đang gọi API login
        const isLoginRequest = error.config?.url?.includes("/auth/login");

        if (!isLoginRequest) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/";
        }
      }

      // Return error with proper structure
      console.error("Response error data:", data);
      return Promise.reject(data || { message: "Request failed" });
    }

    // Network error
    if (error.code === "ECONNABORTED") {
      return Promise.reject({ message: "Request timeout. Please try again." });
    }

    if (error.message === "Network Error" || !error.response) {
      return Promise.reject({
        message:
          "Network error - check if backend is running on http://localhost:5000",
        originalError: error.message,
      });
    }

    return Promise.reject({ message: error.message || "Network error" });
  },
);

export default axiosClient;

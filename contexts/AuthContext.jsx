"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, updateUserInStorage } from "@/services/authService";
import axiosClient from "@/lib/axios";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
  refreshUser: () => {},
  showLoginModal: false,
  setShowLoginModal: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const refreshUser = async () => {
    try {
      const response = await axiosClient.get("/auth/me");

      if (response.user) {
        setUser(response.user);
        updateUserInStorage(response.user);
        return;
      }
    } catch (error) {
      console.error("Failed to refresh from server, using localStorage");
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    const init = async () => {
      if (user) {
        await refreshUser();
      }
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

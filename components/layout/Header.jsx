"use client";

import Logo from "@/components/ui/Logo";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { logout } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
const navItems = [
  {
    label: "Ưu đãi du lịch",
    url: "/offers",
    activePattern: "/offers",
  },
  {
    label: "Về chúng tôi",
    url: "/about",
    activePattern: "/about",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user: currentUser, setUser, setShowLoginModal } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setUser(null);
    setShowUserMenu(false);
    router.push("/");
  };
  if (!mounted) return null;
  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 h-22.5
        transition-all duration-500
        ${isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white"}
      `}
    >
      <div className="max-w-292.5 mx-auto w-full h-full flex justify-between items-center px-4">
        <Logo />

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`font-primary font-medium text-[16px] transition-colors ${
              pathname === "/" ? "text-primary" : "text-secondary"
            }`}
          >
            Sống trọn Việt Nam
          </Link>

          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.activePattern);

            return (
              <Link
                key={item.label}
                href={
                  item.url === "/destinations"
                    ? "/destinations/quang-ninh"
                    : item.url
                }
                className={`font-primary font-medium text-[16px] transition-colors hover:text-primary ${
                  isActive ? "text-primary font-bold" : "text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* User Menu or Login */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors cursor-pointer ${
                currentUser ? "hover:bg-gray-200" : ""
              }`}
            >
              {currentUser ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-semibold">
                    {currentUser.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-text-primary max-w-30 truncate">
                    {currentUser.businessName || currentUser.email}
                  </span>
                </>
              ) : (
                <>
                  <Image
                    src={"/images/menu.svg"}
                    alt="Menu"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
              >
                {currentUser ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {currentUser.businessName || "Tài khoản"}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {currentUser.email}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                          {currentUser.role === "admin"
                            ? "Quản trị"
                            : "Đối tác"}
                        </span>
                        {currentUser.isPartnerActive ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                            Đã duyệt
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                            Chờ duyệt
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={18} className="text-gray-600" />
                      <span className="text-sm text-text-primary">
                        Dashboard
                      </span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} className="text-red-600" />
                      <span className="text-sm text-red-600 font-medium">
                        Đăng xuất
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowLoginModal(true);
                      }}
                      className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <User size={18} className="text-secondary" />
                      <span className="text-sm font-medium text-text-primary">
                        Đăng nhập
                      </span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

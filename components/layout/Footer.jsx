"use client";
import Logo from "@/components/ui/Logo";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const { setShowLoginModal } = useAuth();

  return (
    <footer className="w-full bg-white pt-16 pb-10 ">
      <div className="max-w-292.5 mx-auto  grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col">
          <Logo />
          <p className="text-text-secondary text-[16px] font-primary mt-1.5">
            © 2025 VivuViet — Cùng bạn khám phá Việt Nam
          </p>
          <div className="flex gap-4 mt-11.25">
            <div className="p-2 bg-secondary text-white rounded-full cursor-pointer hover:bg-primary transition-all duration-250">
              <Youtube size={20} />
            </div>
            <div className="p-2 bg-secondary text-white rounded-full cursor-pointer hover:bg-primary transition-all duration-250">
              <Twitter size={20} fill="currentColor" />
            </div>
            <div className="p-2 bg-secondary text-white rounded-full cursor-pointer hover:bg-primary transition-all duration-250">
              <Link
                href={"https://www.facebook.com/profile.php?id=61586817304762"}
                target="_blank"
              >
                <Facebook size={20} fill="currentColor" />
              </Link>
            </div>
            <div className="p-2 bg-secondary text-white rounded-full cursor-pointer hover:bg-primary transition-all duration-250">
              <Instagram size={20} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-text-primary font-medium font-primary text-[20px] mb-6">
            Khám phá
          </h4>
          <ul className="flex flex-col gap-4 text-text-secondary font-primary">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                href="/offers"
                className="hover:text-primary transition-colors"
              >
                Ưu đãi
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Quick Links */}
        <div>
          <h4 className="text-text-primary font-medium font-primary text-[20px] mb-6">
            Liên kết nhanh
          </h4>
          <ul className="flex flex-col gap-4 text-text-secondary font-primary">
            <li>
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Đăng nhập
              </button>
            </li>
          </ul>
        </div>

        {/* Cột 4: Contact */}
        <div>
          <h4 className="text-text-primary font-medium font-primary text-[20px] mb-6">
            Liên hệ
          </h4>
          <ul className="flex flex-col gap-4 text-text-secondary font-primary">
            <li className="flex items-center gap-3">
              <MapPin size={20} className="text-text-primary" />
              <span>
                <strong className="text-text-primary">Address:</strong> Hà Nội,
                Việt Nam
              </span>
            </li>
            <li className="flex items-center gap-3 ">
              <Mail size={20} className="text-text-primary" />
              <span>
                <strong className="text-text-primary">Email:</strong>{" "}
                cheers.vivuviet@gmail.com
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-text-primary" />
              <span>
                <strong className="text-text-primary">Phone:</strong> 0981228204
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

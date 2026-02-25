"use client";

import { Phone, Mail, ChevronUp } from "lucide-react";
import Link from "next/link";
import { FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function FloatingChat() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
      {/* Call */}
      <Link
        href="tel:0975432353"
        className="w-12 h-12 rounded-full bg-[#a5190e] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        title="Gọi điện"
      >
        <Phone size={20} />
      </Link>

      {/* Email */}
      <Link
        href="mailto:thuydthe181836@fpt.edu.vn"
        className="w-12 h-12 rounded-full bg-[#a5190e] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        title="Email"
      >
        <Mail size={20} />
      </Link>

      {/* Zalo */}
      <Link
        href="https://zalo.me/0975432353"
        target="_blank"
        className="w-12 h-12 rounded-full bg-[#a5190e] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        title="Chat Zalo"
      >
        <SiZalo size={22} />
      </Link>

      {/* Facebook Messenger */}
      <Link
        href="https://www.facebook.com/profile.php?id=61586817304762"
        target="_blank"
        className="w-12 h-12 rounded-full bg-[#a5190e] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        title="Chat Facebook"
      >
        <FaFacebookMessenger size={22} />
      </Link>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-[#a5190e] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        title="Lên đầu trang"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

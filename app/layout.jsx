import { Alex_Brush, Island_Moments, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { AuthProvider } from "@/contexts/AuthContext";
import FloatingChat from "@/components/ui/FloatingChat";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"], // Thêm vietnamese để hiển thị tiếng Việt chuẩn
  variable: "--font-montserrat",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alex-brush",
  display: "swap",
});

const islandMoments = Island_Moments({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-island-moments",
  display: "swap",
});

// 1. Cấu hình Metadata chuẩn SEO
export const metadata = {
  title: {
    default: "VivuViet - Nền tảng du lịch và trải nghiệm văn hóa Việt Nam",
    template: "%s | VivuViet", // Giúp các trang con tự động nối thêm đuôi (VD: Hà Nội | VivuViet)
  },
  description: "Khám phá vẻ đẹp Việt Nam qua từng hành trình. VivuViet cung cấp thông tin du lịch, đặt tour và trải nghiệm văn hóa bản địa đặc sắc.",
  keywords: ["du lịch Việt Nam", "văn hóa Việt Nam", "đặt tour du lịch", "VivuViet"],
  metadataBase: new URL("https://vivuviet.info.vn"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VivuViet - Your Journey, Your Story",
    description: "Nền tảng du lịch và trải nghiệm văn hóa Việt Nam",
    url: "https://vivuviet.info.vn",
    siteName: "VivuViet",
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    // 2. Chuyển lang sang "vi" vì nội dung chính là tiếng Việt
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`
          ${montserrat.variable} 
          ${alexBrush.variable} 
          ${islandMoments.variable} 
          font-sans antialiased
        `}
      >
        <AuthProvider>
          <Header />
          {/* Tối ưu SEO: dùng thẻ <main> cho nội dung chính */}
          <main className="min-h-screen pt-22.5 max-w-292.5 mx-auto">
            {children}
          </main>
          <FloatingChat />
          <Footer />
          <LoginModal />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>

        <GoogleAnalytics gaId="G-E8KL2FNLM1" />
      </body>
    </html>
  );
}
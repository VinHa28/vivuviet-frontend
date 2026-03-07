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
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap", // Tối ưu load font
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

// Cấu hình Metadata chuẩn
export const metadata = {
  title: "VivuViet",
  description: "YOUR JOURNEY, YOUR STORY",
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable} 
          ${alexBrush.variable} 
          ${islandMoments.variable} 
          antialiased
        `}
      >
        <AuthProvider>
          <Header />
          <main className="pt-22.5 max-w-292.5 mx-auto">{children}</main>
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

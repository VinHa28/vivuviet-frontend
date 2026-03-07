import { Alex_Brush, Island_Moments, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { AuthProvider } from "@/contexts/AuthContext";
import FloatingChat from "@/components/ui/FloatingChat";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alex-brush",
});

const islandMoments = Island_Moments({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-island-moments",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable}
          ${alexBrush.variable}
          ${islandMoments.variable}
        `}
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-E8KL2FNLM1" />
        <Script id="google-analytics">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-E8KL2FNLM1');
    `}
        </Script>
        <AuthProvider>
          <Header />
          <main className="pt-[90px] max-w-[1170px] mx-auto">{children}</main>
          <FloatingChat />
          <Footer />
          <LoginModal />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId="G-E8KL2FNLM1" />
    </html>
  );
}

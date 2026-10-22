import AboutClient from "@/components/pages/AboutClient";

export const metadata = {
  title: "Về VivuViet",
  description:
    "VivuViet giúp bạn cảm nhận Việt Nam chậm rãi, chân thực và đầy cảm xúc. Tìm hiểu câu chuyện, giá trị và chương trình đối tác của chúng tôi.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
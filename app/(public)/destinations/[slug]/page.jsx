/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeroBanner from "@/components/destination/HeroBanner";
import Gallery from "@/components/destination/Gallery";
import RelatedArticles from "@/components/destination/RelatedArticles";
import TabNavigation from "@/components/destination/TabNavigation";
import MainLayout from "@/components/layout/MainLayout";
import Post from "@/components/destination/Post";
import { getDestinationDetail } from "@/services/postService";
import Button from "@/components/ui/Button";

export default function DestinationPage() {
  const params = useParams();
  const [destination, setDestination] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDestination = async (slug) => {
    try {
      const data = await getDestinationDetail(slug);
      setDestination(data);
      setCurrentPost(data.posts?.[0] || null);
    } catch (error) {
      console.error("Lỗi load destination:", error.message);
      setDestination(null);
      setCurrentPost(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (id) => {
    const post = destination.posts.find((p) => p.id === id);
    setCurrentPost(post);
  };

  useEffect(() => {
    if (params?.slug) {
      setLoading(true);
      fetchDestination(params.slug);
    }
  }, [params?.slug]);

  // 1. Trạng thái đang tải dữ liệu
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-primary text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  // 2. KIỂM TRA isActive: Nếu false thì hiển thị giao diện Coming Soon
  if (destination && destination.isActive === false) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h2 className="text-5xl font-bold text-primary mb-4 animate-pulse font-script-1">
          Coming Soon
        </h2>
        <p className="text-gray-600 text-lg max-w-md">
          Điểm đến{" "}
          <i className="font-medium text-primary">
            {destination.title || "**này**"}
          </i>{" "}
          đang được chúng tôi cập nhật nội dung. Vui lòng quay lại sau nhé!
        </p>
        <Button
          onClick={() => window.history.back()}
          className="mt-8 flex items-center justify-center"
        >
          Quay lại
        </Button>
      </div>
    );
  }

  // 3. Nếu không có dữ liệu hoặc không có bài viết
  if (!destination || !currentPost) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 font-primary">
        Không tìm thấy thông tin điểm đến.
      </div>
    );
  }

  return (
    <>
      <HeroBanner
        image={currentPost.banner?.image}
        alt={currentPost.banner?.alt}
        title={currentPost.banner?.title}
      />

      <TabNavigation
        posts={destination.posts}
        currentPost={currentPost}
        onTabChange={handleTabChange}
      />

      <MainLayout>
        <Post postContent={currentPost.content} />
        <Gallery images={currentPost.gallery} />
        <RelatedArticles articles={currentPost.relatedArticles} />
      </MainLayout>
    </>
  );
}

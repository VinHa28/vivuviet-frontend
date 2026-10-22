"use client";

import { useState } from "react";
import HeroBanner from "@/components/destination/HeroBanner";
import Gallery from "@/components/destination/Gallery";
import RelatedArticles from "@/components/destination/RelatedArticles";
import TabNavigation from "@/components/destination/TabNavigation";
import MainLayout from "@/components/layout/MainLayout";
import Post from "@/components/destination/Post";
import Button from "@/components/ui/Button";

export default function DestinationClient({ destination }) {
  const [currentPost, setCurrentPost] = useState(destination.posts?.[0] || null);

  const handleTabChange = (id) => {
    setCurrentPost(destination.posts.find((p) => p.id === id));
  };

  if (destination.isActive === false) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h2 className="text-5xl font-bold text-primary mb-4 animate-pulse font-script-1">
          Coming Soon
        </h2>
        <p className="text-gray-600 text-lg max-w-md">
          Điểm đến{" "}
          <i className="font-medium text-primary">{destination.title || "**này**"}</i>{" "}
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

  if (!currentPost) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 font-primary">
        Điểm đến này chưa có bài viết.
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
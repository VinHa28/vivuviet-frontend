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

  if (loading || !destination || !currentPost) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
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

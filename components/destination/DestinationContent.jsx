"use client";

import TabNavigation from "@/components/destination/TabNavigation";
import Gallery from "@/components/destination/Gallery";
import RelatedArticles from "@/components/destination/RelatedArticles";
import Post from "@/components/destination/Post";

export default function DestinationContent({ destination }) {
  return (
    <>
      <TabNavigation destination={destination} />

      <div className="space-y-16 py-12">
        <Post description={destination.introduction.description} />
        <Gallery images={destination.gallery} />
        <RelatedArticles articles={destination.relatedArticles} />
      </div>
    </>
  );
}

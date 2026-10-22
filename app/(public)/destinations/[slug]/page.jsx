import { cache } from "react";
import { notFound } from "next/navigation";
import DestinationClient from "@/components/pages/DestinationClient";
import { getDestinationServer } from "@/services/postService";

const getDestination = cache(getDestinationServer);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = await getDestination(slug);

  if (!destination) {
    return { title: "Không tìm thấy điểm đến", robots: { index: false } };
  }

  const title = destination.title || "Điểm đến du lịch";
  const post = destination.posts?.[0];

  const plainText = stripHtml(post?.content).substring(0, 160).trim();
  const description =
    plainText || `Khám phá những trải nghiệm tuyệt vời tại ${title}`;
  const imageUrl = post?.banner?.image || "/default-og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: `/destinations/${slug}` },
    robots: destination.isActive === false ? { index: false } : undefined,
    openGraph: {
      title: `${title} | VivuViet`,
      description,
      url: `/destinations/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      type: "article",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const destination = await getDestination(slug);

  if (!destination) notFound();

  return <DestinationClient destination={destination} />;
}

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}
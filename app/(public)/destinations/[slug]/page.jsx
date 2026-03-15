import DestinationClient from "@/components/pages/DestinationClient";
import { getDestinationDetail } from "@/services/postService";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const destination = await getDestinationDetail(slug);

    if (!destination) return { title: "Không tìm thấy điểm đến" };

    const title = destination.title || "Điểm đến du lịch";

    const description =
      destination.posts?.[0]?.content?.substring(0, 160) ||
      "Khám phá những trải nghiệm tuyệt vời tại " + title;

    const imageUrl =
      destination.posts?.[0]?.banner?.image || "/default-og-image.jpg";

    return {
      title,
      description,
      alternates: {
        canonical: `/destinations/${slug}`,
      },
      openGraph: {
        title: `${title} | VivuViet`,
        description,
        url: `https://vivuviet.info.vn/destinations/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "article",
      },
    };
  } catch {
    return { title: "Chi tiết điểm đến | VivuViet" };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;

  return <DestinationClient slug={slug} />;
}

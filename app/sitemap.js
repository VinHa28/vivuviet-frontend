const SITE_URL = "https://vivuviet.info.vn";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Các trang tĩnh. path "" nghĩa là trang chủ.
const staticPaths = ["", "/offers", "/about"];

// Slug lấy từ các DestinationCard ở trang chủ (app/page.jsx).
const fallbackSlugs = [
    "quang-ninh",
    "khanh-hoa",
    "da-nang",
    "ha-noi",
    "ninh-binh",
    "hue",
];

async function getDestinationSlugs() {
    try {
        const res = await fetch(`${API_URL}/destinations/active`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`API lỗi ${res.status}`);

        const list = await res.json();
        const codes = list.map((d) => d.code).filter(Boolean);

        // chỉ giữ điểm đến đã có ít nhất 1 bài viết
        const details = await Promise.all(
            codes.map((code) =>
                fetch(`${API_URL}/destinations/${code}`, { next: { revalidate: 3600 } })
                    .then((r) => (r.ok ? r.json() : null))
                    .catch(() => null),
            ),
        );

        return codes.filter((_, i) => details[i]?.posts?.length > 0);
    } catch (error) {
        console.error("Sitemap: dùng danh sách slug dự phòng.", error.message);
        return fallbackSlugs;
    }
}

export default async function sitemap() {
    const staticEntries = staticPaths.map((path) => ({
        url: `${SITE_URL}${path}`,
    }));

    const slugs = await getDestinationSlugs();
    const destinationEntries = slugs.map((slug) => ({
        url: `${SITE_URL}/destinations/${slug}`,
    }));

    return [...staticEntries, ...destinationEntries];
}
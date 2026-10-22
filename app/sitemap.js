const SITE_URL = "https://vivuviet.info.vn";

// Các trang tĩnh. path "" nghĩa là trang chủ.
// Kiểm tra lại với thư mục app/(public)/ xem còn trang nào khác không.
const staticPaths = ["", "/offers", "/about"];

// Slug lấy từ các DestinationCard ở trang chủ (app/page.jsx).
const destinationSlugs = [
    "quang-ninh",
    "khanh-hoa",
    "da-nang",
    "ha-noi",
    "ninh-binh",
    "hue",
];

export default function sitemap() {
    const staticEntries = staticPaths.map(path => ({
        url: `${SITE_URL}${path}`,
    }))

    const destinationEntries = destinationSlugs.map((slug) => ({
        url: `${SITE_URL}/destinations/${slug}`,
    }));

    return [...staticEntries, ...destinationEntries];
}
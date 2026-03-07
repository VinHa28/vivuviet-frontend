export const tierInfo = {
  basic: { name: "Gói 1 – Đối tác Cơ Bản", price: "Miễn phí" },
  standard: { name: "Gói 2 – Đối tác Nâng Cao", price: "Liên hệ" },
  premium: { name: "Gói 3 – Đối tác Chiến Lược", price: "79.000đ/tháng" },
};

export const plans = [
  {
    name: "Gói 1 – Đối tác Cơ Bản",
    price: "Miễn phí",
    tier: "basic",
    description:
      "Phù hợp với: quán ăn nhỏ, homestay, dịch vụ địa phương quy mô nhỏ.",
    features: [
      { text: "Tạo hồ sơ doanh nghiệp trên VivuViet", status: true },
      { text: "Đề xuất tour nhằm hỗ trợ quảng bá", status: true },
      { text: "Gắn link Website / Fanpage Facebook", status: true },
      { text: "Điều hướng khách về kênh riêng", status: true },
      { text: "Marketing nội dung hệ thống", status: false },
      { text: "Tài khoản quản trị bài viết", status: false },
    ],
    cta: "Bắt đầu ngay",
    popular: false,
  },
  {
    name: "Gói 2 – Đối tác Nâng Cao",
    price: "Liên hệ",
    tier: "standard",
    description:
      "Phù hợp với: nhà hàng, khách sạn, đơn vị tour muốn quảng bá mạnh.",
    features: [
      { text: "Bao gồm toàn bộ quyền lợi Gói 1", status: true },
      { text: "Xuất hiện trong các bài viết địa điểm", status: true },
      { text: "Đề xuất nổi bật trong bài tổng hợp", status: true },
      { text: "Ưu tiên hiển thị tại địa phương", status: true },
      { text: "Tự quản lý cập nhật thông tin", status: false },
      { text: "Tài khoản quản trị bài viết", status: false },
    ],
    cta: "Đăng ký ngay",
    popular: false,
  },
  {
    name: "Gói 3 – Đối tác Chiến Lược",
    price: "79.000đ/tháng",
    tier: "premium",
    description:
      "Phù hợp với: chuỗi khách sạn, công ty tour, doanh nghiệp lâu dài.",
    features: [
      { text: "Bao gồm toàn bộ quyền lợi Gói 2", status: true },
      { text: "Cấp tài khoản quản trị hệ thống", status: true },
      { text: "Tự tạo và cập nhật bài giới thiệu", status: true },
      { text: "Quyền đề xuất bài viết lên trang chủ", status: true },
      { text: "Gắn sản phẩm/dịch vụ trực tiếp", status: true },
      { text: "Hỗ trợ kiểm duyệt ưu tiên", status: true },
    ],
    cta: "Đăng ký ngay",
    popular: true,
  },
];

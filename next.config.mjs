/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Tối ưu build cho Docker / Deployment */
  output: "standalone",

  /* Luôn đặt <title>/<meta> trong <head> cho mọi client (mặc định Next stream metadata xuống <body>
     với trình duyệt/bot chạy được JS), để crawler không chạy JS và Lighthouse đều thấy. */
  htmlLimitedBots: /.*/,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // giới hạn pathname: "/vinhhv28/**" nếu chỉ muốn dùng ảnh từ account của mình
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

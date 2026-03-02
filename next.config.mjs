/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Tối ưu build cho Docker / Deployment */
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        //  giới hạn pathname: "/vinhhv28/**" nếu chỉ muốn dùng ảnh từ account của mình
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

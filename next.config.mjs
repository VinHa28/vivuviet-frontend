/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Thêm dòng này để tối ưu build cho Docker */
  output: "standalone",

  images: {
    domains: [
      "lehoi.kienthuckhoahoc.org",
      "image.plo.vn",
      "phunuvietnam.mediacdn.vn",
      "diff.vn",
      "encrypted-tbn0.gstatic.com",
      "spencil.vn",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "q-xx.bstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "r-xx.bstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.baodantoc.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

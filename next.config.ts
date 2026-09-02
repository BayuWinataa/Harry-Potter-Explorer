import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Tailwind = atomic CSS, 8.7KB → inline biar render gak nunggu request CSS
    // Trade-off: returning visitors gak dapat cache CSS terpisah (cocok buat app ini)
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mitra.ac.in",
      },
    ],
  },
};

export default nextConfig;

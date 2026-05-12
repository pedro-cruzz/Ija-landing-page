import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fupai.org.br",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.itajubahardtech.com.br",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

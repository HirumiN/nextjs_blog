import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        // Izinkan semua domain yang menggunakan protokol https
        protocol: "https",
        hostname: "**",
      },
      {
        // Izinkan juga semua domain yang menggunakan http (opsional, jika perlu)
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
  },
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;

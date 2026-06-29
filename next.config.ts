import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const videoHeaders = [
      { key: "Accept-Ranges", value: "bytes" },
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      { key: "Content-Type", value: "video/mp4" },
    ];
    return [
      { source: "/lego/:file*.mp4", headers: videoHeaders },
      { source: "/otherbrands/:file*.mp4", headers: videoHeaders },
    ];
  },
};

export default nextConfig;

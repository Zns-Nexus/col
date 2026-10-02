import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/col-social-preview:version(.*).jpg",
      headers: [{ key: "Cache-Control", value: "public, max-age=60, s-maxage=60" }],
    }];
  },
};

export default nextConfig;

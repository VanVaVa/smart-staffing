import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["pg", "@prisma/adapter-pg"],
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;

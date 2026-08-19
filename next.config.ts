import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["pg", "@prisma/adapter-pg"],
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    qualities: [75, 90],
    imageSizes: [16, 32, 48, 64, 68, 96, 104, 128, 136, 256, 384],
  },
};

export default nextConfig;

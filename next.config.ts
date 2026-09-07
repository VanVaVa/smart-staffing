import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["pg", "@prisma/adapter-pg"],
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    deviceSizes: [640, 750, 802, 828, 900, 914, 956, 1080, 1168, 1200, 1260, 1528, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 68, 96, 104, 128, 136, 256, 384, 450, 472, 571],
  },
};

export default nextConfig;

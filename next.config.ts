import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/teletebib',
  assetPrefix: '/teletebib/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

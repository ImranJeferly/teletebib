import type { NextConfig } from "next";

// Check if we're building for GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Only use static export and basePath for GitHub Pages
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/teletebib',
    assetPrefix: '/teletebib/',
  }),
  images: {
    unoptimized: true,
  },
  // Ensure CSS is properly handled
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isPagesBuild = process.env.GITHUB_PAGES === "true";
const repo = "nudge-system-design-base";

const nextConfig: NextConfig = {
  output: isPagesBuild ? "export" : undefined,
  basePath: isPagesBuild ? `/${repo}` : undefined,
  assetPrefix: isPagesBuild ? `/${repo}/` : undefined,
  trailingSlash: isPagesBuild ? true : undefined,
  images: { unoptimized: true },
};

export default nextConfig;

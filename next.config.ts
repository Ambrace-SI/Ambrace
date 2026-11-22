import type { NextConfig } from "next";

// ambrace.in is plain files: `next build` writes the whole site to `out/`,
// which Vercel (or any static host) serves as it is. There is no server, so
// anything that needs one (image resizing, cache components) stays off.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // `/privacy` is written as `/privacy/index.html`, which every static host
  // serves without extra rewrite rules.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

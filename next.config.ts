import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react", "@radix-ui/react-accordion", "@radix-ui/react-dialog"],
  },
};

export default nextConfig;

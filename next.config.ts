import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react", "@radix-ui/react-accordion", "@radix-ui/react-dialog"],
  },
  async redirects() {
    return [
      {
        source: "/blueprints",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/blueprints/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/approach",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/approach/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/insights/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/start-your-pilot",
        destination: "/book",
        permanent: true,
      },
      {
        source: "/start-your-pilot/:path*",
        destination: "/book",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import { withContentlayer } from "next-contentlayer2";
import createNextIntlPlugin from "next-intl/plugin";
import nextPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

import("./env.mjs");

const disablePWA = process.env.DISABLE_PWA === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "unavatar.io",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "email-attachment.wr.do",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "wr.do",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  experimental: {
    outputFileTracingExcludes: {
      "next-server": [
        "node_modules/@swc/core*/**/*",
        "node_modules/@esbuild/**/*",
        "node_modules/esbuild/**/*",
        "node_modules/webpack/**/*",
        "node_modules/terser/**/*",
        "node_modules/terser-webpack-plugin/**/*",
        "node_modules/sass/**/*",
      ],
    },
    serverComponentsExternalPackages: [
      "@auth/prisma-adapter",
      "@aws-sdk/client-s3",
      "@aws-sdk/s3-request-presigner",
      "@getbrevo/brevo",
      "@prisma/client",
      "cheerio",
      "lucide-static",
      "turndown",
      "ua-parser-js",
    ],
    // serverActions: {
    //   allowedOrigins: ["localhost:3000", process.env.NEXT_PUBLIC_APP_URL],
    // },
  },
  rewrites() {
    return [
      {
        source: "/logo.png",
        destination: "/_static/logo-192.png",
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/s",
        destination: "/",
        permanent: true,
      },
      {
        source: "/docs/developer",
        destination: "/docs/developer/installation",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://wr.do/s/x",
        permanent: true,
      },
    ];
  },
};

const withPWA = nextPWA({
  dest: "public",
  disable: disablePWA,
});

export default withContentlayer(withPWA(withNextIntl(nextConfig)));

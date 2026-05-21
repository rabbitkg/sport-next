/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "**"
      },
{ protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.ibb.co.com" },
      { protocol: "https", hostname: "**.ibb.co" },
      { hostname: "flagcdn.com" },
    ],
    minimumCacheTTL: 60,
  }
};

export default nextConfig;

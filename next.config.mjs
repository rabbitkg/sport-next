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

    ]
  }
};

export default nextConfig;

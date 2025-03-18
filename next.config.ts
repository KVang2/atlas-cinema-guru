/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Ensures Next.js does not optimize public images
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Crucial for EXE build
  images: { unoptimized: true }, // Required for static export
  trailingSlash: true,
};

export default nextConfig;


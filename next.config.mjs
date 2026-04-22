/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Creates the 'out' folder for Electron
  images: { unoptimized: true }, // Fixes image loading in EXE
  trailingSlash: true,       // Fixes page routing on Windows
  distDir: 'out',            // Ensures the output folder is named 'out'
};

export default nextConfig;

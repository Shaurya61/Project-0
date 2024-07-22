/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
      // You can modify the config here if needed
      return config; // Ensure the config object is returned
  }
}

module.exports = nextConfig;

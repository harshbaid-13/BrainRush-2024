/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "see.fontimg.com",
      "user-images.githubusercontent.com",
      "api.qrserver.com",
      "res.cloudinary.com",
      "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name",
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;

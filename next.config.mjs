/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*'],
  },
  env: {
    API_URL: process.env.API_URL,
    API_PLAYER: process.env.API_PLAYER
  },
};

export default nextConfig;

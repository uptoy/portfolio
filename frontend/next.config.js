/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['placehold.jp', 'swiperjs.com', 'res.cloudinary.com']
  }
}

module.exports = nextConfig

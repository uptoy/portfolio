/** @type {import('next').NextConfig} */
require('dotenv').config({ path: `./.env.${process.env.ENVIRONMENT}` })
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


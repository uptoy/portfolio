/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placehold.jp", "swiperjs.com", "res.cloudinary.com", "jsonplaceholder.typicode.com"],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  images: {
    domains: ['64.media.tumblr.com', 'encrypted-tbn0.gstatic.com'] // Agrega aquí los dominios de las imágenes que deseas usar
  }
}

module.exports = nextConfig

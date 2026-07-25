/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  typescript: {
    // ⚠️ Apenas para desenvolvimento - não faça isso em produção
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Apenas para desenvolvimento
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

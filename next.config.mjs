/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Autorise les médias servis par le backend Django (logo, slider, galerie…)
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/media/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/media/**' },
    ],
  },
};

export default nextConfig;

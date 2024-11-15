// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*', // Proxy to Backend
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn-icons-png.flaticon.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'www.clker.com',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  
  
  
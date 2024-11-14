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
        unoptimized:true,
        domains:['fonts.googleapis.com','www.clker.com']
    }
  };
  
  export default nextConfig;
  
  
  
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*',
          port: '',
          pathname: '/images.pexels.com',
        },
        {
          protocol: 'https',
          hostname: '*',
          port: ''
        },
      ],
    },
  };
  
  export default nextConfig;
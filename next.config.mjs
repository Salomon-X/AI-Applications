/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        // Exclude onnxruntime-node from the server-side bundle
        config.externals = [...config.externals, 'onnxruntime-node'];
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  
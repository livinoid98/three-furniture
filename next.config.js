/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(gltf|glb)$/,
        use: {
          loader: 'file-loader'
        }
      });
  
      return config;
    }
};


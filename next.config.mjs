/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== enables static exports,
    distDir: 'docs',
    reactStrictMode: true,
  };
  

export default nextConfig;

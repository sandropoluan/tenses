/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "",
    output: "export",  // <=== enables static exports,
    distDir: 'docs',
    reactStrictMode: true,
  };
  

export default nextConfig;

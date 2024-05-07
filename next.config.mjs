/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/tenses",
    output: "export",  // <=== enables static exports,
    distDir: 'out',
    reactStrictMode: true,
  };
  

export default nextConfig;

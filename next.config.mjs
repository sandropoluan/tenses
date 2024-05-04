/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/tenses",
    output: "export",  // <=== enables static exports,
    distDir: 'docs',
    reactStrictMode: true,
  };
  

export default nextConfig;

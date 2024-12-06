/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // add strict
  // async redirects() {
  //   return [
  //     {
  //       source: "/success",
  //       destination: "/success",
  //       permanent: true,
  //     },
  //     {
  //       source: "/forgot",
  //       destination: "/forgot",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;

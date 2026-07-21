import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

// next.config.js
module.exports = {
  allowedDevOrigins: ['tattvatech.co.in'],
}
export default nextConfig;

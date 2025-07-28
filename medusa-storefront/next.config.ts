import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com"],
  },
}

export default nextConfig


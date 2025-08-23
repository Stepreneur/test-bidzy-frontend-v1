import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',     // สำหรับรูปภาพจาก Cloudinary
      'profile.line-scdn.net',   // สำหรับรูปโปรไฟล์จาก LINE
    ],
  },
};

export default nextConfig;

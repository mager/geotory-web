/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{
      protocol: "https",
      "hostname": "lh3.googleusercontent.com"
    }, {
      protocol: "https",
      "hostname": "vercel.com"
    }, {
      protocol: "https",
      "hostname": "avatars.githubusercontent.com"
    }, {
      protocol: "https",
      "hostname": "raw.githubusercontent.com"
    }],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/mager/geotory-web",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

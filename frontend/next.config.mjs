import { paraglide } from "@inlang/paraglide-next/plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ hostname: "**", pathname: "**", protocol: "https" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
      // {
      //   source: "/:path*",
      //   headers: [
      //     { key: "Access-Control-Allow-Credentials", value: "true" },
      //     { key: "Access-Control-Allow-Origin", value: "*" },
      //     {
      //       key: "Access-Control-Allow-Methods",
      //       value: "GET,DELETE,PATCH,POST,PUT",
      //     },
      //     {
      //       key: "Access-Control-Allow-Headers",
      //       value:
      //         "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      //     },
      //   ],
      // },
    ];
  },
};

// export default nextConfig;

export default paraglide({
  paraglide: {
    project: "./project.inlang",
    outdir: "./src/paraglide",
  },
  ...nextConfig,
});

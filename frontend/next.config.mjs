import { paraglide } from "@inlang/paraglide-next/plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "**", pathname: "**", protocol: "https" }],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
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
        ];
    },
};

export default paraglide({
    paraglide: {
        project: "./project.inlang",
        outdir: "./src/paraglide",
    },
    ...nextConfig,
});

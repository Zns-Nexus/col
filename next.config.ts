import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // webcoreui ships raw .tsx/.scss sources; Next must transpile them. Its Sass
  // forwards `webcore.config.scss` from inside node_modules, so the project root
  // joins the load path for that override file to resolve.
  transpilePackages: ["webcoreui"],
  sassOptions: {
    includePaths: [process.cwd()],
    loadPaths: [process.cwd()],
  },
  outputFileTracingIncludes: {
    // The MCP route returns preview screenshots as image content blocks, so the
    // rendered PNGs must ship inside the function bundle (public/ is CDN-only).
    "/api/mcp": ["./public/previews/**/*"],
  },
  async headers() {
    return [{
      source: "/col-social-preview:version(.*).jpg",
      headers: [{ key: "Cache-Control", value: "public, max-age=60, s-maxage=60" }],
    }];
  },
};

export default nextConfig;

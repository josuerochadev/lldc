import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import compression from "vite-plugin-compression";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    // Gzip compression
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    // Brotli compression
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    // Sentry plugin pour source maps (production seulement)
    process.env.NODE_ENV === "production" && 
    process.env.VITE_SENTRY_AUTH_TOKEN && 
    sentryVitePlugin({
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
      org: process.env.VITE_SENTRY_ORG,
      project: process.env.VITE_SENTRY_PROJECT,
      telemetry: false,
      sourceMaps: {
        assets: ["./dist/**"],
      },
    }),
  ].filter(Boolean),
    optimizeDeps: {
      include: [
        'lucide-react/dist/esm/icons/facebook',
        'lucide-react/dist/esm/icons/instagram',
      ],
  },
  server: {
  },
  resolve: {
    alias: {
      "@": path.resolve(new URL(".", import.meta.url).pathname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  build: {
    sourcemap: true, // Important pour Sentry
  },
});
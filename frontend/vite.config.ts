import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import compression from "vite-plugin-compression";

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
  ],
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
});
import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
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
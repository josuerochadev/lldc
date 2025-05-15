import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
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
  server: {
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
});
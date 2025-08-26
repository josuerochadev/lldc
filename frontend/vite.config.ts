import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import compression from "vite-plugin-compression";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
  // Configuration simplifiée : le plugin Sentry se configurera automatiquement 
  // via les variables d'environnement en production
  const isProduction = mode === "production";

  return {
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
    // Les variables VITE_SENTRY_* doivent être définies en production
    isProduction && 
    sentryVitePlugin({
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
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  build: {
    sourcemap: true, // Important pour Sentry
  },
  };
});
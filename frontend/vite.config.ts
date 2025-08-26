import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
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
      // Sentry plugin pour source maps (production seulement)
      // Les variables VITE_SENTRY_* doivent être définies en production
      isProduction && 
      sentryVitePlugin({
        telemetry: false,
        sourcemaps: {
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
      rollupOptions: {
        output: {
          // Compression sera gérée par le serveur web (Nginx/Apache)
          // manualChunks pour optimiser le splitting
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [
      tailwindcss(),
      ,
      VitePWA({
        registerType: "autoUpdate", // Automatically update the service worker
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"], // Files to cache
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.example\.com\/.*/, // Cache API requests
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24, // 1 day
                },
              },
            },
          ],
        },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"], // Assets to cache
        manifest: {
          name: "My Vite PWA",
          short_name: "VitePWA",
          description: "A Vite-based Progressive Web App",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png", // Path to your icon
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png", // Path to your icon
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
      react(),
    ],
    base: env.VITE_BASENAME || "/", // Use the loaded environment variable
  };
});

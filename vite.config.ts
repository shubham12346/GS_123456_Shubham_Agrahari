import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [tailwindcss(), react()],
    base: env.VITE_BASENAME || "/", // Use the loaded environment variable
  };
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Check if the environment is production
// const isProduction = process.env.NODE_ENV === "production";

// https://vite.dev/config
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/GS_123456_Shubham_Agrahari/",
});

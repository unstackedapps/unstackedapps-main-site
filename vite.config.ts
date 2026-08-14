import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages with custom domain, use '/' as base path
  // For GitHub Pages without custom domain, use '/repository-name/'
  // Set VITE_BASE_PATH environment variable to override
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true, // Legg til denne linjen
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@layout": path.resolve(__dirname, "src/components/layout"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@auth": path.resolve(__dirname, "src/utils/auth"),
      "@data": path.resolve(__dirname, "src/data"),
      "@css": path.resolve(__dirname, "src/assets/css"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
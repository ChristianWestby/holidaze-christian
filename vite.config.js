import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@auth": path.resolve(__dirname, "src/utils/auth"),
      "@data": path.resolve(__dirname, "src/data"),
      "@css": path.resolve(__dirname, "src/assets/css"),
      "@booking-css": path.resolve(__dirname, "src/assets/css/booking.css"),
      "@assets": path.resolve(__dirname, "src/assets"), // ✅ lagt til denne
    },
  },
});
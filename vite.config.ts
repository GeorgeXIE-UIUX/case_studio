import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  // 1. plugins 陣列在這裡結束
  plugins: [
    react()
  ], 
  // 2. resolve 移出來，變成跟 plugins 平行
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
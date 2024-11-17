import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import path from 'path';

export default defineConfig({
  root: "src",
  server: {
    port: 3000,
  },
  build: {
    outDir: "/dist",
    assetsDir: './assets',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [glsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@components": path.resolve(__dirname, './src/components'),
      "@constants": path.resolve(__dirname, './src/constants'),
      "@helpers": path.resolve(__dirname, './src/helpers'),
      "@shaders": path.resolve(__dirname, './src/shaders'),
    },
  },
});

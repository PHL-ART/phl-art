import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  root: "src",
  server: {
    port: 3000,
  },
  build: {
    outDir: "./dist",
    assetsDir: './assets',
    sourcemap: true,
  },
  plugins: [glsl()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

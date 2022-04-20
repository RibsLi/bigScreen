import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
      refSugar: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "api": path.resolve(__dirname, "src/api"),
      "assets": path.resolve(__dirname, "src/assets"),
      "common": path.resolve(__dirname, "src/common"),
      "components": path.resolve(__dirname, "src/components"),
      "styles": path.resolve(__dirname, "src/styles"),
      "views": path.resolve(__dirname, "src/views"),
      "pages": path.resolve(__dirname, "src/pages"),
      "network": path.resolve(__dirname, "src/network"),
      "router": path.resolve(__dirname, "src/router"),
      "store": path.resolve(__dirname, "src/store"),
    },
  },
})

import { defineConfig } from "vite";

// Имя репозитория на GitHub (замени на свой)
const repoName = "wanderlist"; // ЗАМЕНИ НА СВОЕ ИМЯ РЕПОЗИТОРИЯ!

export default defineConfig({
  // Базовый путь для GitHub Pages
  base: "/wanderlist/",

  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Для лучшей совместимости с GitHub Pages
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Добавляем базовые переменные для SCSS
        additionalData: `
          $color-primary: #667eea;
          $color-secondary: #764ba2;
          $color-accent: #f093fb;
          $color-success: #4CAF50;
          $color-error: #f56565;
          $color-warning: #f6ad55;
          $color-dark: #0a0a0a;
          $color-white: #ffffff;
        `,
      },
    },
  },
});

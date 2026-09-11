import { defineConfig } from 'vite';

// Signal Arena: портрет 9:16 (база 540x960), Phaser.Scale.FIT задаётся в main.ts.
// base './' обязателен для Telegram Mini App / file-хостинга.
export default defineConfig({
  base: './',
  server: {
    host: true,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    // Бюджет Mini App: держим итоговый бандл как можно меньше.
    chunkSizeWarningLimit: 700,
  },
});

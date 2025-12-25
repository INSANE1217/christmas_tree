import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.npm.js'),
      name: 'ChristmasTree',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['firebase', 'firebase/app', 'firebase/firestore', 'firebase/analytics'],
    }
  }
});

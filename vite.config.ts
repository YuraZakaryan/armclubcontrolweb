import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  define: {
    'process.env': {},
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: resolve(__dirname, './src/assets/') },
      { find: '@components', replacement: resolve(__dirname, './src/components/') },
      { find: '@hooks', replacement: resolve(__dirname, './src/hooks/') },
      { find: '@pages', replacement: resolve(__dirname, './src/pages/') },
      { find: '@redux', replacement: resolve(__dirname, './src/redux/') },
      { find: '@routers', replacement: resolve(__dirname, './src/routers/') },
      { find: '@types', replacement: resolve(__dirname, './src/types/') },
      { find: '@utils', replacement: resolve(__dirname, './src/utils/') },
      { find: '@services', replacement: resolve(__dirname, './src/services/') },
      { find: '@mock', replacement: resolve(__dirname, './src/mock/') },
    ],
  },
  server: {
    port: 3000,
  },
});

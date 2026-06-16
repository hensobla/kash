import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/kash/' : '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
}));

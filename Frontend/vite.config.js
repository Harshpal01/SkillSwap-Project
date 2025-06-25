import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default is dist, but it's good to be explicit
  },
  server: {
    port: 3000, // optional, helps during local dev
  },
});

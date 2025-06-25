import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [], // avoids potential external resolution issues
    },
    chunkSizeWarningLimit: 1000, // optional: increases size threshold to avoid warning
  },
})

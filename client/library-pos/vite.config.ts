import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:8000/',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://localhost:8000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/,'')
      }
    }
  },
  
})

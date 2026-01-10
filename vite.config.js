import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Força HTTPS para backend
        target: process.env.VITE_API_URL?.replace('http://', 'https://') || 'https://backendmissaohuambo.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

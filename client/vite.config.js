import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// During local development the browser talks to Vite and Vite proxies /api
// requests to the Express server. This avoids hard-coding localhost:3000 in
// the React app and also works when Vite chooses 5174/5175/etc.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})

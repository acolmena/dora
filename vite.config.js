import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying requests from /api to https://api.tikapi.io
      '/api': {
        target: 'https://api.tikapi.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // You can include additional options supported by http-proxy-middleware
      },
    },
  },
});
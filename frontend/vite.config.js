import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests with a path that starts with `/api` to your backend server
      '/api': {
        target: 'http://localhost:8080', // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove the `/api` prefix
      }
    }
  }
});

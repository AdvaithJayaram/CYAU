import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  server: {
    headers: {
      'Content-Security-Policy': "frame-ancestors 'self' https://meet.jit.si",
    },
  },
});
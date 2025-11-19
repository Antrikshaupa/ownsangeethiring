import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'
  
  return {
    plugins: [react()],
    
    server: {
      port: 5173,
      proxy: isDevelopment
        ? {
            '/api': {
              target: process.env.VITE_API_URL || 'http://localhost:5000',
              changeOrigin: true,
            },
          }
        : undefined,
    },
    
    build: {
      outDir: 'dist',
      sourcemap: isDevelopment,
      // use default esbuild minifier instead of terser
      minify: isDevelopment ? false : 'esbuild',
      // replace terserOptions with esbuild drop
      esbuild: !isDevelopment
        ? {
            drop: ['console', 'debugger'],
          }
        : undefined,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react', 'recharts'],
            'form-vendor': ['react-hook-form'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      globals: true,
    },
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    // Production build optimizations
    rollupOptions: {
      output: {
        // Code splitting for better caching and loading performance
        manualChunks: {
          // Vendor chunk for React and core libraries
          vendor: ['react', 'react-dom'],
          // UI libraries chunk
          ui: ['framer-motion', 'lucide-react']
        }
      }
    },
    // Disable source maps in production for security and size
    sourcemap: false,
    // Use default esbuild minification (faster and built-in)
    minify: 'esbuild',
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Asset handling
    assetsDir: 'assets',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for better optimization
    target: 'esnext'
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
})
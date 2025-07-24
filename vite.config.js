import { defineConfig } from 'vite'

export default defineConfig({
  // Base path untuk GitHub Pages
  // Repository: https://github.com/tanerizawa/bizmark.git
  base: '/bizmark/',
  
  build: {
    // Output directory
    outDir: 'dist',
    // Generate manifest for cache busting
    manifest: false,
    // Optimize untuk production
    minify: 'terser',
    // Source maps untuk debugging (optional)
    sourcemap: false,
    // Rollup options
    rollupOptions: {
      output: {
        // Organize assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    }
  },
  
  // Preview server config
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
  
  // Dev server config
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  }
})

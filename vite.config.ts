import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works on a GitHub Pages subpath and on a custom domain.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // One-page site: React + GSAP + Motion land in a single ~200 kB (gzip) bundle by design.
  build: { chunkSizeWarningLimit: 700 },
})

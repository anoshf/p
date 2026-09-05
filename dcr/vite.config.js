import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` emits RELATIVE asset paths.
// This is deliberate: the built site then works unchanged at
//   - https://<user>.github.io/               (user/org page)
//   - https://<user>.github.io/<repo>/        (project page)  <-- no config edit needed
//   - https://your-custom-domain.com/
//   - file:// (opening dist/index.html directly)
// Combined with HashRouter, deep links never 404 on GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5173,
    open: true,
    host: true,
    watch: {
      usePolling: true,
    },
  },
})

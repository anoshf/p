import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const fromConfig = path => fileURLToPath(new URL(path, import.meta.url));
const versionInputs = Object.fromEntries(
  readdirSync(fromConfig('./'), { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^v[1-9][0-9]*$/.test(entry.name))
    .map(({ name }) => [name, fromConfig(`./${name}/index.html`)])
    .filter(([, page]) => existsSync(page))
);

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: { dedupe: ['react', 'react-dom', 'react-router-dom', 'js-yaml'] },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(fromConfig('./')), fromConfig('../pyj/src/')],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fromConfig('./index.html'),
        ...versionInputs,
      },
    },
  },
});

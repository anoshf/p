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

function redirectVersionDirectory(req, res, next) {
  const [path, query] = (req.url || '').split(/\?(.*)/s, 2);
  if (!Object.hasOwn(versionInputs, path.slice(1))) return next();

  res.writeHead(307, { Location: `${path}/${query === undefined ? '' : `?${query}`}` });
  res.end();
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'consulting-version-urls',
      configureServer(server) {
        server.middlewares.use(redirectVersionDirectory);
      },
      configurePreviewServer(server) {
        server.middlewares.use(redirectVersionDirectory);
      },
    },
  ],
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

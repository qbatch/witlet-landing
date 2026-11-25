import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { renderPage } from './src/templates/index.js';

/**
 * Pre-renders all copy into every HTML entry (see src/templates/index.js).
 * Vite restarts the dev server when content.js or config.js change,
 * because they are dependencies of this config file.
 */
function prerender(base) {
  return {
    name: 'witlet-prerender',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        return renderPage(html, { path: ctx?.path || '/', base });
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const base = env.VITE_BASE_PATH || '/';
  return {
    // e.g. VITE_BASE_PATH=/witlet-landing/ for GitHub Pages project sites.
    base,
    plugins: [prerender(base)],
    build: {
      target: 'es2022',
      cssMinify: true,
      rollupOptions: {
        input: {
          main: resolve('index.html'),
          privacy: resolve('privacy.html'),
          terms: resolve('terms.html'),
          support: resolve('support.html'),
        },
      },
    },
  };
});

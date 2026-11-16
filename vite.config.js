import { defineConfig, loadEnv } from 'vite';
import { renderPage } from './src/templates/index.js';

/**
 * Pre-renders all copy into index.html (see src/templates/index.js).
 * Vite restarts the dev server when content.js or config.js change,
 * because they are dependencies of this config file.
 */
function prerender() {
  return {
    name: 'headroom-prerender',
    transformIndexHtml: { order: 'pre', handler: renderPage },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    // e.g. VITE_BASE_PATH=/headroom-landing/ for GitHub Pages project sites.
    base: env.VITE_BASE_PATH || '/',
    plugins: [prerender()],
    build: {
      target: 'es2022',
      cssMinify: true,
    },
  };
});

/**
 * Region renderers used by the pre-render plugin in vite.config.js.
 * index.html holds markers like <!-- render:hero -->; each is replaced with
 * the matching function's output at dev and build time. The page therefore
 * ships as real HTML: instant first paint, no layout shift, good SEO.
 */
import { article } from './article.js';
import { footer, head, header, skipLink } from './chrome.js';
import { demo, download, faq, hero, included, journey, personas, pillars, privacy, problem } from './sections.js';
import { setPageContext } from './site.js';

export const regions = {
  head,
  skipLink,
  header,
  hero,
  problem,
  journey,
  demo,
  pillars,
  included,
  privacy,
  personas,
  faq,
  download,
  footer,
  article,
};

export function renderPage(html, ctx = {}) {
  setPageContext(ctx);
  return html.replace(/<!--\s*render:(\w+)(?:\s+([\w-]+))?\s*-->/g, (marker, name, arg) => {
    if (!regions[name]) throw new Error(`Unknown render region "${name}"`);
    return regions[name](arg);
  });
}

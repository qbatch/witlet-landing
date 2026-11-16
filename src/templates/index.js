/**
 * Region renderers used by the pre-render plugin in vite.config.js.
 * index.html holds markers like <!-- render:hero -->; each is replaced with
 * the matching function's output at dev and build time. The page therefore
 * ships as real HTML: instant first paint, no layout shift, good SEO.
 */
import { footer, head, header, skipLink } from './chrome.js';
import { demo, faq, hero, journey, personas, pillars, pricing, privacy, problem, waitlist } from './sections.js';

export const regions = {
  head,
  skipLink,
  header,
  hero,
  problem,
  journey,
  demo,
  pillars,
  privacy,
  personas,
  pricing,
  faq,
  waitlist,
  footer,
};

export function renderPage(html) {
  return html.replace(/<!--\s*render:(\w+)\s*-->/g, (marker, name) => {
    if (!regions[name]) throw new Error(`Unknown render region "${name}" in index.html`);
    return regions[name]();
  });
}

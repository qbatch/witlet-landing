/**
 * Which page is being pre-rendered, so header and footer links work
 * both on the home page and on the policy pages.
 */
let ctx = { base: '/', path: '/' };

export function setPageContext(next = {}) {
  const base = next.base || '/';
  ctx = { base: base.endsWith('/') ? base : `${base}/`, path: next.path || '/' };
}

export function isHome() {
  const path = currentPath();
  return path === '/' || path === '';
}

/** Path of the HTML file being rendered, without ".html" or a trailing index. */
export function currentPath() {
  let path = (ctx.path || '/').split('?')[0];
  if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length);
  else if (path.endsWith('.html')) path = path.slice(0, -'.html'.length);
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}

/** Resolve a site link against the Vite base path. Hash links stay put on the home page. */
export function pageHref(href) {
  if (!href) return ctx.base;
  if (href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://')) return href;
  if (href.startsWith('#')) return isHome() ? href : `${ctx.base}${href}`;
  const path = href.startsWith('/') ? href.slice(1) : href;
  return `${ctx.base}${path}`;
}

export function isCurrent(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return false;
  const path = href.startsWith('/') ? href : `/${href}`;
  const clean = path.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  return currentPath() === clean;
}

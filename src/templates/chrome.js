/** Page chrome: <head> meta tags, site header and footer. */
import { config } from '../config.js';
import { content } from '../content.js';
import { esc } from '../lib/dom.js';
import { icon, logoMark } from './icons.js';
import { isCurrent, isHome, pageHref } from './site.js';

export function head(pageKey) {
  const page = pageKey ? content.pages[pageKey] : null;
  if (pageKey && !page) throw new Error(`Unknown page "${pageKey}"`);
  const { meta } = content;
  const title = page ? page.metaTitle : meta.title;
  const description = page ? page.metaDescription : meta.description;
  const path = page ? page.path : '/';
  const url = `${config.siteUrl}${path}`;
  const image = `${config.siteUrl}${meta.ogImage}`;
  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(config.productName)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(meta.ogImageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
    <meta name="twitter:image:alt" content="${esc(meta.ogImageAlt)}" />`;
}

export function skipLink() {
  return esc(content.skipLink);
}

const navLinks = (className) =>
  content.nav.links
    .map((link) => {
      const current = isCurrent(link.href) ? ' aria-current="page"' : '';
      return `<li><a class="${className}" href="${esc(pageHref(link.href))}"${current}>${esc(link.label)}</a></li>`;
    })
    .join('');

export function header() {
  const { nav } = content;
  const home = isHome() ? '#top' : pageHref('/');
  return `
    <header class="site-header" data-header>
      <div class="container header-inner">
        <a class="wordmark" href="${esc(home)}" aria-label="${esc(nav.homeLabel)}">
          ${logoMark(pageHref('/witlet-mark.png'))}<span>${esc(config.productName)}</span>
        </a>
        <nav class="nav" aria-label="Main">
          <ul class="nav-links" role="list">${navLinks('nav-link')}</ul>
        </nav>
        <div class="header-actions">
          <a class="btn btn-primary btn-sm header-cta" href="${esc(pageHref(nav.ctaHref))}">${esc(nav.cta)}</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu"
                  aria-label="${esc(nav.menuOpen)}" data-label-open="${esc(nav.menuOpen)}" data-label-close="${esc(nav.menuClose)}">
            ${icon.menu()}
          </button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu" hidden>
        <nav class="container" aria-label="Menu">
          <ul class="mobile-links" role="list">${navLinks('mobile-link')}</ul>
          <a class="btn btn-primary mobile-cta" href="${esc(pageHref(nav.ctaHref))}">${esc(nav.cta)}</a>
        </nav>
      </div>
    </header>`;
}

export function footer() {
  const { footer: f } = content;
  const home = isHome() ? '#top' : pageHref('/');
  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <a class="wordmark" href="${esc(home)}" aria-label="${esc(content.nav.homeLabel)}">${logoMark(pageHref('/witlet-mark.png'))}<span>${esc(config.productName)}</span></a>
          <p class="muted">${esc(f.tagline)}</p>
        </div>
        <ul class="footer-links" role="list">
          ${f.links
            .map((link) => {
              const href = config.links[link.key];
              const current = isCurrent(href) ? ' aria-current="page"' : '';
              return `<li><a href="${esc(pageHref(href))}"${current}>${esc(link.label)}</a></li>`;
            })
            .join('')}
        </ul>
        <div class="footer-legal muted">
          <p>${esc(f.copyright)}</p>
          <p>${esc(f.trademark)}</p>
        </div>
      </div>
    </footer>`;
}

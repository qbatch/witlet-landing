/** Page chrome: <head> meta tags, site header and footer. */
import { config } from '../config.js';
import { content } from '../content.js';
import { esc } from '../lib/dom.js';
import { icon, logoMark } from './icons.js';

export function head() {
  const { meta } = content;
  const url = `${config.siteUrl}/`;
  const image = `${config.siteUrl}${meta.ogImage}`;
  return `
    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(config.productName)}" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(meta.ogImageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
    <meta name="twitter:image:alt" content="${esc(meta.ogImageAlt)}" />`;
}

export function skipLink() {
  return esc(content.skipLink);
}

const navLinks = (className) =>
  content.nav.links.map((l) => `<li><a class="${className}" href="${l.href}">${esc(l.label)}</a></li>`).join('');

export function header() {
  const { nav } = content;
  return `
    <header class="site-header" data-header>
      <div class="container header-inner">
        <a class="wordmark" href="#top" aria-label="${esc(nav.homeLabel)}">
          ${logoMark}<span>${esc(config.productName)}</span>
        </a>
        <nav class="nav" aria-label="Main">
          <ul class="nav-links" role="list">${navLinks('nav-link')}</ul>
        </nav>
        <div class="header-actions">
          <a class="btn btn-primary btn-sm header-cta" href="#waitlist">${esc(nav.cta)}</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu"
                  aria-label="${esc(nav.menuOpen)}" data-label-open="${esc(nav.menuOpen)}" data-label-close="${esc(nav.menuClose)}">
            ${icon.menu()}
          </button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu" hidden>
        <nav class="container" aria-label="Menu">
          <ul class="mobile-links" role="list">${navLinks('mobile-link')}</ul>
          <a class="btn btn-primary mobile-cta" href="#waitlist">${esc(nav.cta)}</a>
        </nav>
      </div>
    </header>`;
}

export function footer() {
  const { footer: f } = content;
  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <a class="wordmark" href="#top" aria-label="${esc(content.nav.homeLabel)}">${logoMark}<span>${esc(config.productName)}</span></a>
          <p class="muted">${esc(f.tagline)}</p>
        </div>
        <ul class="footer-links" role="list">
          ${f.links.map((l) => `<li><a href="${esc(config.links[l.key])}">${esc(l.label)}</a></li>`).join('')}
        </ul>
        <div class="footer-legal muted">
          <p>${esc(f.copyright)}</p>
          <p>${esc(f.trademark)}</p>
        </div>
      </div>
    </footer>`;
}

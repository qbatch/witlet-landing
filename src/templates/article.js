/** Privacy, terms and support pages. Words come from content.pages. */
import { config } from '../config.js';
import { content } from '../content.js';
import { accordionMarkup } from '../components/accordion.js';
import { esc } from '../lib/dom.js';
import { isCurrent, pageHref } from './site.js';

function prose(page) {
  return page.sections
    .map((section) => {
      const paragraphs = section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('');
      const list = section.list
        ? `<ul>${section.list.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`
        : '';
      return `<section><h2>${esc(section.heading)}</h2>${paragraphs}${list}</section>`;
    })
    .join('');
}

function related() {
  const links = [
    [config.links.privacy, 'Privacy policy'],
    [config.links.terms, 'Terms of use'],
    [config.links.support, 'Support'],
  ];
  return `
    <p class="page-related">
      ${links
        .map(([href, label]) => {
          const current = isCurrent(href) ? ' aria-current="page"' : '';
          return `<a href="${esc(pageHref(href))}"${current}>${esc(label)}</a>`;
        })
        .join('')}
    </p>`;
}

export function article(pageKey) {
  const page = content.pages[pageKey];
  if (!page) throw new Error(`Unknown page "${pageKey}"`);

  const contact = page.contactTitle && config.supportEmail
    ? `<aside class="contact-card card">
        <h2>${esc(page.contactTitle)}</h2>
        <p>${esc(page.contactText)}</p>
        ${
          config.supportEmail
            ? `<a class="btn btn-primary" href="mailto:${esc(config.supportEmail)}">${esc(config.supportEmail)}</a>`
            : ''
        }
      </aside>`
    : '';

  const body = page.items
    ? `<p class="lead">${esc(page.intro)}</p>${related()}<div class="page-faq">${accordionMarkup(page.items, 'support')}</div>${contact}`
    : `${related()}<div class="prose">${prose(page)}</div>`;

  return `
    <article class="container page-wrap">
      <header class="page-head">
        <p class="eyebrow">${esc(page.eyebrow)}</p>
        <h1 id="page-title">${esc(page.title)}</h1>
        <p class="page-updated">${esc(page.updated)}</p>
      </header>
      ${body}
    </article>`;
}

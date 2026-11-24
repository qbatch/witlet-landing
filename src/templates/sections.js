/** Section markup. Every word comes from content.js. */
import { config } from '../config.js';
import { content, jobs } from '../content.js';
import { accordionMarkup } from '../components/accordion.js';
import { segmentedMarkup } from '../components/segmented.js';
import { defaultJob, defaultMemory, formatGb, getEstimate, getShortlist, memorySizes, shortlistCell } from '../data/demo.js';
import { esc } from '../lib/dom.js';
import { icon } from './icons.js';
import { pageHref } from './site.js';
import { heroVisual, jargonVisual, journeyWindow, privacyWindow } from './visuals.js';

const sectionHead = ({ eyebrow, title }, id, { lead = '', center = false, extra = '' } = {}) => `
  <header class="section-head${center ? ' section-head--center' : ''}">
    <p class="eyebrow" data-reveal>${esc(eyebrow)}</p>
    <h2 id="${id}" data-reveal style="--i:1">${esc(title)}</h2>
    ${lead ? `<p class="lead" data-reveal style="--i:2">${esc(lead)}</p>` : ''}
    ${extra}
  </header>`;

export function hero() {
  const h = content.hero;
  return `
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="eyebrow hero-rise">${esc(h.eyebrow)}</p>
        <h1 id="hero-title" class="hero-title hero-rise" style="--i:1">${esc(h.title)}</h1>
        <p class="lead hero-sub hero-rise" style="--i:2">${esc(h.subtitle)}</p>
        <div class="hero-ctas hero-rise" style="--i:3">
          <a class="btn btn-primary btn-lg" href="${esc(pageHref(content.nav.ctaHref))}">${esc(h.primaryCta)}</a>
          <a class="btn btn-ghost btn-lg" href="#how">${esc(h.secondaryCta)}${icon.arrowRight()}</a>
        </div>
        <p class="hero-note muted hero-rise" style="--i:4">${esc(h.note)}</p>
      </div>
      <div class="hero-visual">
        <div class="hero-stage" aria-hidden="true">${heroVisual()}</div>
        <button class="replay" type="button" aria-label="${esc(h.replayLabel)}" hidden>${icon.replay()}<span>${esc(h.replay)}</span></button>
        <p class="sr-only">${esc(h.srDescription)}</p>
      </div>
    </div>`;
}

export function problem() {
  const p = content.problem;
  return `
    <div class="container problem-grid">
      <div class="problem-copy">
        ${sectionHead(p, 'problem-title', { lead: p.intro })}
        <ol class="pain-list" role="list">
          ${p.points
            .map(
              (pt, i) => `
            <li class="pain" data-reveal style="--i:${i}">
              <span class="pain-num" aria-hidden="true">0${i + 1}</span>
              <div><h3>${esc(pt.title)}</h3><p>${esc(pt.text)}</p></div>
            </li>`,
            )
            .join('')}
        </ol>
      </div>
      <div class="jargon">
        <div class="jargon-stage" aria-hidden="true">${jargonVisual()}</div>
        <p class="sr-only">${esc(p.jargon.srDescription)}</p>
      </div>
    </div>`;
}

export function journey() {
  const j = content.journey;
  return `
    <div class="container">${sectionHead(j, 'how-title', { lead: j.intro })}</div>
    <div class="journey-track">
      <div class="journey-sticky">
        <div class="container journey-grid">
          <div class="journey-steps-wrap">
          <span class="journey-line" aria-hidden="true"><span class="journey-line-fill"></span></span>
          <ol class="journey-steps" role="list">
            ${j.steps
              .map(
                (s, i) => `
              <li class="journey-step" data-step="${i}" data-reveal>
                <span class="step-num" aria-hidden="true">${i + 1}</span>
                <div class="step-copy">
                  <h3><span class="sr-only">${esc(j.progressLabel.replace('{n}', i + 1))}: </span>${esc(s.title)}</h3>
                  <p>${esc(s.text)}</p>
                </div>
              </li>`,
              )
              .join('')}
          </ol>
          </div>
          <div class="journey-visual" aria-hidden="true">${journeyWindow()}</div>
        </div>
      </div>
    </div>`;
}

export function demo() {
  const d = content.demo;
  const est = getEstimate(defaultMemory, defaultJob);
  let offset = 0;
  const segments = Object.entries(est.segments)
    .map(([key, gb]) => {
      const start = (offset / est.total) * 100;
      offset += gb;
      const seg = `<span class="membar-seg membar-seg--${key}" data-seg="${key}" style="transform:translateX(${start}%) scaleX(${gb / est.total})"></span>`;
      // A full-width layer whose left edge marks the block boundary; it only translates, so the line never stretches.
      const sep = start > 0 ? `<span class="membar-sep" data-sep="${key}" style="transform:translateX(${start}%)"></span>` : '';
      return seg + sep;
    })
    .join('');

  const legend = Object.entries(est.segments)
    .map(
      ([key, gb]) => `
      <li class="legend-item legend-item--${key}" data-legend="${key}">
        <span class="swatch" aria-hidden="true"></span>
        <span class="legend-name">${esc(d.segments[key])}</span>
        <span class="legend-value">${esc(formatGb(gb))}</span>
      </li>`,
    )
    .join('');

  return `
    <div class="container">
      ${sectionHead(d, 'demo-title', { lead: d.intro })}
      <div class="demo-panel" data-reveal>
        <div class="demo-controls">
          <div class="control">
            <p class="control-label" id="demo-memory-label">${esc(d.memoryLabel)}</p>
            ${segmentedMarkup({
              labelId: 'demo-memory-label',
              options: memorySizes.map((gb) => ({ value: String(gb), label: `${gb} GB` })),
              value: String(defaultMemory),
              variant: 'track',
            })}
          </div>
          <div class="control">
            <p class="control-label" id="demo-job-label">${esc(d.jobLabel)}</p>
            ${segmentedMarkup({
              labelId: 'demo-job-label',
              options: jobs.map((j) => ({ value: j.id, label: j.label })),
              value: defaultJob,
              variant: 'chips',
            })}
          </div>
        </div>
        <div class="demo-output">
          <p class="control-label">${esc(d.barLabel)}</p>
          <div class="membar" aria-hidden="true">${segments}</div>
          <ul class="membar-legend" role="list">${legend}</ul>
          <div class="demo-result">
            <p class="control-label">${esc(d.resultLabel)}</p>
            <div class="demo-sentence" aria-live="polite"><p>${esc(est.sentence)}</p></div>
          </div>
          <p class="demo-note">${esc(d.note)} <span class="muted">${esc(d.hint)}</span></p>
        </div>
        ${shortlistTable()}
      </div>
    </div>`;
}

/**
 * The shortlist table under the demo. Explicit ARIA roles keep table
 * semantics when CSS turns rows into cards on small screens.
 */
function shortlistTable() {
  const s = content.demo.shortlist;
  const keys = ['style', 'download', 'starts', 'pace', 'roomLeft'];
  const rows = getShortlist(defaultMemory, defaultJob)
    .map(
      (row) => `
      <tr role="row" data-option="${row.id}">
        <th role="rowheader" scope="row">
          <span class="letter" aria-hidden="true">${row.id}</span><span class="sr-only">${esc(s.option.replace('{id}', row.id))}</span>
        </th>
        ${keys
          .map((key) => `<td role="cell" data-cell="${key}" data-label="${esc(s.columns[key])}">${esc(shortlistCell(row, key))}</td>`)
          .join('')}
      </tr>`,
    )
    .join('');
  return `
    <div class="demo-shortlist">
      <table class="shortlist-table" role="table" aria-labelledby="demo-shortlist-title" aria-describedby="demo-shortlist-note">
        <caption>
          <span class="control-label" id="demo-shortlist-title">${esc(s.title)}</span>
          <span class="shortlist-caption-note" id="demo-shortlist-note">${esc(s.note)}</span>
        </caption>
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader" scope="col">${esc(s.columns.option)}</th>
            ${keys.map((key) => `<th role="columnheader" scope="col">${esc(s.columns[key])}</th>`).join('')}
          </tr>
        </thead>
        <tbody role="rowgroup">${rows}</tbody>
      </table>
    </div>`;
}

export function pillars() {
  const p = content.pillars;
  return `
    <div class="container">
      ${sectionHead(p, 'features-title')}
      <ul class="pillars-grid" role="list">
        ${p.items
          .map(
            (item, i) => `
          <li data-reveal style="--i:${i}">
            <div class="pillar card">
              <span class="pillar-icon">${icon.pillar(item.icon)}</span>
              <h3>${esc(item.title)}</h3>
              <p>${esc(item.text)}</p>
            </div>
          </li>`,
          )
          .join('')}
      </ul>
    </div>`;
}

export function privacy() {
  const p = content.privacy;
  return `
    <div class="container privacy-grid">
      <div class="privacy-copy">
        ${sectionHead(p, 'privacy-title', { lead: p.text })}
        <ul class="privacy-points" role="list" data-reveal style="--i:3">
          ${p.points.map((pt) => `<li>${icon.check('icon')}${esc(pt)}</li>`).join('')}
        </ul>
        <p class="privacy-more" data-reveal style="--i:5"><a href="${esc(pageHref(config.links.privacy))}">${esc(p.policyLabel)}</a></p>
        <div class="switch-row" data-reveal style="--i:4">
          <button class="switch" type="button" role="switch" aria-checked="false" aria-describedby="airplane-status">
            <span class="switch-track" aria-hidden="true"><span class="switch-thumb"></span></span>
            <span class="switch-label">${esc(p.toggle)}</span>
          </button>
          <p class="switch-status muted" id="airplane-status" aria-live="polite"
             data-on="${esc(p.statusOn)}" data-off="${esc(p.statusOff)}">${esc(p.statusOff)}</p>
        </div>
      </div>
      <div class="privacy-visual">
        <div class="privacy-stage" aria-hidden="true">${privacyWindow()}</div>
        <p class="sr-only">${esc(p.srDescription)}</p>
      </div>
    </div>`;
}

export function personas() {
  const p = content.personas;
  return `
    <div class="container">
      ${sectionHead(p, 'who-title')}
      <ul class="personas-grid" role="list">
        ${p.items
          .map(
            (item, i) => `
          <li class="persona card" data-reveal style="--i:${i}">
            <p class="persona-role">${esc(item.role)}</p>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.text)}</p>
          </li>`,
          )
          .join('')}
      </ul>
      <p class="footnote muted" data-reveal>${esc(p.footnote)}</p>
    </div>`;
}

export function included() {
  const p = content.included;
  return `
    <div class="container">
      ${sectionHead(p, 'included-title', { lead: p.intro })}
      <ul class="feature-grid" role="list">
        ${p.items
          .map(
            (item, i) => `
          <li data-reveal style="--i:${i}">
            <div class="pillar card">
              <span class="pillar-icon">${icon.pillar(item.icon)}</span>
              <h3>${esc(item.title)}</h3>
              <p>${esc(item.text)}</p>
            </div>
          </li>`,
          )
          .join('')}
      </ul>
    </div>`;
}

export function faq() {
  const f = content.faq;
  return `
    <div class="container faq-grid">
      ${sectionHead(f, 'faq-title')}
      ${accordionMarkup(f.items, 'faq')}
      <p class="faq-more" data-reveal><a href="${esc(pageHref(config.links.support))}">${esc(f.more)}</a></p>
    </div>`;
}

export function download() {
  const d = content.download;
  const store = config.appStore
    ? `<a class="btn btn-primary btn-lg" href="${esc(config.appStore)}">${esc(d.storeCta)}</a>`
    : `<p class="download-fallback">${esc(d.storeFallback)}</p>`;
  return `
    <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="container cta-inner">
      ${sectionHead(d, 'download-title', { lead: d.text, center: true })}
      <div class="download-card card" data-reveal style="--i:3">
        <ul class="download-points" role="list">
          ${d.points.map((point) => `<li>${icon.check('icon')}${esc(point)}</li>`).join('')}
        </ul>
        ${store}
        <p class="form-note"><a href="${esc(pageHref(config.links.support))}">${esc(d.support)}</a></p>
      </div>
    </div>`;
}

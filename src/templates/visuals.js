/**
 * Scene illustrations, rendered in their FINAL state. That final frame is
 * what visitors see with reduced motion or without JavaScript, so each one
 * must tell its story as a still image. Scenes animate from here.
 */
import { config } from '../config.js';
import { content, jobs } from '../content.js';
import { appWindow } from '../components/appWindow.js';
import { esc, typewriterMarkup } from '../lib/dom.js';
import { icon } from './icons.js';

/* ---------- Scene 1: hero, Mac check → recommended models ---------- */

export function heroVisual() {
  const v = content.hero.visual;
  const gauges = v.gauges
    .map(
      (g) => `
      <div class="gauge" data-gauge>
        <svg class="gauge-ring" viewBox="0 0 64 64" aria-hidden="true">
          <circle class="gauge-track" cx="32" cy="32" r="27" />
          <circle class="gauge-fill" cx="32" cy="32" r="27" pathLength="1" style="--ratio:${g.ratio}" />
        </svg>
        <span class="gauge-value" ${g.count ? `data-count="${g.count}" data-suffix="${esc(g.suffix)}"` : ''}>${esc(g.count ? `${g.count}${g.suffix}` : g.text)}</span>
        <span class="gauge-label">${esc(g.label)}</span>
      </div>`,
    )
    .join('');

  const cards = v.cards
    .map(
      (c) => `
      <div class="hv-card${c.recommended ? ' is-picked' : ''}" data-card="${c.id}">
        <div class="hv-card-head">
          <span class="hv-card-id">${c.id}</span>
          <span class="hv-size">${esc(c.size)}</span>
        </div>
        <p class="hv-fit">${esc(c.fit)}</p>
        <p class="hv-speed">${esc(c.speed)}</p>
        ${c.recommended ? `<span class="hv-badge">${icon.check('icon hv-badge-check')}${esc(v.pick)}</span>` : ''}
      </div>`,
    )
    .join('');

  const body = `
    <div class="hv-scan"></div>
    <p class="hv-verdict">${icon.check('icon hv-verdict-icon')}<span>${esc(v.verdict)}</span></p>
    <div class="hv-panels">
      <div class="hv-check">
        <p class="hv-checking">${esc(v.checking)}</p>
        <div class="hv-gauges">${gauges}</div>
      </div>
      <div class="hv-drive">
        <p class="hv-prompt"><span class="hv-prompt-label">${esc(v.promptLabel)}</span><span>${esc(v.prompt)}</span></p>
        <div class="hv-cards has-pick">${cards}</div>
      </div>
    </div>`;

  return appWindow({ title: v.windowTitle, body, className: 'hero-window' });
}

/* ---------- Scene 2: jargon → plain English ---------- */

// Scattered starting spots for the chips (percent of the stage).
const CHIP_SPOTS = [
  [6, 10], [54, 4], [26, 36], [60, 40], [4, 68], [46, 76],
];

export function jargonVisual() {
  const j = content.problem.jargon;
  const chips = j.chips
    .map((chip, i) => {
      const [x, y] = CHIP_SPOTS[i % CHIP_SPOTS.length];
      return `<span class="chip-wrap" style="--x:${x}%;--y:${y}%;--d:${i}"><span class="jargon-chip">${esc(chip)}</span></span>`;
    })
    .join('');
  const plain = j.plain.map((p) => `<span>${esc(p)}</span>`).join('<span class="plain-dot">·</span>');
  return `
    <div class="jargon-chips">${chips}</div>
    <div class="jargon-result">
      <span class="jargon-result-label">${esc(j.label)}</span>
      <p class="plain-line">${plain}</p>
    </div>`;
}

/* ---------- Scene 3: one window, five panes ---------- */

const meterRows = (rows) =>
  rows
    .map(
      (r) => `
      <div class="meter-row">
        <span class="meter-label">${esc(r.label)}</span>
        <span class="meter"><span class="meter-fill" style="--ratio:${r.ratio}"></span></span>
        <span class="meter-value">${esc(r.value)}</span>
      </div>`,
    )
    .join('');

function panes() {
  const p = content.journey.panes;
  return [
    `<div class="pane pane-welcome">
      <span class="pw-icon">${icon.lock()}</span>
      <p class="pane-title">${esc(p.welcome.title)}</p>
      <p class="pane-text">${esc(p.welcome.text)}</p>
      <span class="mock-btn">${esc(p.welcome.button)}</span>
    </div>`,

    `<div class="pane pane-check">
      <div class="meters">${meterRows(p.check.rows)}</div>
      <p class="pane-verdict">${icon.check('icon pane-verdict-icon')}<span>${esc(p.check.verdict)}</span></p>
    </div>`,

    `<div class="pane pane-questions">
      <p class="pane-title">${esc(p.questions.title)}</p>
      <div class="job-grid">
        ${jobs.map((j) => `<span class="job-card${j.id === p.questions.selected ? ' is-selected' : ''}">${esc(j.label)}</span>`).join('')}
      </div>
      <p class="pane-caption">${esc(p.questions.caption)}</p>
    </div>`,

    `<div class="pane pane-models">
      <p class="pane-title">${esc(p.models.title)}</p>
      <div class="model-list">
        ${p.models.items
          .map(
            (item) => `
          <div class="model-row${item.recommended ? ' is-recommended' : ''}">
            <span class="letter">${item.id}</span>
            <span class="model-copy">
              <span class="shortlist-note">${esc(item.note)}</span>
              <span class="model-fit">${esc(item.fit)}</span>
            </span>
            <span class="shortlist-size">${esc(item.size)}</span>
            ${item.recommended ? `<span class="model-badge">${icon.check('icon')}${esc(p.models.pick)}</span>` : ''}
          </div>`,
          )
          .join('')}
      </div>
      <p class="pane-foot">${icon.check('icon pane-foot-icon')}${esc(p.models.footer)}</p>
    </div>`,

    `<div class="pane pane-chat">
      <span class="offline-badge"><span class="offline-dot"></span>${esc(p.chat.badge)}</span>
      <div class="chat-log">
        ${p.chat.messages
          .map((m) =>
            m.from === 'you'
              ? `<p class="bubble bubble--you">${esc(m.text)}</p>`
              : typewriterMarkup(m.text, 'p', 'bubble bubble--ai'),
          )
          .join('')}
      </div>
      <div class="chat-input"><span>${esc(p.chat.placeholder)}</span><span class="chat-bytes">${esc(p.chat.footer)}</span></div>
    </div>`,
  ];
}

export function journeyWindow() {
  const all = panes();
  // The last pane (chat) is the resting state; the scene moves .is-active.
  const body = `<div class="panes">${all
    .map((markup, i) => markup.replace('<div class="pane ', `<div data-pane="${i}" class="${i === all.length - 1 ? 'is-active ' : ''}pane `))
    .join('')}</div>`;
  return appWindow({ title: config.productName, body, className: 'journey-window' });
}

/* ---------- Scene 5: privacy, airplane mode ---------- */

export function privacyWindow() {
  const p = content.privacy;
  const extra = `
    <span class="net-status">
      ${icon.wifi()}
      ${icon.airplane()}
    </span>`;
  const body = `
    <div class="privacy-chat">
      <p class="bubble bubble--you">${esc(p.question)}</p>
      ${typewriterMarkup(p.answer, 'p', 'bubble bubble--ai privacy-answer')}
    </div>
    <div class="privacy-foot">
      <span class="offline-badge privacy-badge"><span class="offline-dot"></span>${esc(p.badge)}</span>
      <span class="bytes"><span class="bytes-pulse" aria-hidden="true"></span>${esc(p.bytes)}</span>
    </div>`;
  return appWindow({ title: p.windowTitle, extra, body, className: 'privacy-window' });
}

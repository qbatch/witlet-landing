/**
 * Inline SVG icons. Strokes use pathLength="1" so CSS/GSAP can draw them
 * with stroke-dashoffset from 1 to 0. All icons are decorative.
 */

const svg = (body, className = 'icon', viewBox = '0 0 24 24') =>
  `<svg class="${className}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

const PILLARS = {
  target: '<circle cx="12" cy="12" r="8.5" pathLength="1"/><circle cx="12" cy="12" r="4.5" pathLength="1"/><path d="M12 12l6.5-6.5M15.5 5.5h3v3" pathLength="1"/>',
  proof: '<rect x="5" y="4.5" width="14" height="16" rx="2.5" pathLength="1"/><path d="M9.5 3.5h5v2.5h-5z" pathLength="1"/><path d="M8.5 13.2l2.4 2.4 4.6-4.9" pathLength="1"/>',
  gauge: '<path d="M4 16.5a8 8 0 1 1 16 0" pathLength="1"/><path d="M12 16.5l-3.6-4.2" pathLength="1"/><path d="M4 19.5h16" pathLength="1"/>',
  speech: '<path d="M5.5 4.5h13a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H11l-4.5 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5V6a1.5 1.5 0 0 1 1.5-1.5z" pathLength="1"/><path d="M8 9h8M8 12h5" pathLength="1"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5" pathLength="1"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" pathLength="1"/><path d="M12 14.5v2.5" pathLength="1"/>',
  rise: '<path d="M4 17.5l5.5-5.5 3.5 3.5 7-7" pathLength="1"/><path d="M15 8.5h5v5" pathLength="1"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3" pathLength="1"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3.5M8.5 20.5h7" pathLength="1"/>',
  photo: '<rect x="3.5" y="5" width="17" height="14" rx="2.5" pathLength="1"/><circle cx="9" cy="10" r="1.5" pathLength="1"/><path d="M3.5 16.5l4.2-4 3 2.8 3.2-3.3 6.6 4.5" pathLength="1"/>',
  chats: '<path d="M5 7h9.5A1.5 1.5 0 0 1 16 8.5V13H9.2L6.5 15.2V13H5A1.5 1.5 0 0 1 3.5 11.5v-3A1.5 1.5 0 0 1 5 7z" pathLength="1"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h8.5A1.5 1.5 0 0 1 20 5.5V11a1.5 1.5 0 0 1-1.5 1.5H18" pathLength="1"/>',
  keys: '<rect x="3" y="6" width="18" height="12" rx="2" pathLength="1"/><path d="M7 10h.01M12 10h.01M17 10h.01M8 14h8" pathLength="1"/>',
  meter: '<circle cx="12" cy="12" r="8" pathLength="1"/><path d="M12 12.5V7.5" pathLength="1"/>',
  models: '<path d="M4 7.5h16M4 12h16M4 16.5h10" pathLength="1"/>',
  doc: '<path d="M6.5 4.5A1.5 1.5 0 0 1 8 3h6l4.5 4.5v12A1.5 1.5 0 0 1 17 21H8a1.5 1.5 0 0 1-1.5-1.5z" pathLength="1"/><path d="M14 3v4.5h4.5M9.5 12.5h5M9.5 16h5" pathLength="1"/>',
  bolt: '<path d="M13.5 3L5.5 13.5h6l-1 7.5 8-10.5h-6z" pathLength="1"/>',
  share: '<path d="M12 14.5V3.5M8 7.5l4-4 4 4" pathLength="1"/><path d="M8.5 10.5H7A1.5 1.5 0 0 0 5.5 12v7A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17 10.5h-1.5" pathLength="1"/>',
};

export const icon = {
  pillar: (name) => svg(PILLARS[name], 'icon icon-draw'),
  check: (className = 'icon icon-check') => svg('<path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/>', className),
  arrowRight: () => svg('<path d="M5 12h14M13 6l6 6-6 6"/>', 'icon icon-arrow'),
  replay: () => svg('<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4h4"/>', 'icon'),
  menu: () => svg('<path class="menu-line menu-line--top" d="M4 8h16"/><path class="menu-line menu-line--bottom" d="M4 16h16"/>', 'icon'),
  lock: () => svg(PILLARS.lock, 'icon'),
  wifi: () =>
    svg(
      '<path class="wifi-arc wifi-arc--3" d="M2.5 9a14 14 0 0 1 19 0"/><path class="wifi-arc wifi-arc--2" d="M5.5 12.2a9.5 9.5 0 0 1 13 0"/><path class="wifi-arc wifi-arc--1" d="M8.6 15.3a5 5 0 0 1 6.8 0"/><circle class="wifi-dot" cx="12" cy="18.6" r="1.1" fill="currentColor" stroke="none"/>',
      'icon icon-wifi',
    ),
  airplane: () =>
    svg('<path d="M10.5 3.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V9l7 4v2l-7-2v4.5l2.5 2V21L12 20l-4 1v-1.5l2.5-2V13l-7 2v-2l7-4z"/>', 'icon icon-airplane'),
};

/** Wordmark glyph: the Witlet mark (the W, speech bubble and star on the app icon's tile).
 * public/witlet-mark.png comes from the Mac app's Branding/witlet/witlet-mark-128.png, rendered
 * by Scripts/brand/render.sh. Decorative: the link around it carries the name. */
export const logoMark = (src) =>
  `<img class="logo-mark" src="${src}" width="128" height="128" alt="" decoding="async" />`;


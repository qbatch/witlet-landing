import { esc } from '../lib/dom.js';

/**
 * Reusable macOS-style app window: traffic lights, title bar and a body.
 * Pure HTML/CSS, so it stays sharp at any size and follows the theme.
 * Windows are illustrations: wrap them in an aria-hidden stage and give
 * the scene a text equivalent.
 *
 * @param {{ title?: string, body: string, extra?: string, className?: string }} options
 *   body and extra are trusted HTML strings; title is escaped.
 */
export function appWindow({ title = '', body, extra = '', className = '' }) {
  return `
    <div class="window ${className}">
      <div class="window-bar">
        <span class="window-lights"><i></i><i></i><i></i></span>
        <span class="window-title">${esc(title)}</span>
        <span class="window-extra">${extra}</span>
      </div>
      <div class="window-body">${body}</div>
    </div>`;
}

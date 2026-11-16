/** Small DOM helpers. */

export const qs = (selector, root = document) => root.querySelector(selector);
export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Escapes text for safe use inside HTML templates. */
export function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Typewriter for an element rendered with typewriterMarkup(). The full text
 * stays in the DOM as an invisible "ghost", so the box keeps its final size
 * and nothing shifts while letters appear.
 * @returns {{ set(progress:number):void }}
 */
export function createTypewriter(el) {
  const live = el.querySelector('.type-live');
  const full = el.querySelector('.type-ghost').textContent;
  let shown = -1;
  return {
    set(progress) {
      const count = Math.round(Math.min(Math.max(progress, 0), 1) * full.length);
      if (count === shown) return;
      shown = count;
      live.textContent = full.slice(0, count);
      el.classList.toggle('is-typing', count > 0 && count < full.length);
    },
  };
}

/** Markup for a typewriter-ready text block, rendered in its final state. */
export function typewriterMarkup(text, tag = 'p', className = '') {
  return `<${tag} class="type ${className}"><span class="type-ghost">${esc(text)}</span><span class="type-live" aria-hidden="true">${esc(text)}</span></${tag}>`;
}

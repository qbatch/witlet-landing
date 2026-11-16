import { esc, qsa } from '../lib/dom.js';

/**
 * Accessible accordion (WAI-ARIA disclosure pattern): each question is a
 * button inside a heading, with aria-expanded and aria-controls pointing to
 * its answer region. Panels render open so the content works without JS;
 * initAccordion() collapses them.
 */
export function accordionMarkup(items, idPrefix) {
  return `
    <div class="accordion" data-accordion>
      ${items
        .map((item, i) => {
          const id = `${idPrefix}-${i}`;
          return `
        <div class="accordion-item" data-reveal style="--i:${i}">
          <h3 class="accordion-heading">
            <button class="accordion-trigger" type="button" id="${id}-q" aria-expanded="true" aria-controls="${id}-a">
              <span>${esc(item.q)}</span>
              <svg class="accordion-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>
            </button>
          </h3>
          <div class="accordion-panel" id="${id}-a" role="region" aria-labelledby="${id}-q">
            <p>${esc(item.a)}</p>
          </div>
        </div>`;
        })
        .join('')}
    </div>`;
}

export function initAccordion(root) {
  const triggers = qsa('.accordion-trigger', root);

  const setOpen = (trigger, open) => {
    trigger.setAttribute('aria-expanded', String(open));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !open;
  };

  triggers.forEach((trigger) => setOpen(trigger, false));

  const onClick = (event) => {
    const trigger = event.target.closest('.accordion-trigger');
    if (!trigger) return;
    setOpen(trigger, trigger.getAttribute('aria-expanded') !== 'true');
  };

  // Up/Down/Home/End move between questions, as the APG recommends.
  const onKeydown = (event) => {
    const index = triggers.indexOf(event.target);
    if (index === -1) return;
    const keys = {
      ArrowDown: (index + 1) % triggers.length,
      ArrowUp: (index - 1 + triggers.length) % triggers.length,
      Home: 0,
      End: triggers.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    triggers[keys[event.key]].focus();
  };

  root.addEventListener('click', onClick);
  root.addEventListener('keydown', onKeydown);
  return () => {
    root.removeEventListener('click', onClick);
    root.removeEventListener('keydown', onKeydown);
  };
}

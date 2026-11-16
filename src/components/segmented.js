import { esc, qsa } from '../lib/dom.js';

/**
 * Accessible single-choice control (WAI-ARIA radio group with roving
 * tabindex). Two looks: "track" (equal segments with a sliding thumb) and
 * "chips" (wrapping pills).
 *
 * labelId points at the visible label rendered next to the control.
 * @param {{ labelId: string, options: {value:string, label:string}[], value: string, variant?: 'track'|'chips' }} o
 */
export function segmentedMarkup({ labelId, options, value, variant = 'track' }) {
  const index = Math.max(0, options.findIndex((o) => o.value === value));
  return `
    <div class="segmented segmented--${variant}" role="radiogroup" aria-labelledby="${labelId}"
         style="--count:${options.length};--index:${index}">
      ${variant === 'track' ? '<span class="segmented-thumb" aria-hidden="true"></span>' : ''}
      ${options
        .map((o, i) => {
          const checked = i === index;
          return `<button type="button" class="segmented-option" role="radio" data-value="${esc(o.value)}"
            aria-checked="${checked}" tabindex="${checked ? 0 : -1}">${esc(o.label)}</button>`;
        })
        .join('')}
    </div>`;
}

/**
 * Wires keyboard and pointer behaviour. Selection follows focus, as for
 * native radio buttons. onChange(value) runs on every change.
 */
export function initSegmented(root, onChange) {
  const options = qsa('.segmented-option', root);

  const select = (index, { focus = false } = {}) => {
    options.forEach((option, i) => {
      const checked = i === index;
      option.setAttribute('aria-checked', String(checked));
      option.tabIndex = checked ? 0 : -1;
    });
    root.style.setProperty('--index', index);
    if (focus) options[index].focus();
    onChange(options[index].dataset.value);
  };

  const current = () => options.findIndex((o) => o.getAttribute('aria-checked') === 'true');

  const onClick = (event) => {
    const option = event.target.closest('.segmented-option');
    if (option && option.getAttribute('aria-checked') !== 'true') select(options.indexOf(option));
  };

  const onKeydown = (event) => {
    const last = options.length - 1;
    const i = current();
    const next = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, { focus: true });
  };

  root.addEventListener('click', onClick);
  root.addEventListener('keydown', onKeydown);
  return () => {
    root.removeEventListener('click', onClick);
    root.removeEventListener('keydown', onKeydown);
  };
}

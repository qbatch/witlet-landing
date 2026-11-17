/**
 * Scene 4 — "What can my Mac do?" Two radio groups (memory size, job)
 * drive a memory bar split into macOS / your apps / AI model / headroom.
 * Blocks move and resize with transforms only (translateX + scaleX from
 * the left edge). The result sentence cross-fades and is announced via
 * aria-live. On first view the bar builds up block by block. The shortlist
 * table below refreshes its cells and its rows settle in with a short fade.
 * Reduced motion: same interaction, instant changes.
 */
import { initSegmented } from '../components/segmented.js';
import { defaultJob, defaultMemory, formatGb, getEstimate, getShortlist, shortlistCell } from '../data/demo.js';
import { qs, qsa } from '../lib/dom.js';
import { DUR, GSAP_EASE, STAGGER, observeVisibility, prefersReducedMotion } from '../lib/motion.js';
import { gsap } from '../lib/tween.js';

const ORDER = ['os', 'apps', 'model', 'headroom'];

export function init(root) {
  const reduce = prefersReducedMotion();
  const bar = qs('.membar', root);
  const segs = Object.fromEntries(ORDER.map((key) => [key, qs(`[data-seg="${key}"]`, root)]));
  const seps = Object.fromEntries(ORDER.map((key) => [key, qs(`[data-sep="${key}"]`, root)]));
  const values = Object.fromEntries(ORDER.map((key) => [key, qs(`[data-legend="${key}"] .legend-value`, root)]));
  const sentenceBox = qs('.demo-sentence', root);
  const [memoryGroup, jobGroup] = qsa('[role="radiogroup"]', root);
  const state = { memory: defaultMemory, job: defaultJob };
  let sentence = qs('p', sentenceBox);
  const rows = qsa('.shortlist-table tbody tr', root);

  /** Start (percent of the bar) and share (0–1) for every block. */
  const layout = (est) => {
    let offset = 0;
    return ORDER.map((key) => {
      const gb = est.segments[key];
      const start = (offset / est.total) * 100;
      offset += gb;
      return { key, gb, start, share: gb / est.total };
    });
  };

  const moveBlocks = (est, { duration = DUR.slow, stagger = 0, delay = 0 } = {}) =>
    layout(est).forEach(({ key, start, share }, i) => {
      const timing = {
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay + i * stagger,
        ease: GSAP_EASE,
        overwrite: 'auto',
      };
      gsap.to(segs[key], { xPercent: start, scaleX: share, ...timing });
      if (seps[key]) gsap.to(seps[key], { xPercent: start, ...timing });
    });

  const swapSentence = (text) => {
    if (sentence.textContent === text) return;
    const previous = sentence;
    sentence = document.createElement('p');
    sentence.textContent = text;
    sentenceBox.append(sentence); // insertion is announced by aria-live
    if (reduce) {
      previous.remove();
      return;
    }
    gsap.to(previous, { autoAlpha: 0, y: -8, duration: DUR.fast, ease: 'power1.in', onComplete: () => previous.remove() });
    gsap.fromTo(sentence, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: DUR.med, ease: GSAP_EASE, delay: 0.1 });
  };

  const updateShortlist = () => {
    getShortlist(state.memory, state.job).forEach((option, i) => {
      qsa('[data-cell]', rows[i]).forEach((cell) => (cell.textContent = shortlistCell(option, cell.dataset.cell)));
    });
    if (!reduce) {
      gsap.fromTo(
        rows,
        { autoAlpha: 0.35, y: 4 },
        { autoAlpha: 1, y: 0, duration: DUR.med, stagger: STAGGER, ease: GSAP_EASE, overwrite: 'auto' },
      );
    }
  };

  const render = () => {
    const est = getEstimate(state.memory, state.job);
    moveBlocks(est);
    ORDER.forEach((key) => (values[key].textContent = formatGb(est.segments[key])));
    swapSentence(est.sentence);
    updateShortlist();
  };

  // Take over the pre-rendered inline transforms with GSAP's own values.
  const initial = getEstimate(state.memory, state.job);
  layout(initial).forEach(({ key, start, share }) => {
    gsap.set(segs[key], { x: 0, xPercent: start, scaleX: reduce ? share : 0 });
    if (seps[key]) gsap.set(seps[key], { x: 0, xPercent: reduce ? start : 0 });
  });

  // First view: blocks grow in from the left, one after another.
  let stopIntro = () => {};
  if (!reduce) {
    stopIntro = observeVisibility(bar, (visible) => {
      if (!visible) return;
      stopIntro();
      moveBlocks(getEstimate(state.memory, state.job), { duration: 0.9, stagger: STAGGER * 2, delay: 0.15 });
    });
  }

  const cleanups = [
    initSegmented(memoryGroup, (value) => {
      state.memory = Number(value);
      render();
    }),
    initSegmented(jobGroup, (value) => {
      state.job = value;
      render();
    }),
  ];

  return () => {
    stopIntro();
    cleanups.forEach((fn) => fn());
  };
}

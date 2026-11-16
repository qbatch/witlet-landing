/**
 * Scene 6 — Feature pillars. Cards fade up via data-reveal (main.js);
 * here each card's icon draws itself (stroke-dashoffset 1 → 0) as the
 * card arrives, stroke by stroke. Hover/focus lift is plain CSS.
 * Reduced motion: icons are simply drawn.
 */
import { qsa } from '../lib/dom.js';
import { GSAP_EASE, STAGGER, onEnterOnce, prefersReducedMotion } from '../lib/motion.js';
import { DRAW, gsap } from '../lib/tween.js';

export function init(root) {
  if (prefersReducedMotion()) return () => {};

  const items = qsa('.pillars-grid > li', root);
  const strokes = (item) => qsa('.icon-draw > *', item);
  items.forEach((item) => gsap.set(strokes(item), { strokeDashoffset: 1 }));

  return onEnterOnce(items, (item) => {
    const column = items.indexOf(item) % 3; // matches the card reveal stagger
    gsap.to(strokes(item), {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: GSAP_EASE,
      stagger: 0.14,
      delay: 0.3 + column * STAGGER,
      ...DRAW,
    });
  });
}

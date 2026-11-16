/**
 * Scene 2 — "Jargon to plain English". Chips drift gently (CSS, paused
 * off-screen). Scrolling through the stage scrubs a timeline:
 *   0.00–0.50  chips are pulled to the centre and collide
 *   0.42–0.60  they compress and dissolve
 *   0.55–0.95  the plain-English line resolves in their place
 * The scrub completes as the stage reaches the middle of the screen.
 * Reduced motion: CSS shows struck-through chips above the plain line.
 */
import { qs, qsa } from '../lib/dom.js';
import { GSAP_EASE, flagVisibility, prefersReducedMotion } from '../lib/motion.js';
import { gsap } from '../lib/tween.js';

export function init(root) {
  if (prefersReducedMotion()) return () => {};

  const stage = qs('.jargon-stage', root);
  const field = qs('.jargon-chips', root);
  const chips = qsa('.chip-wrap', root);
  const result = qs('.jargon-result', root);
  const stopFlag = flagVisibility(stage);

  // Offsets that bring each chip's centre to the field's centre. Uses
  // offset* (layout, transform-free), so re-measuring mid-scrub is safe.
  const toCentre = {
    x: (i, chip) => field.offsetWidth / 2 - (chip.offsetLeft + chip.offsetWidth / 2),
    y: (i, chip) => field.offsetHeight / 2 - (chip.offsetTop + chip.offsetHeight / 2),
  };

  const ctx = gsap.context(() => {
    gsap.set(result, { autoAlpha: 0, scale: 0.9, y: 12 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 75%',
          end: 'center 45%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      .to(chips, { ...toCentre, scale: 0.9, ease: 'power2.in', duration: 0.5, stagger: 0.015 }, 0)
      .to(chips, { scaleX: 0.25, scaleY: 0.5, autoAlpha: 0, ease: 'power2.in', duration: 0.18 }, 0.42)
      .to(result, { autoAlpha: 1, scale: 1, y: 0, ease: GSAP_EASE, duration: 0.4 }, 0.55);
  }, root);

  return () => {
    ctx.revert();
    stopFlag();
  };
}

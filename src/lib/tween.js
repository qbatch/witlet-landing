/**
 * GSAP-dependent helpers. Kept apart from motion.js so the boot bundle
 * stays GSAP-free; GSAP loads with the first scene that needs it.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
/**
 * Strokes use pathLength="1", so dash offsets live between 0 and 1. GSAP
 * rounds px values by default, which would snap them; spread this into
 * every stroke-dashoffset tween.
 */
export const DRAW = { autoRound: false };

export { gsap, ScrollTrigger };

/** Tweens a typewriter (see dom.js) from empty to full over `duration` seconds. */
export function typeIn(typer, duration, vars = {}) {
  const proxy = { p: 0 };
  typer.set(0);
  return gsap.to(proxy, { p: 1, duration, ease: 'none', ...vars, onUpdate: () => typer.set(proxy.p) });
}

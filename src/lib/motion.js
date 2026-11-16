/** Shared motion constants and observer utilities. */

/** GSAP twin of the CSS --ease-out curve, cubic-bezier(0.22, 1, 0.36, 1). */
export const GSAP_EASE = 'expo.out';
export const DUR = { fast: 0.2, med: 0.4, slow: 0.7 };
export const STAGGER = 0.07;

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion() {
  return reducedQuery.matches;
}

/**
 * Calls onChange(isVisible) whenever el enters or leaves the viewport.
 * @returns {() => void} disconnect
 */
export function observeVisibility(el, onChange, rootMargin = '0px') {
  const io = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting), { rootMargin });
  io.observe(el);
  return () => io.disconnect();
}

/** Pauses a GSAP timeline while el is off-screen, resumes it on return. */
export function pauseWhenHidden(el, timeline) {
  return observeVisibility(el, (visible) => (visible ? timeline.resume() : timeline.pause()));
}

/** Toggles .is-visible on el so CSS loops can pause via animation-play-state. */
export function flagVisibility(el) {
  return observeVisibility(el, (visible) => el.classList.toggle('is-visible', visible));
}

/**
 * Runs callback(el) once for each element, the first time it enters the
 * viewport (or comes within rootMargin of it).
 */
export function onEnterOnce(elements, callback, rootMargin = '0px 0px -10% 0px') {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        callback(entry.target);
      });
    },
    { rootMargin },
  );
  [...elements].forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Adds .is-in to each element once it enters; CSS does the fade-up. */
export function revealOnEnter(elements) {
  if (prefersReducedMotion()) {
    [...elements].forEach((el) => el.classList.add('is-in'));
    return () => {};
  }
  return onEnterOnce(elements, (el) => el.classList.add('is-in'));
}


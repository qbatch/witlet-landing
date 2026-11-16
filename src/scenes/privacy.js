/**
 * Scene 5 — Privacy, "Airplane mode". A real switch (role="switch").
 * On: Wi-Fi waves fade out from the outside in (CSS), the airplane and
 * Offline badge settle in, and the chat re-types its answer to show it
 * still works. "0 bytes sent" never changes; its dot pulses calmly while
 * on-screen. Off: the waves return; still nothing is sent.
 * Reduced motion: same states, no typing or pulse.
 */
import { createTypewriter, qs } from '../lib/dom.js';
import { flagVisibility, prefersReducedMotion } from '../lib/motion.js';
import { typeIn } from '../lib/tween.js';

export function init(root) {
  const toggle = qs('.switch', root);
  const status = qs('.switch-status', root);
  const typer = createTypewriter(qs('.privacy-answer', root));
  const reduce = prefersReducedMotion();
  const stopFlag = flagVisibility(root);
  let typing;

  const onClick = () => {
    const on = toggle.getAttribute('aria-checked') !== 'true';
    toggle.setAttribute('aria-checked', String(on));
    root.classList.toggle('is-offline', on);
    status.textContent = on ? status.dataset.on : status.dataset.off;
    if (on && !reduce) {
      typing?.kill();
      typing = typeIn(typer, 2.6, { delay: 0.5 });
    }
  };

  toggle.addEventListener('click', onClick);
  return () => {
    toggle.removeEventListener('click', onClick);
    typing?.kill();
    stopFlag();
  };
}

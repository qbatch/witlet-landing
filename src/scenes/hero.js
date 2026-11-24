/**
 * Scene 1 — Hero: Mac check, then the models it would recommend.
 * Plays once on load, then settles on the final frame (which is also the
 * static, reduced-motion version rendered in the HTML). A Replay button
 * appears afterwards.
 *
 * Choreography (seconds):
 *   0.0  window rises in                       0.35–1.75 scan line sweeps
 *   0.5  gauges stagger in, rings fill, numbers count up (1.3 s)
 *   2.0  verdict slides in, its check draws
 *   3.0  gauges fade out → model cards fade in
 *   4.2  the recommended card lifts and its badge pops
 */
import { qs, qsa } from '../lib/dom.js';
import { DUR, GSAP_EASE, STAGGER, pauseWhenHidden, prefersReducedMotion } from '../lib/motion.js';
import { DRAW, gsap } from '../lib/tween.js';

export function init(root) {
  if (prefersReducedMotion()) {
    root.classList.add('is-live');
    return () => {};
  }

  const el = {
    win: qs('.hero-window', root),
    scan: qs('.hv-scan', root),
    verdict: qs('.hv-verdict', root),
    verdictCheck: qs('.hv-verdict-icon path', root),
    check: qs('.hv-check', root),
    drive: qs('.hv-drive', root),
    gauges: qsa('[data-gauge]', root),
    rings: qsa('.gauge-fill', root),
    cardsWrap: qs('.hv-cards', root),
    cards: qsa('.hv-card', root),
    picked: qs('.hv-badge', root).closest('.hv-card'),
    badge: qs('.hv-badge', root),
    badgeCheck: qs('.hv-badge-check path', root),
    replay: qs('.replay', root),
  };
  const counters = qsa('[data-count]', root);
  const textValues = qsa('.gauge-value:not([data-count])', root);

  let timeline;
  let stopPausing = () => {};

  /** Puts every element at its start state (the HTML holds the end state). */
  function reset() {
    gsap.set(el.win, { autoAlpha: 0, y: 28, scale: 0.97 });
    gsap.set(el.scan, { autoAlpha: 0, xPercent: -100 });
    gsap.set(el.verdict, { autoAlpha: 0, y: -6 });
    gsap.set([el.verdictCheck, el.badgeCheck, ...el.rings], { strokeDashoffset: 1 });
    gsap.set(el.check, { autoAlpha: 1, scale: 1 });
    gsap.set(el.drive, { autoAlpha: 0 });
    gsap.set(el.gauges, { autoAlpha: 0, y: 10 });
    gsap.set(textValues, { autoAlpha: 0, scale: 0.8 });
    gsap.set(el.cards, { autoAlpha: 0, y: 14 });
    gsap.set(el.badge, { autoAlpha: 0, scale: 0.6 });
    counters.forEach((c) => (c.textContent = `0${c.dataset.suffix}`));
    el.cardsWrap.classList.remove('has-pick');
    el.picked.classList.remove('is-picked');
  }

  function build() {
    const tl = gsap.timeline({ defaults: { ease: GSAP_EASE, duration: DUR.slow } });

    tl.to(el.win, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 0)
      .to(el.scan, { autoAlpha: 1, duration: DUR.fast }, 0.35)
      .to(el.scan, { xPercent: 240, duration: 1.4, ease: 'power1.inOut' }, 0.35)
      .to(el.scan, { autoAlpha: 0, duration: 0.3 }, 1.45);

    tl.to(el.gauges, { autoAlpha: 1, y: 0, stagger: STAGGER }, 0.5).to(
      el.rings,
      {
        strokeDashoffset: (i, ring) => 1 - parseFloat(ring.style.getPropertyValue('--ratio')),
        duration: 1.3,
        ease: 'power2.out',
        stagger: STAGGER,
        ...DRAW,
      },
      0.6,
    );
    counters.forEach((counter) => {
      const proxy = { n: 0 };
      tl.to(
        proxy,
        {
          n: Number(counter.dataset.count),
          duration: 1.3,
          ease: 'power2.out',
          onUpdate: () => (counter.textContent = `${Math.round(proxy.n)}${counter.dataset.suffix}`),
        },
        0.6,
      );
    });
    tl.to(textValues, { autoAlpha: 1, scale: 1, duration: DUR.med }, 1.5)
      .to(el.verdict, { autoAlpha: 1, y: 0 }, 2.0)
      .to(el.verdictCheck, { strokeDashoffset: 0, duration: 0.6, ...DRAW }, 2.15);

    // The check gives way to the models this Mac would be offered.
    tl.to(el.check, { autoAlpha: 0, scale: 0.96, duration: DUR.med, ease: 'power2.in' }, 3.0)
      .fromTo(el.drive, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 3.3)
      .to(el.cards, { autoAlpha: 1, y: 0, stagger: STAGGER, clearProps: 'opacity,visibility,transform' }, 3.4);

    const pickAt = 4.3;
    tl.call(() => {
      el.cardsWrap.classList.add('has-pick');
      el.picked.classList.add('is-picked');
    }, null, pickAt)
      .to(el.badge, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, pickAt + 0.15)
      .to(el.badgeCheck, { strokeDashoffset: 0, duration: 0.5, ...DRAW }, pickAt + 0.4)
      .call(() => (el.replay.hidden = false), null, pickAt + 0.8);

    return tl;
  }

  function play() {
    timeline?.kill();
    stopPausing();
    reset();
    root.classList.add('is-live');
    timeline = build();
    stopPausing = pauseWhenHidden(root, timeline);
  }

  el.replay.addEventListener('click', play);
  play();

  return () => {
    el.replay.removeEventListener('click', play);
    stopPausing();
    timeline.kill();
  };
}

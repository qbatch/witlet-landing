/**
 * Scene 1 — Hero: "Mac check to test drive". Plays once on load, then
 * settles on the final frame (which is also the static, reduced-motion
 * version rendered in the HTML). A Replay button appears afterwards.
 *
 * Choreography (seconds):
 *   0.0  window rises in                       0.35–1.75 scan line sweeps
 *   0.5  gauges stagger in, rings fill, numbers count up (1.3 s)
 *   2.0  verdict slides in, its check draws
 *   3.0  gauges fade out → test drive fades in, cards stagger in
 *   3.9  each card "thinks" (live timer), then types at its own speed
 *   ~10  card B lifts, "Your pick" badge pops, check mark draws
 */
import { content } from '../content.js';
import { createTypewriter, qs, qsa } from '../lib/dom.js';
import { DUR, GSAP_EASE, STAGGER, pauseWhenHidden, prefersReducedMotion } from '../lib/motion.js';
import { DRAW, gsap, typeIn } from '../lib/tween.js';

const TYPE_START = 3.9;

export function init(root) {
  if (prefersReducedMotion()) {
    root.classList.add('is-live');
    return () => {};
  }

  const v = content.hero.visual;
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
    picked: qs('[data-card="B"]', root),
    badge: qs('.hv-badge', root),
    badgeCheck: qs('.hv-badge-check path', root),
    replay: qs('.replay', root),
  };
  const counters = qsa('[data-count]', root);
  const textValues = qsa('.gauge-value:not([data-count])', root);
  const cards = el.cards.map((card) => ({
    wait: Number(card.dataset.wait),
    typing: Number(card.dataset.typing),
    timer: qs('.hv-timer', card),
    typer: createTypewriter(qs('.type', card)),
  }));

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
    cards.forEach((c) => {
      c.typer.set(0);
      c.timer.textContent = v.waiting;
    });
  }

  function build() {
    const tl = gsap.timeline({ defaults: { ease: GSAP_EASE, duration: DUR.slow } });

    // a. Window appears; a soft scan line sweeps across it.
    tl.to(el.win, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 0)
      .to(el.scan, { autoAlpha: 1, duration: DUR.fast }, 0.35)
      .to(el.scan, { xPercent: 240, duration: 1.4, ease: 'power1.inOut' }, 0.35)
      .to(el.scan, { autoAlpha: 0, duration: 0.3 }, 1.45);

    // b. Gauges count up, then resolve into one plain sentence.
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

    // c. The check view gives way to the test drive.
    tl.to(el.check, { autoAlpha: 0, scale: 0.96, duration: DUR.med, ease: 'power2.in' }, 3.0)
      .fromTo(el.drive, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 3.3)
      // clearProps hands opacity/transform back to CSS for the pick state.
      .to(el.cards, { autoAlpha: 1, y: 0, stagger: STAGGER, clearProps: 'opacity,visibility,transform' }, 3.4);

    // Each card waits (live timer), then types at its own pace.
    let lastDone = 0;
    cards.forEach((c) => {
      const clock = { t: 0 };
      tl.to(
        clock,
        {
          t: c.wait,
          duration: c.wait,
          ease: 'none',
          onUpdate: () => (c.timer.textContent = `${v.waiting} ${clock.t.toFixed(1)} s`),
          onComplete: () => (c.timer.textContent = v.timer.replace('{s}', c.wait.toFixed(1))),
        },
        TYPE_START,
      );
      tl.add(typeIn(c.typer, c.typing), TYPE_START + c.wait);
      lastDone = Math.max(lastDone, TYPE_START + c.wait + c.typing);
    });

    // d. Card B is the pick: it lifts, the badge pops and its check draws.
    const pickAt = lastDone + 0.4;
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

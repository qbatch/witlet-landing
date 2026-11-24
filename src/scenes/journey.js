/**
 * Scene 3 — How it works. Desktop (≥ 900px): a sticky track.
 * ScrollTrigger maps the track's progress to the active step: the progress
 * line scrubs, the step list highlights, and the one app window cross-fades
 * to that step's pane, which then plays its own short animation:
 *   welcome → Mac check → your task → choose a model → chat.
 * Mobile: no pinning; steps reveal one by one (data-reveal in main.js).
 * Reduced motion: the static list plus the final (chat) pane.
 */
import { createTypewriter, qs, qsa } from '../lib/dom.js';
import { DUR, GSAP_EASE, STAGGER, prefersReducedMotion } from '../lib/motion.js';
import { ScrollTrigger, gsap, typeIn } from '../lib/tween.js';

const ratioOf = (el) => parseFloat(el.style.getPropertyValue('--ratio'));

/** One builder per pane. Each returns a fresh timeline for that pane. */
function paneBuilders(panes) {
  const [welcome, check, questions, models, chat] = panes;
  const ease = GSAP_EASE;

  return [
    () =>
      gsap.timeline().from(qsa('.pw-icon, .pane-title, .pane-text, .mock-btn', welcome), {
        autoAlpha: 0,
        y: 12,
        duration: DUR.slow,
        stagger: STAGGER,
        ease,
      }),

    () =>
      gsap
        .timeline()
        .fromTo(
          qsa('.meter-fill', check),
          { scaleX: 0 },
          { scaleX: (i, fill) => ratioOf(fill), duration: 1, stagger: 0.12, ease: 'power2.out' },
        )
        .from(qs('.pane-verdict', check), { autoAlpha: 0, y: 10, duration: DUR.slow, ease }, '-=0.3'),

    () =>
      gsap
        .timeline()
        .from(qs('.pane-title', questions), { autoAlpha: 0, y: 8, duration: DUR.med, ease })
        .from(qsa('.job-card', questions), { autoAlpha: 0, scale: 0.85, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' }, 0.1)
        .from(qs('.pane-caption', questions), { autoAlpha: 0, y: 8, duration: DUR.med, ease }, '-=0.15'),

    () =>
      gsap
        .timeline()
        .from(qsa('.pane-title, .model-row', models), { autoAlpha: 0, y: 10, duration: DUR.med, stagger: STAGGER, ease })
        .from(qs('.model-badge', models), { autoAlpha: 0, scale: 0.6, duration: 0.45, ease: 'back.out(2)' }, '-=0.2')
        .from(qs('.pane-foot', models), { autoAlpha: 0, y: 6, duration: DUR.med, ease }),

    () => {
      const reply = qs('.bubble--ai', chat);
      return gsap
        .timeline()
        .from(qs('.offline-badge', chat), { autoAlpha: 0, scale: 0.8, duration: DUR.med, ease: 'back.out(2)' })
        .from(qs('.bubble--you', chat), { autoAlpha: 0, y: 12, duration: DUR.med, ease }, 0.15)
        .from(reply, { autoAlpha: 0, y: 12, duration: DUR.med, ease }, 0.6)
        .add(typeIn(createTypewriter(reply), 2.4), 0.8);
    },
  ];
}

export function init(root) {
  if (prefersReducedMotion()) return () => {};

  const track = qs('.journey-track', root);
  const fill = qs('.journey-line-fill', root);
  const steps = qsa('.journey-step', root);
  const panes = qsa('.pane', root);
  const builders = paneBuilders(panes);
  const mm = gsap.matchMedia();

  mm.add('(min-width: 900px)', () => {
    let active = -1;
    let paneTimeline;

    const setActive = (index) => {
      if (index === active) return;
      active = index;
      steps.forEach((step, i) => {
        step.classList.toggle('is-active', i === index);
        step.classList.toggle('is-done', i < index);
      });
      panes.forEach((pane, i) => pane.classList.toggle('is-active', i === index));
      // Finish (not just stop) the previous pane so its .from() tweens
      // leave elements at their final values before they are re-recorded.
      paneTimeline?.progress(1).kill();
      paneTimeline = builders[index]();
    };

    root.classList.add('is-pinned');
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: 0.3 } },
    );
    const stepAt = (progress) => Math.min(steps.length - 1, Math.floor(progress * steps.length));
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setActive(stepAt(self.progress)),
    });
    setActive(stepAt(trigger.progress));

    return () => {
      paneTimeline?.progress(1).kill();
      root.classList.remove('is-pinned');
      steps.forEach((step) => step.classList.remove('is-active', 'is-done'));
      panes.forEach((pane, i) => pane.classList.toggle('is-active', i === panes.length - 1));
    };
  });

  return () => mm.revert();
}

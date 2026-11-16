/**
 * Boot: styles, header, FAQ, reveals and the scene registry.
 *
 * Theme: light/dark follow the system via prefers-color-scheme in
 * tokens.css, so no script is needed and nothing flashes.
 *
 * Scenes are lazy: each [data-scene] section imports its module (and GSAP
 * with it) only when it comes within ~600px of the viewport.
 */
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

import { initAccordion } from './components/accordion.js';
import { qs, qsa } from './lib/dom.js';
import { observeVisibility, onEnterOnce, revealOnEnter } from './lib/motion.js';

const scenes = {
  hero: () => import('./scenes/hero.js'),
  jargon: () => import('./scenes/jargon.js'),
  journey: () => import('./scenes/journey.js'),
  demo: () => import('./scenes/demo.js'),
  pillars: () => import('./scenes/pillars.js'),
  privacy: () => import('./scenes/privacy.js'),
  cta: () => import('./scenes/cta.js'),
};

const cleanups = [];

function initScenes() {
  const roots = qsa('[data-scene]');
  cleanups.push(
    onEnterOnce(
      roots,
      async (root) => {
        try {
          const { init } = await scenes[root.dataset.scene]();
          cleanups.push(init(root));
        } catch (error) {
          // Show the static final state rather than an empty stage.
          root.classList.add('is-live');
          console.error(`Scene "${root.dataset.scene}" failed to start.`, error);
        }
      },
      '600px 0px',
    ),
  );
}

function initHeader() {
  const header = qs('[data-header]');
  const toggle = qs('.menu-toggle', header);
  const menu = qs('#mobile-menu');

  // Blurred background once the page has scrolled past the top.
  cleanups.push(
    observeVisibility(qs('.scroll-sentinel'), (atTop) => header.classList.toggle('is-scrolled', !atTop)),
  );

  const setOpen = (open) => {
    menu.hidden = !open;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

/** "Join the waitlist" links also move keyboard focus to the email field. */
function initWaitlistLinks() {
  const email = qs('#wl-email');
  document.addEventListener('click', (event) => {
    if (event.target.closest('a[href="#waitlist"]')) email.focus({ preventScroll: true });
  });
}

initHeader();
initWaitlistLinks();
cleanups.push(initAccordion(qs('[data-accordion]')));
cleanups.push(revealOnEnter(qsa('[data-reveal]')));
initScenes();
document.documentElement.classList.add('is-booted');

if (import.meta.hot) {
  import.meta.hot.dispose(() => cleanups.forEach((cleanup) => cleanup()));
}

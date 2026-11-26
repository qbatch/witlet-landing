# Witlet — landing page

Marketing site for **Witlet** (**Witlet: Private AI Assistant** on the Mac App Store), a native macOS app. It checks the Mac, shows
which private offline models fit the job you want, and sets one up. Chat,
dictation and pictures stay on the Mac. There is no account and no in-app
subscription.

Vite + vanilla JavaScript. One runtime dependency: `gsap` (ScrollTrigger included).
No CSS framework, no images/videos/Lottie, no web fonts. Every graphic is HTML,
CSS or inline SVG.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serves dist/ at http://localhost:4173
```

Requires Node 20.19+ or 22.12+ (Vite 8).

## Project structure

```
witlet-landing/
├── index.html                # semantic shell: <section>s with ids + data-scene, render markers
├── vite.config.js            # base path from VITE_BASE_PATH + the pre-render plugin
├── .env.example              # VITE_WAITLIST_ENDPOINT, VITE_BASE_PATH
├── public/
│   ├── favicon.png           # Witlet mark, 64 px (from the Mac app's Branding/witlet)
│   ├── apple-touch-icon.png  # Witlet app icon tile, 180 px
│   ├── witlet-mark.png       # header and footer logo, 128 px
│   └── og-image.txt          # replace with og-image.png (1200×630) before launch
└── src/
    ├── main.js               # boot: styles, header, FAQ, reveals, lazy scene registry
    ├── config.js             # name, prices, requirements, links, site URL
    ├── content.js            # ALL page copy
    ├── data/demo.js          # Scene 4 mapping (memory × job → bar + sentence)
    ├── lib/
    │   ├── motion.js         # easing/durations, reduced-motion check, observers, reveal
    │   ├── tween.js          # GSAP + ScrollTrigger registration, typeIn(), DRAW
    │   ├── dom.js            # qs/qsa, esc, typewriter helpers
    │   └── waitlist.js       # submitWaitlist(), isValidEmail()
    ├── components/
    │   ├── appWindow.js      # reusable macOS-style window markup
    │   ├── accordion.js      # accessible FAQ (markup + behaviour)
    │   └── segmented.js      # accessible radio-group control (markup + behaviour)
    ├── templates/            # section markup, pre-rendered into index.html
    │   ├── index.js          # region map + renderPage()
    │   ├── chrome.js         # <head> meta, header, footer
    │   ├── sections.js       # one function per section
    │   ├── visuals.js        # scene illustrations (final-state markup)
    │   └── icons.js          # inline SVG icons
    ├── scenes/               # one module per signature scene; init(root) → cleanup
    │   ├── hero.js  jargon.js  journey.js  demo.js  privacy.js  pillars.js  cta.js
    └── styles/
        ├── tokens.css        # colours (light/dark), type scale, spacing, radii, shadows, easing
        ├── base.css          # reset, typography, layout utilities, focus, reveal
        ├── components.css    # buttons, cards, app window, forms, accordion, segmented, switch
        └── sections.css      # per-section layout and scene styles
```

### Changes from the suggested structure, and why

- **`src/templates/` (added).** A small Vite plugin in `vite.config.js` replaces
  `<!-- render:name -->` markers in `index.html` with real HTML built from
  `content.js` at dev and build time. The page therefore ships as plain HTML:
  the headline shows on first paint, there is no layout shift, search engines see
  all copy, and everything is readable even if JavaScript fails.
- **`src/lib/tween.js` (added).** Holds the GSAP imports, so the boot bundle
  stays GSAP-free. GSAP loads with the first scene that needs it.
- **Pinned section uses CSS `position: sticky`** inside a 250vh track, with
  ScrollTrigger mapping scroll progress to steps. That avoids ScrollTrigger's
  pin-spacer (which shifts layout when a lazily-loaded scene starts) and keeps
  scrolling native.

## Editing

| What | Where |
| --- | --- |
| Product name, company, prices, requirements, footer links, site URL | `src/config.js` |
| Any words on the page (headlines, FAQ, form messages, meta description) | `src/content.js` |
| Job cards (used by the journey and the demo) | `jobs` in `src/content.js` |
| Demo outcomes per memory size/job | `src/data/demo.js` |
| Colours, type sizes, spacing, shadows, easing | `src/styles/tokens.css` |

Copy edits restart the dev server automatically (the content files are
dependencies of `vite.config.js`). Copy rules: plain, warm English; no
"LLM / tokens / quantization / parameters / GPU / inference / VRAM"; describe
outcomes, not specs; no testimonials, ratings, user counts, press logos or
benchmark numbers; say "other apps", not competitor names; no Apple logos.

## Waitlist endpoint

The site no longer shows a waitlist form. The app is finished, and the last
section points at the Mac App Store (`config.appStore`). `src/lib/waitlist.js`
is still here if a form comes back. It sends a JSON `POST` to `VITE_WAITLIST_ENDPOINT`:

```json
{ "email": "person@example.com", "job": "write", "source": "landing-page" }
```

1. Copy `.env.example` to `.env` and set `VITE_WAITLIST_ENDPOINT=https://…`.
2. Any 2xx response counts as success; anything else shows the error message.
3. The endpoint must allow CORS from your site's origin.

With no endpoint set, submissions are **simulated locally**: nothing leaves the
browser. A filled honeypot field (`website`) also returns success without
sending. The page never logs form data.

Works with your own API, a serverless function, Formspree, Basin, or a
mailing-list provider's JSON endpoint.

## Deploying `dist/`

Set environment variables in the host's dashboard (Vite inlines them at build time).

### GitHub Pages (production)

The site and the Mac app's model catalog are served from GitHub Pages at
`https://witlet.lixul.com`. `.github/workflows/deploy-pages.yml` builds and
deploys `dist/` on every push to `main`, and can be run by hand from the
*Actions* tab.

1. In the repository, open *Settings ▸ Pages* and set *Source* to **GitHub Actions**.
2. Under *Custom domain*, enter `witlet.lixul.com` and save. At the DNS provider for
   `lixul.com`, add a `CNAME` from `witlet` to `ali-mustafa-qbatch.github.io`.
   No `CNAME` file is needed: Pages ignores it for sites deployed by a workflow.
3. Once the certificate is issued, turn on **Enforce HTTPS**.

The workflow reads the base path from Pages, so the build is right for the custom
domain (`/`) and for `https://ali-mustafa-qbatch.github.io/witlet-landing/` alike.
Links to the policy and support pages end in `.html` (`/privacy.html`, `/terms.html`,
`/support.html`), the files Pages serves, and the canonical URLs match. The Mac app
links to the same addresses.

Pages doesn't read `public/_headers`. It serves the catalog as `application/json`
with its own short cache and an ETag, so the app's daily check is usually answered
with `304 Not Modified`, and a new catalog reaches everyone within minutes.

### Model catalog (`public/catalog/v1.json`)

The Witlet Mac app reads `https://witlet.lixul.com/catalog/v1.json` at most once a day. It only uses the file if its signature matches a key built into the app. Otherwise it keeps its built-in catalog.

- **Never edit `v1.json` by hand.** Any change breaks the signature. Make it in the Mac app repo with `node Scripts/publish-catalog.mjs --key-id 2026-11`, then commit and push this repo.
- **Never move or rename it.** Every shipped copy of the app keeps reading that exact path. A future format would go next to it as `v2.json`.
- `npm run build` runs `scripts/check-catalog.mjs`, which checks the signature against `catalog-keys.json` (public keys only). If the file is missing, edited or signed with an unknown key, the build fails, nothing is deployed, and Pages keeps serving the last good site. Run `npm run check:catalog` to check `public/` without building.

### Other hosts

- **Cloudflare Pages** or **Netlify**: build command `npm run build`, output
  directory `dist`. Both apply `public/_headers` (the catalog's content type and a
  5-minute cache).

Whichever host serves `witlet.lixul.com`, the catalog must stay at
`https://witlet.lixul.com/catalog/v1.json`, and the policy pages at their `.html`
addresses: shipped copies of the Mac app open them.

## Design and motion

**Visual direction.** Calm and native: near-white / near-black neutrals, one
teal-green accent meaning "fits safely" (used only for CTAs, highlights and
progress), system fonts with tight display headings, and macOS-style app windows
as the centrepiece. Each section has one motion moment that explains the
product. Easing is `cubic-bezier(0.22, 1, 0.36, 1)` (GSAP `expo.out`), with
200–700 ms durations and a 70 ms stagger. Only `transform`, `opacity` and SVG
`stroke-dashoffset` animate.

| Scene | Trigger | Sequence | Reduced motion / no JS |
| --- | --- | --- | --- |
| 1 Hero | page load, once | window rises (0.9 s) → scan line sweeps (1.4 s) → three gauges fill and count up (1.3 s) → verdict + check (0.6 s) → morphs into the model list → cards settle → B lifts, "Recommended" badge pops, check draws → Replay button. Pauses off-screen. | Final frame: verdict, three models, B recommended |
| 2 Jargon | scroll (scrubbed) | jargon chips drift (CSS, paused off-screen) → pulled to centre and collide → compress and dissolve → plain line resolves | Struck-through chips above the plain line |
| 3 How it works | scroll, ≥900 px | 200vh sticky track; progress line scrubs; active step highlights; window cross-fades per step and plays that pane: welcome, Mac check, job cards, model list, chat streams | Full step list + chat pane. Mobile: vertical timeline with reveals |
| 4 Demo | click / keys | memory bar blocks move and resize (700 ms); sentence cross-fades and is announced; first view builds the bar block by block | Same interaction, instant |
| 5 Privacy | switch | Wi-Fi arcs fade outside-in; airplane and Offline badge settle in; answer re-types; "0 bytes sent" dot pulses calmly | Same states, no typing or pulse |
| 6 Pillars | reveal | cards fade up with stagger; icons draw stroke by stroke; lift on hover/focus | Icons drawn, cards visible |
| 7 CTA | on-screen | three soft accent gradients drift slowly (28–40 s) behind the download card | No drift |

Scenes initialise lazily when within ~600 px of the viewport, and loops pause
off-screen. Each scene has an `sr-only` text description; illustrations are
`aria-hidden`.

## Verified

- `npm run build` succeeds. JS is about 57 KB gzipped in total (GSAP ≈ 45 KB, loaded
  lazily); CSS 9.5 KB.
- 1440×900 and 375×812: no horizontal scroll; hero, pinned story (desktop) and
  timeline (mobile), demo, privacy switch, FAQ and form all work.
- Light and dark themes.
- Reduced motion (headless Chrome `--force-prefers-reduced-motion`): every scene
  shows its readable final state; no pinning.
- Keyboard: skip link, header, segmented controls (arrows, Home/End, one tab
  stop each), switch, accordion, form with announced errors.
- No console errors or warnings on the production build.
- **Not run:** Lighthouse, and screen-reader testing (VoiceOver). Do both before launch.

## Before launch: placeholders and TODOs

- [ ] Mac App Store URL → `config.appStore` (the download section tells people to search until this is set).
- [ ] Support email → `config.supportEmail` (the support page shows it when set).
- [ ] Create `public/og-image.png` (1200×630) and delete `public/og-image.txt`.
- [ ] Have the privacy policy and terms reviewed before the App Store submission.
- [ ] Review the illustrative numbers: hero gauges (16 GB, 212 GB free) and the model sizes in the hero and journey ("About 2/3/4 GB"). The demo's memory split in `src/data/demo.js` is shared with the Mac app and must stay in lockstep with it.
- [ ] Run Lighthouse (target 95+ for Performance, Accessibility, SEO) and a VoiceOver pass.

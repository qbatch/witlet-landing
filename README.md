# Headroom — landing page

Marketing site and waitlist for **Headroom** (working name), a native macOS app
that picks a private, offline AI model for your job, proves it on your own
example and sets it up without technical questions.

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
headroom-landing/
├── index.html                # semantic shell: <section>s with ids + data-scene, render markers
├── vite.config.js            # base path from VITE_BASE_PATH + the pre-render plugin
├── .env.example              # VITE_WAITLIST_ENDPOINT, VITE_BASE_PATH
├── public/
│   ├── favicon.svg
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
| Job cards (used by journey, demo and form select) | `jobs` in `src/content.js` |
| Demo outcomes per memory size/job | `src/data/demo.js` |
| Colours, type sizes, spacing, shadows, easing | `src/styles/tokens.css` |

Copy edits restart the dev server automatically (the content files are
dependencies of `vite.config.js`). Copy rules: plain, warm English; no
"LLM / tokens / quantization / parameters / GPU / inference / VRAM"; describe
outcomes, not specs; no testimonials, ratings, user counts, press logos or
benchmark numbers; say "other apps", not competitor names; no Apple logos.

## Waitlist endpoint

`src/lib/waitlist.js` sends a JSON `POST` to `VITE_WAITLIST_ENDPOINT`:

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

### Cloudflare Pages (production)

The site and the Mac app's model catalog are served from Cloudflare Pages at
`https://headroom.qbatch.com`.

1. In Cloudflare, go to *Workers & Pages ▸ Create ▸ Pages ▸ Connect to Git* and choose this repository.
2. Use these build settings: framework preset **None** (or Vite), build command `npm run build`, output directory `dist`. Node comes from `.nvmrc`.
3. In *Custom domains*, add `headroom.qbatch.com`. If `qbatch.com` uses Cloudflare DNS, the record is created for you. Otherwise, add a `CNAME` from `headroom` to `<project>.pages.dev` at your DNS provider.
4. Every push to the production branch deploys. Pull requests get preview URLs.

`public/_headers` sets the catalog's content type and a 5-minute cache. Cloudflare adds ETags, so the app's daily check is usually answered with `304 Not Modified`.

### Model catalog (`public/catalog/v1.json`)

The Headroom Mac app reads `https://headroom.qbatch.com/catalog/v1.json` at most once a day. It only uses the file if its signature matches a key built into the app. Otherwise it keeps its built-in catalog.

- **Never edit `v1.json` by hand.** Any change breaks the signature. Make it in the Mac app repo with `node Scripts/publish-catalog.mjs --key-id 2026-11`, then commit and push this repo.
- **Never move or rename it.** Every shipped copy of the app keeps reading that exact path. A future format would go next to it as `v2.json`.
- `npm run build` runs `scripts/check-catalog.mjs`, which checks the signature against `catalog-keys.json` (public keys only). If the file is missing, edited or signed with an unknown key, the build fails and Cloudflare keeps serving the last good deploy. Run `npm run check:catalog` to check `public/` without building.

### Other hosts

- **Netlify**: build command `npm run build`, publish directory `dist`.
- **Vercel**: framework preset "Vite" (build `npm run build`, output `dist`).
- **GitHub Pages**: for a project site at `https://<user>.github.io/<repo>/`, build
  with `VITE_BASE_PATH=/<repo>/ npm run build` and publish `dist/` (for example with
  the `actions/upload-pages-artifact` + `actions/deploy-pages` workflow). A custom
  domain or user site needs no base path.

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
| 1 Hero | page load, once | window rises (0.9 s) → scan line sweeps (1.4 s) → three gauges fill and count up (1.3 s) → verdict + check (0.6 s) → morphs into test drive → A/B/C each "think" with a live timer, then type at different speeds → B lifts, "Your pick" badge pops, check draws → Replay button. Pauses off-screen. | Final frame: verdict, all three answers, B picked |
| 2 Jargon | scroll (scrubbed) | jargon chips drift (CSS, paused off-screen) → pulled to centre and collide → compress and dissolve → plain line resolves | Struck-through chips above the plain line |
| 3 How it works | scroll, ≥900 px | 250vh sticky track; progress line scrubs; active step highlights; window cross-fades per step and plays that pane: welcome, meters fill, job cards pop, downloads fill, cards type, check draws, chat streams | Full step list + chat pane. Mobile: vertical timeline with reveals |
| 4 Demo | click / keys | memory bar blocks move and resize (700 ms); sentence cross-fades and is announced; first view builds the bar block by block | Same interaction, instant |
| 5 Privacy | switch | Wi-Fi arcs fade outside-in; airplane and Offline badge settle in; answer re-types; "0 bytes sent" dot pulses calmly | Same states, no typing or pulse |
| 6 Pillars | reveal | cards fade up with stagger; icons draw stroke by stroke; lift on hover/focus | Icons drawn, cards visible |
| 7 CTA | on-screen | three soft accent gradients drift slowly (28–40 s); success: label lifts away, check mark draws | No drift; instant states |

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

- [ ] Final product name → `config.productName` (currently the placeholder "Headroom").
- [ ] Production URL → `config.siteUrl` (canonical + Open Graph; currently `https://example.com`).
- [ ] Privacy policy and contact links → `config.links` (currently `#`).
- [ ] Create `public/og-image.png` (1200×630) and delete `public/og-image.txt`.
- [ ] Set `VITE_WAITLIST_ENDPOINT` (submissions are simulated until then) and confirm CORS.
- [ ] Write a privacy policy that covers the waitlist email.
- [ ] Confirm the FAQ download-size answer ("usually a few gigabytes each") with engineering.
- [ ] The FAQ question "How is this different from ChatGPT?" names a product because
      the brief listed it verbatim; the answer doesn't name or disparage it. Decide
      whether to keep it or reword it to "online AI chat services".
- [ ] Review the illustrative numbers: hero gauges (16 GB, 212 GB free), hero/journey
      timers (0.9 / 1.8 / 2.6 s), shortlist sizes ("About 2/5/6 GB") and the demo's
      memory split in `src/data/demo.js`. All are labelled or framed as examples;
      make sure they stay conservative.
- [ ] Planned pricing ($24.99 one-time Pro) is labelled "Planned pricing"; update when final.
- [ ] Run Lighthouse (target 95+ for Performance, Accessibility, SEO) and a VoiceOver pass.

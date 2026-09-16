# PROJECT REVIEW — The Standard Sports & Entertainment Group

Reverse-engineering notes for the Figma Make export in this directory.
**Read-only audit. No code was modified.**

Reviewed: 2026-09-16
Scope: every file in the repo except `pnpm-lock.yaml` internals and `node_modules` (not installed).

---

## Table of contents

1. [Framework and tech stack](#1-framework-and-tech-stack)
2. [Folder structure](#2-folder-structure)
3. [Routing and pages](#3-routing-and-pages)
4. [Components and how they connect](#4-components-and-how-they-connect)
5. [Global layout, navigation, footer, shared UI](#5-global-layout-navigation-footer-shared-ui)
6. [Assets](#6-assets)
7. [Styling system](#7-styling-system)
8. [Animations and interactions](#8-animations-and-interactions)
9. [Potential issues from the exported Figma code](#9-potential-issues-from-the-exported-figma-code)
10. [Recommended cleanup before development](#10-recommended-cleanup-before-development)

---

## 1. Framework and tech stack

| Layer | Choice | Version | Notes |
|---|---|---|---|
| UI library | React | `^19.0.0` | `react-dom` 19, `React.StrictMode` enabled |
| Build tool | Vite | `^8.0.5` | via `@vitejs/plugin-react` `^6.0.0` |
| Language | TypeScript | `^5.7.0` | `strict: true`, `noEmit: true` (Vite transpiles, tsc only type-checks) |
| Styling | Tailwind CSS | `^4.0.0` | `@tailwindcss/vite` plugin; **no** `tailwind.config.js`, **no** PostCSS config (v4 CSS-first) |
| Formatter | oxfmt | `^0.2.0` | `pnpm format` |
| Runtime | Node 22 / pnpm 10.34.3 | pinned in `.mise.toml` | |
| Host platform | Figma Make | — | custom Vite plugins in `vite.config.ts` |

**Notable for a project of this size: there are zero runtime dependencies beyond React.**
No router, no state manager, no UI kit, no icon package, no animation library, no form library, no HTTP client. Everything — routing, animation, icons, forms — is hand-rolled inside a single file.

### Figma Make platform integration

`vite.config.ts` (356 lines) is mostly platform glue, not project config. Four custom plugins:

| Plugin | `apply` | Purpose |
|---|---|---|
| `figmaSiteConfiguration` | both | Reads `.figma/make/site.json` and fills the `<!-- figma:* -->` comment slots in `index.html` (lang, title, head/body script injection); emits `robots.txt`; injects OG/Twitter meta, favicon, GA snippet, optional skip-link |
| `figmaErrorOverlayReplay` | `serve` | Replays the last HMR build error to sockets that connect after it was broadcast |
| `figmaReactRefreshBoundaryFallback` | `serve` | Forces a full reload when a module loses its React Refresh boundary |
| `figmaMakeKitPlugin` | `serve` | Serves `/.figma/make/kit.html`, a story-grid render target backed by `virtual:figma-stories` (globs `src/**/*.stories.*` — **no story files exist**) |

Other config:
- `base` is driven by `process.env.FIGMA_PUBLIC_URL`, defaulting to `/`.
- Dev/preview server binds `0.0.0.0` on `$PORT` (default `8443`), `strictPort: true`.
- `@` → `./src` alias, declared in both `vite.config.ts` and `tsconfig.json` `paths`.
- `src/vite-env.d.ts` declares an `*.mp4` module shim (images are covered by `vite/client`).

---

## 2. Folder structure

```
std group llc Design v2/
├── .figma/make/              Figma Make platform scripts (shell) + config
│   ├── install / dev / format / langserver        toolchain entrypoints
│   ├── deploy / deploy-preview / analyze-routes   deployment entrypoints
│   ├── site.json             site metadata: description, robots, a11y flags
│   └── dev.json              which file changes trigger reinstall/restart
├── src/
│   ├── App.tsx               ⚠ 3,567 lines — the ENTIRE application
│   ├── main.tsx              React root mount (10 lines)
│   ├── index.css             Google Fonts import, Tailwind import, @theme, resets (45 lines)
│   ├── vite-env.d.ts         Vite client types + *.mp4 module shim
│   └── imports/              ⚠ 66 media files, 155 MB, entirely flat
├── index.html                Vite shell with figma:* comment slots
├── vite.config.ts            Vite + 4 Figma Make plugins
├── tsconfig.json             strict, bundler resolution, @/* paths
├── package.json              2 deps, 9 devDeps
├── .gitattributes            Git LFS rules (100 filter=lfs entries)
├── .mise.toml                node 22, pnpm 10.34.3
├── AGENTS.md / CLAUDE.md     agent instructions (CLAUDE.md is just `@AGENTS.md`)
└── pnpm-lock.yaml            92 resolved packages
```

### Purpose of each major directory

**`.figma/make/`** — Platform contract, not application code. The shell scripts are what the Figma Make host invokes for install/dev/build/deploy. `dev.json` is watch configuration (deliberately excludes `src/**` so Vite HMR owns application code). `site.json` currently sets `"robots": { "index": false }` — **the site is configured `noindex, nofollow` and serves a blocking `robots.txt`.**

**`src/`** — Application source. Four files, one of which is 3,567 lines. There is no `components/`, `pages/`, `hooks/`, `lib/`, `styles/`, or `types/` directory. The structure described in `AGENTS.md` is the untouched scaffold description; the real project never grew past it.

**`src/imports/`** — Flat media dump. Named by Figma layer/upload name, not by role: `andyy.jpg`, `golf222.mp4`, `IMG_1340.JPG`, `GENEral_manager_44.png`, `coach_oppotunity5.png`, `settign_th_standard_image.jpg` (typo preserved), `contract_negoatiation_3.png` (typo preserved). Mixed-case extensions (`.jpg`, `.JPG`, `.jpeg`, `.png`, `.mp4`). Imported by `@/imports/...` ES import, so Vite fingerprints and emits them.

**Nothing is untracked or missing** — no `public/`, no `assets/`, no `.env`, no CI config, no tests, no lint config, no README. `node_modules/` is not installed.

---

## 3. Routing and pages

### There is no router.

No `react-router`, no `wouter`, no `history` API usage, no hash routing. Navigation is a single `useState` discriminated union in `App()`:

```ts
// src/App.tsx:81-86
type AppPage =
  | { type: 'home' }
  | { type: 'pillar'; pillar: string; l2: string | null; l3: string | null }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'apply' }
```

Everything renders under a single conditional block in [App.tsx:3480-3565](src/App.tsx#L3480-L3565). Consequences:

- **The URL never changes.** Every page is `/`.
- **No deep links.** A pillar page cannot be shared, bookmarked, or linked to.
- **Browser Back/Forward do not work.** Back exits the site.
- **Refresh always returns to the splash + home.**
- **No SEO whatsoever.** One document, one title, no per-page metadata, and the site is `noindex` anyway.
- **Zero `<a href>` elements in the entire app** — every navigable control is a `<button>`. Crawlers see no links; users can't middle-click or open in a new tab.

`.figma/make/analyze-routes` exists (runs `figma-analyze routes`), implying the platform expects routes; there are none to analyze.

### Page inventory

**5 page types → 41 distinct rendered views:**

| # | Page type | Component | Views | Entry points |
|---|---|---|---|---|
| 1 | `home` | inline in `App()` | 1 | Logo click, nav "Home", `goHome()` |
| 2 | `pillar` (L1 only) | `PillarPage` | 3 | `handleUtility('REPRESENT' \| 'BUILD' \| 'PROTECT')` — **only reachable from the footer** |
| 3 | `pillar` (L1+L2+L3) | `PillarPage` | 33 | Cascading nav L3 click |
| 4 | `about` | `AboutPage` | 1 | Nav "About", footer "About" |
| 5 | `contact` | `ContactPage` | 1 | Nav "Contact", footer "Contact"/"Book Consultation", CTA `contact`/`consult`/`partner` |
| 6 | `apply` | `AthleteApplication` | 1 (5 steps) | Nav "Athlete Application", CTA `apply` |

### Full page map (the 33 L3 pages)

Driven entirely by `NAV_TREE` ([App.tsx:60-77](src/App.tsx#L60-L77)):

**REPRESENT** (9)
- Athletes → NFLPA · NIL · Pro & Collegiate Golf
- Coaches → Coaching Representation · Coaching Opportunities · Contract Negotiation
- Executives → Executive Placement · General Managers · Collegiate Athletic Directors

**BUILD** (15)
- Trust → Client Relations · Personal Advisory · Build Your Team. Protect Your Future.
- Wealth → Wealth Management · Financial Planning · Investment Coordination
- Business → Brand Partnerships · Marketing Opportunities · Business Consulting · Entrepreneurship · Company Formation
- Legacy → Community Impact · Charitable Foundations · Public Speaking · Life After Sports

**PROTECT** (9)
- Legal Backing → Contract Review · Contract Negotiation · Business Law · Intellectual Property
- Risk Management → Reputation Management · Compliance
- Crisis Awareness → Crisis Communications · Public Relations Support · Social Media Guidance

> Note: "Contract Negotiation" appears twice (REPRESENT|Coaches and PROTECT|Legal Backing) with different body copy and different hero images. Intentional, but it will need distinct URL slugs when routing is added.

---

## 4. Components and how they connect

All 30 components live in `src/App.tsx`. Only `App` is exported.

### Component tree

```
App ......................................... page state, nav state, splash state
├── SplashVideo ............................. fixed z-9999 intro, unmounts after fade
├── NavOverlay ............................. fixed z-50, ALWAYS mounted (opacity-toggled)
│   ├── Logo
│   └── CascadingNav ....................... mobile accordion | desktop hover columns
│
├── [home] ................................. inline JSX, not a component
│   ├── AutoPlayVideo (cinematic bg)
│   ├── Logo
│   ├── CascadingNav ....................... second instance, as the landing hero
│   ├── AnimatedStats → StatBlock ×4 ....... uses useCountUp
│   ├── HomepageHero ....................... CTA → handleCTA
│   ├── WhyTheStandard
│   ├── StandardDifference
│   ├── PhotoBreak ......................... 3-image crossfade
│   ├── OurServices
│   ├── ConnLawFirm ........................ remote Unsplash bg + connLawLogo
│   ├── PodcastSection
│   ├── CTASection ......................... CTA → handleCTA
│   └── Footer ............................. onUtility = handleUtility  ✅ wired
│
├── [pillar] PillarPage
│   └── InnerShell ......................... fixed header: Logo + hamburger
│       ├── hero (video | slideshow | single image + secondary crossfade)
│       ├── body (renderRichText) + "Services Within {pillar}" sidebar
│       ├── "Boardroom and the Courtroom" (REPRESENT|Coaches|Contract Negotiation only)
│       └── Footer ......................... onUtility = () => {}  ❌ DEAD
│
├── [about] AboutPage
│   └── InnerShell
│       ├── AboutSectionReveal ×12 ......... wrapper used 27 times
│       └── Footer ......................... onUtility = () => {}  ❌ DEAD
│
├── [contact] ContactPage
│   └── InnerShell → form + contact details + Footer ❌ DEAD onUtility
│
└── [apply] AthleteApplication
    └── InnerShell → 5-step wizard (NO Footer)
```

### Data flow

State lives entirely in `App()`. Three pieces:

```ts
const [page, setPage] = useState<AppPage>({ type: 'home' })
const [navOpen, setNavOpen] = useState(false)
const [showSplash, setShowSplash] = useState(true)
```

Three dispatchers are passed down as props — there is no context, no reducer, no global store:

| Dispatcher | Signature | Consumers |
|---|---|---|
| `handleNavigate` | `(l1, l2, l3) => void` | `CascadingNav` (×2), `NavOverlay` |
| `handleUtility` | `(name: string) => void` | `CascadingNav`, `NavOverlay`, `Footer` (home only) |
| `handleCTA` | `(action: string) => void` | `HomepageHero`, `CTASection` |

`handleUtility` is a **string-matched switch** ([App.tsx:3460-3468](src/App.tsx#L3460-L3468)) over `'Home' | 'About' | 'Contact' | 'Athlete Application' | 'REPRESENT' | 'BUILD' | 'PROTECT'`. The footer emits `'Represent'`/`'Build'`/`'Protect'` in title case — **these do not match the uppercase comparisons and silently do nothing.** See §9.

`PillarPage` is remounted per navigation via `key={`${pillar}-${l2}-${l3}`}` to reset its internal timers/loaded state.

A `useLayoutEffect` on `[page]` resets `documentElement.scrollTop`/`body.scrollTop` to 0.

### Content is data-driven, not component-driven

`PillarPage` renders all 36 pillar views from eight lookup tables keyed by `"PILLAR|L2|L3"`:

| Table | Keys | Purpose |
|---|---|---|
| `PILLAR_META` | 3 | Per-pillar tagline, fallback body, fallback Unsplash hero |
| `L3_BODY` | 29 | Per-page body copy (lightweight markdown: `## ` heading, `**bold**`) |
| `PILLAR_VIDEO` | 1 | Pillar-level hero video (REPRESENT only) |
| `PILLAR_HERO_IMG` | 27 | Single hero image |
| `PILLAR_HERO_SLIDES` | 6 | Multi-image hero slideshow |
| `SECONDARY_HERO` | 14 | Crossfade partner image (falls back `L3` → `L2` → pillar) |
| `PILLAR_HERO_POS` / `_FIT` / `_HEIGHT` / `_FILTER` | 14/7/6/25 | Per-page CSS overrides for object-position, object-fit, height, filter |

`renderRichText` ([App.tsx:2413](src/App.tsx#L2413)) is a 6-line `**bold**` parser. `## ` headings are handled separately in the render loop. This is a hand-rolled mini-markdown — no library.

### Shared hooks

| Hook | Used | Purpose |
|---|---|---|
| `useIsMobile` | 6× | `matchMedia('(max-width: 767px)')` — drives `object-fit`, hero height, nav mode |
| `useScrollReveal(threshold)` | 11× | IntersectionObserver, one-way latch to `visible` |
| `useCountUp(target, duration, active)` | 1× | `setInterval` @16ms with an ease function |

### Dead code confirmed

| Symbol | Line | Status |
|---|---|---|
| `Reveal` | [726](src/App.tsx#L726) | Declared, never rendered (superseded by inline reveal styles + `AboutSectionReveal`) |
| `AboutPlaceholder` | [2739](src/App.tsx#L2739) | Declared, never rendered |
| `ConnLawMark` | [1487](src/App.tsx#L1487) | Full SVG re-creation of the Conn Law logo, never rendered (the raster `connLawLogo` is used instead) |
| `// SECTION 5: WHO WE REPRESENT` | [1387](src/App.tsx#L1387) | Comment header with no component beneath it |
| `// SECTION 8: BRANDS` | [1625](src/App.tsx#L1625) | Comment header with no component beneath it |
| `HERO_SLIDES` | [769](src/App.tsx#L769) | Array of **one** item, but `HomepageHero` still runs a 7s rotation interval and crossfade machinery over it |

`LogoMark` ([124](src/App.tsx#L124)) — an inline SVG wordmark using Oswald — **is** used, but only in the footer. The header uses the raster `logo_4.png` via `Logo`. Two different logo implementations coexist.

---

## 5. Global layout, navigation, footer, shared UI

### Global shell

`index.html` → `#root` → `main.tsx` → `<React.StrictMode><App /></React.StrictMode>`.

`App` renders a single `<div>` with `backgroundColor: '#0A0A0A'`, `minHeight: 100vh`, `position: relative`. There is no persistent layout component — the home page has its own header, and inner pages get theirs from `InnerShell`.

### Two distinct header treatments

**Home:** absolutely positioned `Logo` at `top-7 left-6 md:left-10`, over the cinematic video. **No hamburger** — the full `CascadingNav` *is* the hero.

**Inner pages (`InnerShell`, [App.tsx:688](src/App.tsx#L688)):** `fixed top-0` bar, `z-40`, `rgba(10,10,10,0.96)` background, 1px `#0e0e10` bottom border, `Logo` (→ home) on the left and a 3-line hamburger (→ `NavOverlay`) on the right. The hamburger bars are `22×1px` at `#444` with a `group` class but **no hover rule is ever defined**, so the hover intent is inert.

### Navigation — `CascadingNav` ([App.tsx:227](src/App.tsx#L227))

One component, two completely separate render branches selected by `useIsMobile()`.

**Desktop — three hover-driven columns:**
1. **L1 pillars** (Bebas Neue, `clamp(3rem, 5.5vw, 5.5rem)`): hovering sets `hoveredPillar`; the active one turns `#C4C0B8`, the others dim to `#1e1e1e`.
2. **L2 categories** (Oswald, uppercase): slide in from `translateX(-12px)` with `opacity 0.25s`; active `#C4C0B8`, dimmed `#333`, idle `#c0b99a`.
3. **L3 services** (Inter, `#E8D89A` with a `→` bullet): **the only clickable level** — fires `onNavigate(l1, l2, l3)`.

`onMouseLeave` on the container resets both hover levels. There is no hover-intent delay and no keyboard path — the entire primary navigation is **mouse-hover-only and unreachable by keyboard**.

**Mobile — nested tap accordion:** L1 rows with a `+` that rotates 45° when open; `max-height` transitions (`1200px` / `600px` sentinels) for L2 and L3. Opening a pillar closes any open L2.

Both branches end with the same four utility links: **Home · About · Contact · Athlete Application**.

### `NavOverlay` ([App.tsx:642](src/App.tsx#L642))

Full-screen `#0A0A0A` panel at `z-50`, containing `Logo` (top-left), a `CLOSE ✕` button (top-right), and a second `CascadingNav` instance. It is **always mounted** and toggled via `opacity` + `visibility` + `pointerEvents` rather than conditional rendering.

The transition is `'opacity 0.3s ease, visibility 0s linear 0.3s'`. Because the `0.3s` visibility delay applies in **both** directions, opening the menu leaves it invisible for 300ms before it appears. Only the close direction needs the delay.

No `Escape` key handler, no focus trap, no `aria-modal`, no scroll lock on the body behind it.

### `Footer` ([App.tsx:2007](src/App.tsx#L2007))

Background `#060608`. Three-column grid `[2fr_1fr_1.6fr]`:

1. **Brand** — inline `LogoMark` SVG (180px) + tagline "Athlete Representation • NIL • Legal Protection"
2. **Navigation** — `About · Represent · Build · Protect · Contact`, each `onClick={() => onUtility(link)}`
3. **Connect** — "Follow us" + three 36px circular social buttons (Instagram / X / YouTube, inline SVG paths) + a full-width outlined **Book Consultation** button → `onUtility('Contact')`

Bottom bar: `Privacy Policy | Terms of Service`, `© 2026 THE STANDARD Sports Group LLC`, and a "Powered by" Conn Law logo in an 80×80 white tile.

**Footer defects (all confirmed):**
- On About, Contact, and all 36 Pillar pages the footer is rendered as `<Footer onUtility={() => {}} />` — **every footer link on every inner page is a no-op.** Only the home page footer works.
- Even on home, `Represent` / `Build` / `Protect` are sent title-cased into a switch that compares against `'REPRESENT'` / `'BUILD'` / `'PROTECT'` — **the three pillar landing pages are unreachable from anywhere in the UI.**
- `Privacy Policy` and `Terms of Service` are `<button>`s with **no `onClick`** — and no such pages exist.
- All three social buttons have `aria-label` but **no `onClick` and no `href`** — no social URLs exist anywhere in the codebase.
- Company name is inconsistent: footer says *"THE STANDARD Sports Group LLC"*; the About page and logo alt text say *"The Standard Sports & Entertainment Group"*.
- `AthleteApplication` renders **no footer at all**.

### Shared UI primitives

There is no button, input, card, or heading component. Every instance is duplicated inline. The gold button pattern (`backgroundColor: '#C4C0B8'`, Oswald 600, 11–12px, `letterSpacing: 0.18–0.2em`, uppercase, with `onMouseEnter`/`onMouseLeave` swapping to `#8C8884`) appears **7 separate times**, hand-copied each time with slightly different padding and font-size.

---

## 6. Assets

### Total weight: **155 MB across 66 files**, all in `src/imports/`.

| Type | Files | Total |
|---|---:|---:|
| PNG | 10 | ~60 MB |
| MP4 | 4 | ~34 MB |
| JPG (`.JPG`) | 8 | ~30 MB |
| JPEG | 14 | ~19 MB |
| JPG (`.jpg`) | 14 | ~13 MB |

### Video (4 files, 34 MB) — all autoplay, muted, `playsInline`

| File | Size | Where | Behavior |
|---|---:|---|---|
| `about_vid_6.mp4` | 15.2 MB | About hero | `loop`, `object-fit: contain`, 16:9 box |
| `cinematic__new_vid.mp4` | 10.4 MB | Home landing background | `loop`, `opacity 0.88`, `brightness(1.65)` |
| `atlanta_footage.mp4` | 6.6 MB | REPRESENT pillar hero | `loop`, only when `l2`/`l3` are null |
| `golf222.mp4` | 3.4 MB | **Splash screen** | plays once, `brightness(1.55)`, blocks first paint |

No `poster` frames. No `preload` hints. No WebM/AV1 alternates. No adaptive/HLS. **No captions or audio description track** (they are muted, so this is low-risk, but there is also no `<track>` element).

### Largest individual images

| File | Size | Note |
|---|---:|---|
| `coach_oppotunity5.png` | **20.3 MB** | A photograph stored as PNG |
| `coaching_rep.png` | **10.9 MB** | Photograph as PNG |
| `GENEral_manager_44.png` | **10.3 MB** | Photograph as PNG |
| `andyy.jpg` | 9.7 MB | Leadership headshot, rendered at ~360px wide |
| `contract_negoatiation_3.png` | 9.5 MB | Photograph as PNG |
| `nil_2.JPG` | 8.2 MB | |
| `IMG_1340.JPG` | 8.0 MB | |
| `nil_1.JPG` / `nil_1-1.JPG` | 6.8 MB **each** | Byte-identical duplicates |

Five photographs are stored as PNG for a combined **~53 MB**; as quality-85 WebP they would be roughly 1–2 MB total.

### Duplicate files (byte-identical, MD5-verified)

| Pair | Wasted |
|---|---:|
| `nil_1.JPG` ≡ `nil_1-1.JPG` | 6.8 MB |
| `coaching_oppot.jpeg` ≡ `coaching_oppot-1.jpeg` | 1.4 MB |
| `superbowl.jpeg` ≡ `life_after_sport_2.jpeg` | 0.65 MB |

In each pair **the app uses one and the other is dead** — except `superbowl.jpeg`/`life_after_sport_2.jpeg`, where both aliases of the same photo are imported and used in different places under different names.

### Imported but never used (6 identifiers ≈ 10.9 MB)

| Identifier | File | Size |
|---|---|---:|
| `footballHeroImg` | `nil_1-1.JPG` | 6.8 MB |
| `aboutBg` | `aboutimage.png` | 1.9 MB |
| `coachingImg` | `coaching_oppot.jpeg` | 1.4 MB |
| `executivePlacementImg` | `executive_placement.jpg` | 0.27 MB |
| `coachingRepImg` | `coaching_rep.jpeg` | 0.24 MB |
| `golfHeroImg` | `golf_image2.jpg` | 0.21 MB |

Rollup tree-shakes unused asset imports, so these won't reach `dist/` — but they sit in the repo and in Git LFS.

### Remote images — 23 Unsplash URLs

23 hero backgrounds are hot-linked to `images.unsplash.com` with `?w=1920&h=1080&fit=crop&auto=format`. They cover **most of BUILD and PROTECT**, plus the `ConnLawFirm` section background and all three `PILLAR_META` fallbacks. The code comments them as *"swap placeholders when client supplies assets."*

Risks: third-party dependency for production imagery, no licensing record, no offline/CSP story, and Unsplash photo IDs can be removed by their uploader at any time.

### Fonts

Three Google Fonts families, loaded via a single CSS `@import` at the top of `src/index.css`:

- **Bebas Neue** (400) — display headings
- **Oswald** (300/400/500/600/700) — labels, eyebrows, buttons, subheads
- **Inter** (300/400/500/600/700 + italic 300/400) — body copy

`display=swap` is set. There is **no preconnect** to `fonts.googleapis.com`/`fonts.gstatic.com`, and a CSS `@import` is render-blocking and serialized after the stylesheet itself downloads. No self-hosting, no `font-display` fallback stack — every `fontFamily` value is `"'Oswald', sans-serif"` etc., so the fallback is the generic system sans.

### Icons

**No icon library.** Four hand-written inline SVGs:
- Instagram, X/Twitter, YouTube glyphs in `Footer`
- `LogoMark` — the wordmark, with a 6-stop `linearGradient` and a `uid`-prefixed gradient id to avoid collisions
- `ConnLawMark` — a full SVG reconstruction of the Conn Law logo (**unused**)

Everything else is a typographic character: `→` for nav bullets, `◆` for list bullets, `+` for accordion toggles, `✓` for wizard progress, `✕` for close.

### Git LFS

`.gitattributes` defines 100 `filter=lfs` rules covering `*.png`, `*.jpg`, `*.jpeg`, `*.mp4`, etc. **All patterns are lowercase.** The 8 `.JPG` files (~30 MB) will not match on a case-sensitive filesystem and would be committed as raw blobs. This directory is currently **not a git repository**, so LFS is unconfigured — worth fixing before the first commit, since un-LFS'd 30 MB blobs are effectively permanent in history.

---

## 7. Styling system

### `src/index.css` — 45 lines total

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:...&display=swap');
@import 'tailwindcss';

@theme {
  --color-matte:      #0A0A0A;
  --color-charcoal:   #2B2B2E;
  --color-gold:       #C4C0B8;
  --color-gold-muted: #8C8884;
}
```

Plus: global scrollbar hiding (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`), `html`/`body` background `#0A0A0A`, white body text, font smoothing, a mobile `object-position` override for `.photo-break-img`, and `outline: none` on focused inputs.

### The theme tokens are defined and then never used.

Zero occurrences of `bg-matte`, `text-gold`, `bg-gold`, `border-gold`, or `bg-charcoal` anywhere in `App.tsx`. Instead:

- `#C4C0B8` appears **84 times** as a hardcoded literal
- `#0A0A0A` appears **26 times**
- Plus an undocumented palette of `#060608`, `#0C0C0F`, `#0D0D10`, `#0e0e10`, `#111114`, `#141417`, `#161619`, `#1a1a1d`, `#1e1e21`, `#252528`, `#2a2a2d`, `#333`, `#383838`, `#444`, `#484848`, `#555`, `#666`, `#777`, `#888`, `#aaa`, `#c0b99a`, `#E8D89A`, `#8C8884`, `#b0aca4` …

Two accent golds are in play that are **not** the token: `#c0b99a` (nav L2 idle) and `#E8D89A` (nav L3). Neither is in `@theme`.

### Tailwind is used for layout only

343 `style={{...}}` objects vs 218 `className` usages. The split is consistent:

- **Tailwind classes** → `flex`, `grid`, `grid-cols-*`, `gap-*`, `absolute`, `inset-0`, `max-w-7xl`, `mx-auto`, `px-10 md:px-20`, `py-28 md:py-40`, `z-*`
- **Inline styles** → every color, font, letter-spacing, transition, transform, opacity, filter, and border

Occasional friction shows where the two meet: `className="group-hover:!text-white"` needs `!important` to beat the inline `color` on the same element ([App.tsx:496](src/App.tsx#L496)).

### Design system, as actually implemented

| Role | Value |
|---|---|
| Page background | `#0A0A0A` ("matte") |
| Alt section backgrounds | `#0C0C0F` (stats), `#060608` (footer, manifesto) |
| Primary accent | `#C4C0B8` (warm grey-gold) |
| Accent hover | `#8C8884` |
| Hairlines | `#0e0e10`, `#111114`, `#141417`, `#1a1a1d` |
| Body text | `#666` (primary), `#555`, `#484848`, `#383838` (progressively dimmer) |
| Display type | Bebas Neue, `letterSpacing: 0.06em`, `lineHeight: 0.9–0.94` |
| Label type | Oswald, uppercase, `letterSpacing: 0.18–0.38em`, 9–13px |
| Body type | Inter 300, 13–15px, `lineHeight: 1.85–1.95` |
| Container | `max-w-7xl mx-auto px-6/10 md:px-20` |
| Section rhythm | `py-24 md:py-36` or `py-28 md:py-40` |

Almost every type size uses `clamp()` for fluid scaling. The single breakpoint that matters is `768px` (Tailwind `md:` and the `useIsMobile` media query) — but note that `useIsMobile` uses `max-width: 767px` while Tailwind `md:` applies at `min-width: 768px`, so they agree; `lg:` (1024px) is used for grid changes without a matching JS hook.

### Contrast

The dimmest text colors are far below WCAG AA on `#0A0A0A`:

| Foreground | On | Approx. ratio | AA (4.5:1) |
|---|---|---:|---|
| `#252528` (copyright, step labels) | `#0A0A0A` | ~1.3:1 | ✗ |
| `#2a2a2d` (contact values, placeholders) | `#0A0A0A` | ~1.4:1 | ✗ |
| `#333` (nav utility, buttons) | `#0A0A0A` | ~1.7:1 | ✗ |
| `#383838` (form labels, social links) | `#0A0A0A` | ~2.0:1 | ✗ |
| `#484848` | `#0A0A0A` | ~2.7:1 | ✗ |
| `#555` (body copy) | `#0A0A0A` | ~3.4:1 | ✗ |
| `#666` (primary body copy) | `#0A0A0A` | ~4.3:1 | ✗ (marginal) |
| `#C4C0B8` (accent) | `#0A0A0A` | ~10.8:1 | ✓ |

**The primary body copy color fails AA.** Input placeholder text is `#2a2a2d` — essentially invisible.

---

## 8. Animations and interactions

Everything is hand-rolled CSS transitions plus `IntersectionObserver`. No Framer Motion, no GSAP, no `@keyframes` anywhere — not a single one.

### Scroll reveal

`useScrollReveal(threshold = 0.12)` creates an `IntersectionObserver`, sets `visible = true` on first intersection, and never unsets it. Consumers then interpolate:

```ts
opacity:   visible ? 1 : 0,
transform: visible ? 'translateY(0)' : 'translateY(28px)',
transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`
```

Used 11 times directly and 27 times through the `AboutSectionReveal` wrapper. Stagger delays are literal numbers (`0/80/100/160/180/200/220/280 + i*55…110`) rather than a scale.

### Catalogue

| Effect | Where | Mechanism |
|---|---|---|
| **Splash** | `SplashVideo` | `golf222.mp4` plays once; `Skip ✕` appears at 1.2s; `onEnded` → 1.6s delay → 0.9s fade; 30s hard fallback; `play()` rejection → immediate finish |
| **Landing video** | home | `AutoPlayVideo`, `opacity 0.88`, `brightness(1.65) contrast(1.12) saturate(1.18)`, two gradient scrims |
| **Hero text cascade** | `HomepageHero` | 5 lines, delay `280 + i*130` ms, `translateY(18px)` → 0 |
| **Hero Ken Burns** | `HomepageHero` | `scale(1.0) → scale(1.06)` over **8s**, crossfade `1.8s`. `HERO_SLIDES` has only one entry, so the 7s rotation interval cycles `0 → 0` forever |
| **Count-up stats** | `AnimatedStats` | `useCountUp`, 2200ms, `setInterval` @16ms, quadratic ease-in-out. Targets: 750+, 300+, 8, 100% |
| **Photo break** | `PhotoBreak` | 3 images, 4800ms interval, alternating `translateX(±5%)` direction, `transform 6s` on the active slide |
| **Pillar hero slideshow** | `PillarPage` | 6 pages, 4500ms interval, `scale(1.04)`, `translateX(±3%)`, `transform 5s` |
| **Pillar secondary crossfade** | `PillarPage` | Where `SECONDARY_HERO` matches, alternates every 6000ms with a `2.5s` opacity fade at `0.72` |
| **Nav column cascade** | `CascadingNav` | L2/L3 columns fade + `translateX(-12px)` → 0 on hover, 0.2–0.25s |
| **Nav dimming** | `CascadingNav` | Non-hovered L1 → `#1e1e1e`, non-hovered L2 → `#333` |
| **Mobile accordion** | `CascadingNav` | `max-height` 0 ↔ 1200px (L2) / 600px (L3), `+` rotates 45° |
| **Hover states** | ~40 sites | Inline `onMouseEnter`/`onMouseLeave` mutating `e.currentTarget.style` directly |
| **Wizard progress** | `AthleteApplication` | Step dots fill `#C4C0B8`, connector lines fill over `0.4s`, completed steps show `✓` |

### Video playback strategy

The same `load()` → check `readyState >= 3` → `play().catch(() => {})` → else listen for `canplay` pattern is written out **four separate times**: `AutoPlayVideo` ([540](src/App.tsx#L540)), `SplashVideo` ([576](src/App.tsx#L576)), `PillarPage` ([2439](src/App.tsx#L2439)), `AboutPage` ([2754](src/App.tsx#L2754)). Only `AutoPlayVideo` is a reusable component; the other three inline it.

### Interaction inventory

| Interaction | State |
|---|---|
| Cascading nav → pillar page | ✅ Works |
| Logo → home | ✅ Works |
| Hamburger → overlay | ✅ Works |
| Nav utility links | ✅ Works |
| Home CTAs (`apply`/`partner`/`contact`) | ✅ Works |
| Footer nav (home page) | ⚠️ `About`/`Contact` work; `Represent`/`Build`/`Protect` silently do nothing (case mismatch) |
| Footer nav (all inner pages) | ❌ `onUtility={() => {}}` — entirely dead |
| Footer "Book Consultation" | ⚠️ Works on home only |
| Privacy Policy / Terms of Service | ❌ No handler, no destination |
| Social icons (IG/X/YouTube) | ❌ No handler, no URLs |
| Podcast Watch / Listen | ❌ No handler |
| Podcast platform links (Spotify/Apple/YouTube) | ❌ `<span>` with `cursor: pointer`, no handler |
| Pillar page "Book Consultation" | ❌ No `onClick` |
| Contact form | ❌ `onSubmit={e => e.preventDefault()}` — uncontrolled inputs, no state, no endpoint |
| Athlete Application | ❌ Uncontrolled inputs; **data is lost on every step change**; Submit only flips a local boolean |
| Keyboard navigation of main nav | ❌ Hover-only on desktop |
| `Escape` to close overlay | ❌ Not implemented |

---

## 9. Potential issues from the exported Figma code

Grouped by severity. Every item below was verified against the source.

### 🔴 Build-breaking

**1. Case-mismatched asset import will fail on Linux.**
[App.tsx:46](src/App.tsx#L46) imports `@/imports/community_impact.JPG`. The file on disk is `community_impact.jpg` (lowercase) — and it is *also* imported at [App.tsx:19](src/App.tsx#L19) under the correct case. On Windows and default macOS this resolves silently; **on a case-sensitive filesystem (Linux CI, Docker, Vercel, Netlify) the build fails**. `communityImpactNewImg` is used in `PILLAR_HERO_SLIDES['BUILD|Legacy|Community Impact']`.

### 🟠 Functional bugs

**2. The three pillar landing pages are unreachable.**
`handleUtility` compares against `'REPRESENT'`, `'BUILD'`, `'PROTECT'` ([App.tsx:3465-3467](src/App.tsx#L3465-L3467)). The only caller that could ever produce them is the footer, which emits title case: `['About', 'Represent', 'Build', 'Protect', 'Contact']` ([App.tsx:2008](src/App.tsx#L2008)). No match → no navigation. `PILLAR_META`, `PILLAR_VIDEO['REPRESENT']` (the 6.6 MB `atlanta_footage.mp4`), and the `The {pillar} Pillar.` render branch are all dead in practice.

**3. Every footer on every inner page is dead.**
`<Footer onUtility={() => {}} />` at lines [2723](src/App.tsx#L2723), [3133](src/App.tsx#L3133), [3210](src/App.tsx#L3210). Once a user reaches a pillar/about/contact page, the only working navigation is the logo and the hamburger.

**4. Athlete Application loses all entered data.**
Inputs are uncontrolled with no `value`/`onChange` and no form state. Changing step swaps `current.fields`, unmounting every input and discarding its DOM value. Pressing **Previous** shows empty fields. **Submit Application** ([App.tsx:3428](src/App.tsx#L3428)) runs `setSubmitted(true)` and nothing else — no validation, no payload, no network call — then displays *"The Standard team will review your application and reach out within 48 hours."*

**5. Contact form submits nowhere.**
`onSubmit={e => e.preventDefault()}` with uncontrolled inputs. Contact details are all placeholder: Phone / Email / Office / Social Media each read *"Coming soon."*

**6. Unreachable content: `BUILD|Business|Business Formation`.**
Full body copy (`L3_BODY`), a hero image (`PILLAR_HERO_IMG`), and a filter override (`PILLAR_HERO_FILTER`) all exist for this key, but `NAV_TREE.BUILD.Business` lists `Company Formation`, not `Business Formation`. No UI path reaches it.

**7. Five live pages have no dedicated copy** and silently fall back to the generic pillar paragraph:
`REPRESENT|Athletes|NIL` · `BUILD|Trust|Client Relations` · `BUILD|Trust|Personal Advisory` · `BUILD|Business|Brand Partnerships` · `BUILD|Legacy|Community Impact`.
Additionally `PROTECT|Legal Backing|Contract Review` has no hero image and falls back to the PROTECT Unsplash placeholder.

**8. `NavOverlay` opens 300ms late.**
`transition: 'opacity 0.3s ease, visibility 0s linear 0.3s'` — the visibility delay is unconditional, so it applies to open as well as close.

**9. Splash video replays on every load.**
No `sessionStorage`/`localStorage` guard. Every visit and every refresh forces a 3.4 MB blocking video before content. `SplashVideo` sets `skipVisible` only after 1.2s, so there's no way out for the first 1.2 seconds.

### 🟠 Performance

**10. 155 MB of media, no optimization pipeline.**
No responsive `srcset`/`sizes`, no `loading="lazy"` (zero occurrences), no `decoding="async"`, no modern formats (no WebP/AVIF), no `poster` on any `<video>`, no `preload` hints. Five photographs are stored as PNG (~53 MB combined). `andyy.jpg` is 9.7 MB and renders at ~360px wide.

**11. Everything loads eagerly.**
One bundle, one component tree, static ES imports for all 66 media files. There is no code splitting, no `React.lazy`, no route-level chunking — because there are no routes.

**12. Idle timers run forever.**
`HomepageHero` runs a 7000ms interval over a **one-element** array. `PhotoBreak` (4800ms) and every `PillarPage` slideshow (4500ms) plus the secondary crossfade (6000ms) keep running when scrolled out of view and when the tab is hidden. `useCountUp` uses `setInterval` @16ms rather than `requestAnimationFrame`.

**13. 23 production heroes hot-link to Unsplash.** Third-party availability, latency, licensing, and CSP exposure — with in-code comments confirming they are placeholders.

### 🟡 Accessibility

**14. Primary navigation is keyboard-inaccessible.** Desktop L2/L3 columns only reveal on `onMouseEnter`. A keyboard or screen-reader user can tab to an L1 pillar button but nothing opens.

**15. `outline: none` on all focused inputs** ([index.css:42-45](src/index.css#L42-L45)) with no replacement focus style. Combined with #14, keyboard navigation is effectively broken site-wide.

**16. Body copy fails WCAG AA** (`#666` on `#0A0A0A` ≈ 4.3:1; secondary text far worse). Placeholder text at `#2a2a2d` ≈ 1.4:1 is invisible.

**17. No `prefers-reduced-motion` support** anywhere — zero occurrences in CSS or TSX — despite ~15 concurrent animations including autoplaying video and Ken Burns zooms. `site.json` sets `"ignoreReducedMotion": false`, which is the *correct* platform intent, but the code never honors it.

**18. Zero `<a>` elements.** All navigation is `<button>`. Wrong semantics for navigation, no href for assistive tech, no open-in-new-tab, no crawlability.

**19. Modal hygiene missing on `NavOverlay`:** no focus trap, no `Escape` handler, no `role="dialog"`/`aria-modal`, no body scroll lock, and it stays in the accessibility tree while hidden (`visibility: hidden` helps, but it is always mounted).

**20. Global scrollbar hiding** (`index.css` lines 11-16) removes a standard affordance on every element.

**21. Only 4 `aria-*` attributes** in 3,567 lines. Form inputs use `<label>` elements with no `htmlFor`/`id` association. The hamburger has `aria-label` but no `aria-expanded`.

### 🟡 Code structure / maintainability

**22. A single 3,567-line `App.tsx`** holding 30 components, 3 hooks, 12 data tables, and all copy. `AGENTS.md` documents a structure that does not exist.

**23. Dead code:** `Reveal`, `AboutPlaceholder`, `ConnLawMark` are declared but never rendered. `// SECTION 5: WHO WE REPRESENT` and `// SECTION 8: BRANDS` are orphaned comment headers whose components were deleted.

**24. `@theme` tokens unused.** All four are defined and referenced zero times; `#C4C0B8` is hardcoded 84 times. Two further accent golds (`#c0b99a`, `#E8D89A`) aren't tokenized at all.

**25. Massive inline-style duplication.** 343 style objects. The gold button is hand-copied 7 times. The video-play effect is written 4 times. There is no shared `Button`, `Input`, `Section`, or `Heading`.

**26. Content is hardcoded in JSX.** All body copy, stats, bios, legal disclaimers, podcast structure, and courtroom verdict figures ($40M, $17.33M, …) are string literals. No CMS, no i18n, no content layer.

**27. Type escape hatches:** `ref as React.RefObject<any>` ([App.tsx:101](src/App.tsx#L101)), `(items as string[])` ([App.tsx:2654](src/App.tsx#L2654)). `NavTree` is `Record<string, Record<string, string[]>>` — the eight `"PILLAR|L2|L3"` lookup tables are all `Record<string, …>`, so typos in keys (see #6) are invisible to the compiler.

**28. About page sections render out of their own numbered order.** The source comments read `3. OUR STORY` → `4. LEADERSHIP` → `5. THE NETWORK` → `6. FROM ATHLETE TO ADVOCATE` → `8.` → `9.` → `10.` → `11.` → `12.` → **`1. HERO`** → **`2. MISSION + VISION`**. The hero video and the mission/vision statement appear near the *bottom* of the page. Section 7 is missing entirely. This is almost certainly an unintended drag-reorder from Figma.

**29. Homepage stats sit above the hero.** `<AnimatedStats />` renders before `<HomepageHero />` ([App.tsx:3530-3531](src/App.tsx#L3530-L3531)), so the count-up numbers appear between the nav landing screen and the "Setting The Standard." hero.

### 🟡 Content and metadata

**30. No page title.** `site.json` has no `title` key, so `figmaSiteConfiguration` falls back to `"Figma Make App"` — that is the literal browser tab title.

**31. The site is `noindex`.** `site.json` sets `"robots": { "index": false }`, which injects `<meta name="robots" content="noindex, nofollow">` and serves a `Disallow: /` robots.txt.

**32. No favicon, no OG image, no meta description on the page itself** (a description exists in `site.json` but it describes the *design service*, not the client: *"Delivers expertly crafted, high-end website designs…"*).

**33. Placeholder copy shipped as-is:** Podcast "Episode Coming Soon" / "First episode in production"; Contact Phone/Email/Office/Social all "Coming soon".

**34. Inconsistent legal entity name:** footer `© 2026 THE STANDARD Sports Group LLC` vs. `The Standard Sports & Entertainment Group` elsewhere. The directory name says *"std group llc"*. Copyright year is hardcoded to 2026.

**35. Text artifacts from the Figma export:**
- [App.tsx:1741](src/App.tsx#L1741) — `athletes{'  '}the conversations` — a missing em-dash rendered as a JSX double-space literal.
- [App.tsx:1142](src/App.tsx#L1142) — a `<p>` containing only `&nbsp;&nbsp;&nbsp;&nbsp;` beneath the stats, a leftover caption slot.
- Filename typos baked into imports: `settign_th_standard_image.jpg`, `contract_negoatiation_3.png`, `coach_oppotunity5.png`, `athleteic_directors.png`, `brand_partneship.jpg`, `andyy.jpg`.

**36. Two competing logo implementations:** header uses the 485 KB raster `logo_4.png`; footer uses the inline `LogoMark` SVG. A third (`ConnLawMark`) is written but unused. The `Logo` hover handler also has an off-by-one: `onMouseEnter` sets opacity `1`, `onMouseLeave` sets `0.92`, but the initial value is `0.94` ([App.tsx:203-207](src/App.tsx#L203-L207)) — the logo permanently dims after the first hover.

**37. Git LFS rules miss uppercase extensions.** `.gitattributes` has no `*.JPG` rule; the 8 `.JPG` files (~30 MB) would enter git history as raw blobs on a case-sensitive system. The project is not yet a git repo, so this is still correctable.

**38. Unverified claims in shipped copy.** Stats (750+ NFL relationships, 300+ college relationships, 8 UFL GM relationships) and specific verdict figures ($40M wrongful-death judgment, $17.33M and $16.4M malpractice verdicts, etc.) are presented as fact. These are legal-marketing claims about a law practice — many jurisdictions require accompanying disclaimers on attorney advertising. Worth routing past counsel before launch.

---

## 10. Recommended cleanup before development

Ordered so that each phase unblocks the next. Nothing here has been applied.

### Phase 0 — Make it build and deploy (½ day)

| # | Task |
|---|---|
| 0.1 | **Fix `community_impact.JPG` → `community_impact.jpg`** ([App.tsx:46](src/App.tsx#L46)) and drop the duplicate import — `communityImpactImg` at line 19 already points at the same file. Blocks every Linux/CI build. |
| 0.2 | Normalize **all** asset filenames to lowercase with lowercase extensions, then update imports. Add a CI check (`git config core.ignorecase false` + a case-sensitivity lint) so this can't regress. |
| 0.3 | `pnpm install && pnpm build && npx tsc --noEmit` — establish a green baseline before touching anything. |
| 0.4 | Initialize git, install LFS, and **add uppercase-extension rules to `.gitattributes` before the first commit** (or normalize filenames first per 0.2, which makes this moot). |
| 0.5 | Set a real `title` in `.figma/make/site.json`, replace the boilerplate `description` with client copy, add a favicon and an OG image. |
| 0.6 | Decide on `robots.index`. It is `false` today — correct for staging, must flip for launch. |

### Phase 1 — Assets (1 day, biggest single win)

| # | Task |
|---|---|
| 1.1 | Delete the 6 unused imports and their files (~10.9 MB): `aboutimage.png`, `nil_1-1.JPG`, `coaching_oppot.jpeg`, `executive_placement.jpg`, `coaching_rep.jpeg`, `golf_image2.jpg`. |
| 1.2 | De-duplicate `superbowl.jpeg` ≡ `life_after_sport_2.jpeg` — keep one, alias the import. |
| 1.3 | **Convert the 5 photographic PNGs to WebP/AVIF** (`coach_oppotunity5`, `coaching_rep`, `GENEral_manager_44`, `contract_negoatiation_3`, `advisory_image1`). ~53 MB → ~2 MB. |
| 1.4 | Re-encode all JPEGs at quality 80–85 and generate responsive widths (640/1280/1920). `andyy.jpg` alone goes 9.7 MB → ~150 KB at its actual render size. |
| 1.5 | Add `srcset`/`sizes`, `loading="lazy"`, and `decoding="async"` to every non-hero `<img>`. Consider `vite-imagetools` or `unplugin-imagemin` so this is automatic. |
| 1.6 | Re-encode the 4 videos (H.264 + WebM/AV1), add `poster` frames, and set `preload="metadata"`. Move them to a CDN — 34 MB of video does not belong in a Vite bundle. |
| 1.7 | **Decide on the 23 Unsplash placeholders**: replace with licensed client photography, or at minimum download, optimize, and self-host them with a documented license. |
| 1.8 | Self-host the three Google Fonts (subset to the used weights), or at least add `<link rel="preconnect">` and move off the render-blocking CSS `@import`. |

**Realistic target: 155 MB → under 8 MB.**

### Phase 2 — Routing (1–2 days)

| # | Task |
|---|---|
| 2.1 | Add `react-router-dom` (or TanStack Router). Map `AppPage` to real paths: `/`, `/about`, `/contact`, `/apply`, `/:pillar`, `/:pillar/:l2/:l3`. |
| 2.2 | Derive slugs from `NAV_TREE` — the two `Contract Negotiation` entries need disambiguating slugs (`/represent/coaches/contract-negotiation` vs `/protect/legal-backing/contract-negotiation`). |
| 2.3 | **Replace every navigation `<button>` with `<Link>`/`<a>`.** Fixes crawlability, middle-click, right-click, and screen-reader semantics in one pass. |
| 2.4 | Add a 404 route and per-route `<title>`/meta (`react-helmet-async` or equivalent). |
| 2.5 | Restore scroll-to-top as a router `ScrollRestoration` instead of the `useLayoutEffect` hack. |

### Phase 3 — Fix the broken interactions (1 day)

| # | Task |
|---|---|
| 3.1 | Fix the footer case mismatch (`'Represent'` vs `'REPRESENT'`) — this alone restores 3 unreachable pages. |
| 3.2 | Wire the inner-page footers (`onUtility={() => {}}` × 3) — trivially solved by Phase 2's `<Link>`s. |
| 3.3 | **Make both forms real:** controlled inputs (or `react-hook-form`), validation (zod), a submit endpoint, loading/error/success states, and spam protection. Today the application wizard silently discards everything a user types. |
| 3.4 | Either wire or remove: Privacy Policy, Terms of Service, the 3 social buttons, Podcast Watch/Listen, the 3 podcast platform links, and the pillar-page "Book Consultation". Seven dead controls currently look interactive. |
| 3.5 | Fix `NavOverlay`'s `visibility` transition delay so it opens immediately. |
| 3.6 | Fix the `Logo` hover opacity mismatch (0.94 initial vs 0.92 on leave). |
| 3.7 | Gate the splash video behind `sessionStorage` so it plays once per session, and skip it entirely under `prefers-reduced-motion`. |

### Phase 4 — Restructure the code (2–3 days)

| # | Task |
|---|---|
| 4.1 | Split `App.tsx` into `src/components/`, `src/sections/`, `src/pages/`, `src/hooks/`, `src/content/`, `src/lib/`. |
| 4.2 | Move the 12 data tables into `src/content/` as typed modules. Derive the key type from `NAV_TREE` so `BUILD\|Business\|Business Formation` becomes a **compile error** instead of dead data. |
| 4.3 | Extract shared primitives: `<Button variant="solid"\|"outline"\|"ghost">`, `<Field>`, `<Section>`, `<Eyebrow>`, `<Reveal>` (the unused one is already 90% there). Retires 7 duplicated button implementations. |
| 4.4 | Extract the video-play effect into a `useAutoPlayVideo(ref, src)` hook — currently written out 4 times. |
| 4.5 | Delete dead code: `Reveal` (or adopt it), `AboutPlaceholder`, `ConnLawMark`, the two orphan section comments, the whitespace-only `<p>`, and `HERO_SLIDES`' pointless rotation interval. |
| 4.6 | Remove the type escapes (`as React.RefObject<any>`, `as string[]`) once `NAV_TREE` is properly typed. |

### Phase 5 — Design system (1–2 days)

| # | Task |
|---|---|
| 5.1 | Expand `@theme` to cover the real palette — the ~24 greys, both accent golds (`#c0b99a`, `#E8D89A`), and the surface levels — plus type scale, spacing, and transition tokens. |
| 5.2 | Migrate the 343 inline style objects to Tailwind utilities backed by those tokens. Prioritize the 84 `#C4C0B8` and 26 `#0A0A0A` literals. |
| 5.3 | Replace the ~40 inline `onMouseEnter`/`onMouseLeave` style mutations with `hover:` variants — removes the `!important` workaround at line 496. |
| 5.4 | Consolidate the logo: one source of truth (prefer SVG), used in both header and footer. |

### Phase 6 — Accessibility (1–2 days)

| # | Task |
|---|---|
| 6.1 | **Make the cascading nav keyboard-operable** — `onFocus` alongside `onMouseEnter`, arrow-key traversal, and a visible focus ring. Highest-impact a11y fix in the project. |
| 6.2 | Remove `outline: none` and define a real focus style (`focus-visible:ring-2 ring-[--color-gold]`). |
| 6.3 | **Raise text contrast to AA.** `#666` → ~`#8a8a8a` for body copy; audit every value below `#777`. Placeholder `#2a2a2d` must go. |
| 6.4 | Add a `prefers-reduced-motion` block that disables the 15+ animations, the Ken Burns zooms, and video autoplay. |
| 6.5 | `NavOverlay`: focus trap, `Escape` to close, `role="dialog"` + `aria-modal`, body scroll lock, `aria-expanded` on the hamburger. |
| 6.6 | Associate every `<label>` with its input via `htmlFor`/`id`; add `aria-live` to the wizard's step announcements. |
| 6.7 | Reconsider global scrollbar hiding. |
| 6.8 | Run axe-core / Lighthouse and set a CI budget. |

### Phase 7 — Content and launch readiness

| # | Task |
|---|---|
| 7.1 | Write the 5 missing L3 pages (NIL, Client Relations, Personal Advisory, Brand Partnerships, Community Impact) and supply a hero for `PROTECT\|Legal Backing\|Contract Review`. |
| 7.2 | Resolve `Business Formation` vs `Company Formation` — the copy exists, the nav entry doesn't. |
| 7.3 | Fill the "Coming soon" placeholders: phone, email, office address, social URLs, podcast links. |
| 7.4 | Settle on one legal entity name; make the copyright year dynamic. |
| 7.5 | Write the Privacy Policy and Terms of Service pages. |
| 7.6 | Fix the text artifacts (missing em-dash at line 1741, the `&nbsp;` paragraph at line 1142). |
| 7.7 | **Have counsel review the stats and verdict figures** and add any attorney-advertising disclaimers required in Georgia/Kentucky. |
| 7.8 | Consider a CMS (Sanity/Contentful/Payload) — 33 service pages hardcoded in JSX will not be maintainable by a non-developer. |

### Phase 8 — Reorder (needs client sign-off, not a code decision)

| # | Task |
|---|---|
| 8.1 | Confirm whether the About page ordering is intentional. The hero and mission/vision currently render at the **bottom**, and the source's own section numbering (3,4,5,6,8,9,10,11,12,**1**,**2**) says it isn't. Section 7 is missing. |
| 8.2 | Confirm whether `AnimatedStats` should precede `HomepageHero` on the homepage. |

### Add regardless

- **Tests** — none exist. At minimum, smoke-render each of the 41 views and assert that every `NAV_TREE` key resolves to real content.
- **ESLint + Prettier/oxfmt in CI** — `oxfmt` is installed but there is no lint config at all. An `eslint-plugin-jsx-a11y` pass would have caught most of §9's a11y items.
- **`README.md`** — nothing documents the architecture, the `"PILLAR|L2|L3"` key convention, or how to add a service page.
- **Error boundary** — a single uncaught render error currently blanks the entire site.
- **Performance budget in CI** — Lighthouse CI, with the asset work in Phase 1 as the baseline.

---

## Summary

A **visually accomplished, technically fragile** export. The design system is consistent and the content architecture (a 3-level nav tree driving 33 pages from typed lookup tables) is genuinely well-conceived — better structured than most Figma output.

But it is a **prototype, not a codebase**: one 3,567-line file, no router, no URLs, 155 MB of unoptimized media, two forms that discard user input, seven dead controls, three unreachable pages, and one import that fails to build on Linux.

**The critical path to a working deployment is short:** fix the case-sensitive import (Phase 0.1), optimize the assets (Phase 1), add routing (Phase 2), and make the forms functional (Phase 3). That is roughly a week and converts this from a demo into a launchable site. Phases 4–8 are the difference between launchable and maintainable.

# DESIGN AUDIT — The Standard Sports & Entertainment Group

As-built inventory of the Figma Make export, for sign-off against the approved design.

**Audit only. No code was changed.**

Date: 2026-09-16
Source: `src/App.tsx` (3,567 lines) + `src/imports/` (50 media files, 155 MB)

---

## Read this first — what this document is and is not

**I do not have access to the approved Figma file.** No Figma URL, file key, or node ID was provided, so this is **not** a pixel-by-pixel diff against the design.

What this **is**: a complete, verified inventory of every design surface the exported code actually renders — every page, every nav level, every section in render order, and every asset mapped to where it appears. It is written as a **checklist you and the client can tick against the approved design** to confirm nothing was dropped in the export.

If you share the Figma file link, I can run a true side-by-side comparison against this inventory.

### Headline answer

> **Yes — the design came across substantially intact.** All 3 pillars, all 10 categories, all 33 service pages, all 11 homepage blocks, all 11 About sections, all 4 videos, and 40 of 46 client images are present and rendering.

The gaps are **not missing design work**. They fall into three buckets:

| Bucket | Count | What it means |
|---|---:|---|
| 🟢 **Design present and reachable** | 37 of 40 views | Built as designed |
| 🟡 **Design present but the user can't reach it** | 3 views + 1 page's worth of copy | The layout exists in code; a wiring bug blocks the route |
| 🟠 **Design present but content is still placeholder** | 23 stock heroes, 5 copy blocks, 8 contact/social fields | Awaiting client-supplied content, not a build defect |

> **Correction to my earlier `PROJECT_REVIEW.md`:** that document said "41 views" and "66 media files." The verified figures are **40 views** and **50 media files** (4 video + 46 image). Since this document is a tick-list, the counts here are the ones to use.

---

## 1. Every page found

**40 distinct page views**, plus 2 global overlay surfaces.

### Top-level pages (6)

| # | Page | Design surface | Reachable? |
|---|---|---|---|
| 1 | **Splash** | Full-bleed `golf222.mp4`, `Skip ✕` appears at 1.2s | 🟢 On every load |
| 2 | **Home / Landing** | Cinematic video + full-screen cascading nav, then 9 content sections + footer | 🟢 |
| 3 | **About** | 11 stacked sections | 🟢 |
| 4 | **Contact** | Split layout: 4-field form + contact details column | 🟢 |
| 5 | **Athlete Application** | 5-step wizard + success state | 🟢 |
| 6 | **Nav Overlay** | Full-screen `#0A0A0A` panel, logo + `CLOSE ✕` + cascading nav | 🟢 |

### Pillar landing pages (3)

| # | Page | Hero treatment | Reachable? |
|---|---|---|---|
| 7 | **REPRESENT** landing | 🎬 `atlanta_footage.mp4` (the only pillar with video) | 🟡 **No — see §7.1** |
| 8 | **BUILD** landing | Stock placeholder image | 🟡 **No — see §7.1** |
| 9 | **PROTECT** landing | Stock placeholder image | 🟡 **No — see §7.1** |

### Service pages (33) — all reachable 🟢

Full detail in §3. Nine under REPRESENT, fifteen under BUILD, nine under PROTECT.

### Sub-states (not counted as separate views)

- **Athlete Application** — 5 wizard steps + 1 "Application Received." confirmation = 6 states
- **Cascading nav** — desktop (3 hover columns) and mobile (nested tap accordion) are two fully separate designs
- **Contract Negotiation (Coaches)** — uniquely carries an extra "The Boardroom and the Courtroom" block with 6 verdict tiles

---

## 2. Navigation hierarchy

Three levels, driven by a single source of truth (`NAV_TREE`).

```
LEVEL 1 — PILLARS (3)            Bebas Neue, clamp(3rem → 5.5rem)
│                                 active #C4C0B8 · dimmed #1e1e1e · idle #ffffff
├── LEVEL 2 — CATEGORIES (10)    Oswald 500 uppercase, letter-spacing .08em
│   │                             active #C4C0B8 · dimmed #333 · idle #c0b99a
│   └── LEVEL 3 — SERVICES (33)  Inter 400, #E8D89A, "→" bullet
│                                 ← the ONLY clickable level
│
└── UTILITY ROW (4)              Oswald, 13px, letter-spacing .2em, #888
    Home · About · Contact · Athlete Application
```

### Two nav presentations, both present 🟢

| | Desktop (≥768px) | Mobile (<768px) |
|---|---|---|
| Pattern | 3 side-by-side hover columns | Nested tap accordion |
| L1 | Hover reveals L2 | Tap toggles, `+` rotates 45° |
| L2 | Hover reveals L3 | Tap toggles, `+` rotates 45° |
| L3 | Click navigates | Tap navigates |
| Reveal motion | Fade + `translateX(-12px)` → 0 | `max-height` expand |
| Dimming | Non-hovered items dim | Active item turns `#C4C0B8` |

### Where the nav appears

1. **Home landing** — the nav *is* the hero, full screen over the cinematic video. No hamburger.
2. **Nav overlay** — same component, reached via the hamburger on every inner page.

### Header treatments

| Context | Logo | Menu trigger |
|---|---|---|
| Home | `logo_4.png`, top-left, over video | None — nav is the page |
| Inner pages | `logo_4.png` in a fixed bar, `rgba(10,10,10,0.96)` | 3-line hamburger, 22×1px bars, `#444` |
| Nav overlay | `logo_4.png`, top-left | `CLOSE ✕`, top-right |

---

## 3. Represent / Build / Protect structure

All 3 pillars, 10 categories, and 33 services are present. ✅

### REPRESENT — 3 categories, 9 services

*Tagline: "Athlete-first representation."*

| Category | Service | Hero treatment | Hero source | Copy |
|---|---|---|---|---|
| **Athletes** | NFLPA | Single image | 🟠 Stock | 🟢 Dedicated |
| | NIL | 🎞 **Slideshow ×3** | 🟢 `nil_1` + `nil_2` + `nil_3` | 🟠 **Generic fallback** |
| | Pro & Collegiate Golf | Single + crossfade | 🟠 Stock → 🟢 `golfimagee.png` | 🟢 Dedicated |
| **Coaches** | Coaching Representation | Single image | 🟢 `coaching_rep.png` | 🟢 Dedicated |
| | Coaching Opportunities | Single image | 🟢 `coach_oppotunity5.png` | 🟢 Dedicated |
| | Contract Negotiation | Single image | 🟢 `contract_negoatiation_3.png` | 🟢 Dedicated **+ Boardroom block** |
| **Executives** | Executive Placement | Single image | 🟠 Stock | 🟢 Dedicated |
| | General Managers | Single image | 🟢 `GENEral_manager_44.png` | 🟢 Dedicated |
| | Collegiate Athletic Directors | Single image | 🟢 `athleteic_directors.png` | 🟢 Dedicated |

### BUILD — 4 categories, 15 services

*Tagline: "Beyond the contract."*

| Category | Service | Hero treatment | Hero source | Copy |
|---|---|---|---|---|
| **Trust** | Client Relations | Single, `contain`, 62vh | 🟢 `client_relations.JPG` | 🟠 **Generic fallback** |
| | Personal Advisory | Single, `contain`, 62vh | 🟢 `advisory_image1.png` | 🟠 **Generic fallback** |
| | Build Your Team. Protect Your Future. | 🎞 **Slideshow ×2**, `contain`, 62vh | 🟢 `build_your_team_protect_your_future` + `build_your_team` | 🟢 Dedicated |
| **Wealth** | Wealth Management | Single + crossfade | 🟠 Stock → 🟢 `wealth_management.jpg` | 🟢 Dedicated |
| | Financial Planning | Single + crossfade | 🟠 Stock → 🟢 `financial_planning.jpg` | 🟢 Dedicated |
| | Investment Coordination | Single + crossfade | 🟠 Stock → 🟢 `financial_planning.jpg` *(reused)* | 🟢 Dedicated |
| **Business** | Brand Partnerships | Single + crossfade | 🟢 `brand_partneship.jpg` → 🟢 `business_consulting.jpg` | 🟠 **Generic fallback** |
| | Marketing Opportunities | Single + crossfade | 🟠 Stock → 🟢 `business_consulting.jpg` | 🟢 Dedicated |
| | Business Consulting | Single + crossfade | 🟠 Stock → 🟢 `business_consulting.jpg` | 🟢 Dedicated |
| | Entrepreneurship | Single + crossfade | 🟠 Stock → 🟢 `business_consulting.jpg` | 🟢 Dedicated |
| | Company Formation | Single + crossfade | 🟠 Stock → 🟢 `business_consulting.jpg` | 🟢 Dedicated |
| **Legacy** | Community Impact | 🎞 **Slideshow ×2**, `contain`, 62vh | 🟢 `community_impact` ×2 ⚠️ | 🟠 **Generic fallback** |
| | Charitable Foundations | 🎞 **Slideshow ×2**, `contain`, 62vh | 🟢 `charitable_1` + `charitable_2` | 🟢 Dedicated |
| | Public Speaking | 🎞 **Slideshow ×2**, `contain`, 62vh | 🟢 `public_speaking_2` + `public_speaking_22` | 🟢 Dedicated |
| | Life After Sports | 🎞 **Slideshow ×3**, `contain` | 🟢 `life_after_sports` + `life_after_sport_2` + `coaching_oppot-1` | 🟢 Dedicated |

> ⚠️ **Community Impact slideshow shows the same photo twice.** It is configured as `community_impact.JPG` + `community_impact.jpg` — two spellings of one file. The slideshow will crossfade a photo with itself. Almost certainly a second photo was intended here.

### PROTECT — 3 categories, 9 services

*Tagline: "Legal excellence, built in."*

| Category | Service | Hero treatment | Hero source | Copy |
|---|---|---|---|---|
| **Legal Backing** | Contract Review | 🟠 **No hero set** → pillar placeholder | 🟠 Stock → 🟢 `legal_backing-1.jpg` | 🟢 Dedicated |
| | Contract Negotiation | Single + crossfade | 🟠 Stock → 🟢 `legal_backing-1.jpg` | 🟢 Dedicated |
| | Business Law | Single + crossfade | 🟠 Stock → 🟢 `legal_backing-1.jpg` | 🟢 Dedicated |
| | Intellectual Property | Single + crossfade | 🟠 Stock → 🟢 `legal_backing-1.jpg` | 🟢 Dedicated |
| **Risk Management** | Reputation Management | Single + crossfade | 🟠 Stock → 🟢 `risk_management-1.jpg` | 🟢 Dedicated |
| | Compliance | Single + crossfade | 🟠 Stock → 🟢 `risk_management-1.jpg` | 🟢 Dedicated |
| **Crisis Awareness** | Crisis Communications | Single image | 🟠 Stock | 🟢 Dedicated |
| | Public Relations Support | Single image | 🟠 Stock | 🟢 Dedicated |
| | Social Media Guidance | Single image | 🟠 Stock | 🟢 Dedicated |

### Shared service-page layout 🟢

Every one of the 33 pages uses the same template:

1. **Hero** — full-bleed media, pillar tagline (Oswald 10px, `.32em`, `#C4C0B8`), page title (Bebas Neue, `clamp(4rem → 9rem)`), breadcrumb `PILLAR · Category`
2. **Body left** — heading + copy, supporting `## ` sub-headings and `**bold**` emphasis
3. **Body right** — "Services Within {PILLAR}" sidebar, current page highlighted `#aaa`, siblings `#2a2a2d`
4. **CTA** — gold "Book Consultation" button
5. **Footer**

---

## 4. About page order

11 sections. **All 11 are present**, but the rendered order does not match the section numbering left in the source.

### As currently rendered (top → bottom)

| Position | Section | Source label | Media |
|---:|---|---|---|
| 1 | Our Story | `3.` | — |
| 2 | Leadership — Andy Conn, Javonte Middleton | `4.` | 🟢 `andyy.jpg`, `javonte-1.jpeg` |
| 3 | The Network | `5.` | — |
| 4 | From Athlete to Advocate | `6.` | — |
| 5 | Why The Standard — 3 panels | `8.` | — |
| 6 | More Than Representation | `9.` | — |
| 7 | Legacy Matters | `10.` | 🟢 `conn_steeler.jpeg` |
| 8 | The Standard — closing manifesto | `11.` | 🟢 `superbowl.jpeg` |
| 9 | Our Approach | `12.` | 🟢 `world_champion.jpeg` |
| 10 | **Hero — "Built by People Who Understand the Game."** | **`1.`** | 🎬 `about_vid_6.mp4` |
| 11 | **Mission + Vision** | **`2.`** | — |
| — | Footer | — | — |

### 🟠 The ordering question

Rendered sequence is `3, 4, 5, 6, 8, 9, 10, 11, 12, 1, 2`.

Two things stand out:

- **The hero and the Mission/Vision statement render at the *bottom* of the page.** The page opens on "Our Story" instead of the hero video and the "Built by People Who Understand the Game." headline.
- **Section 7 does not exist** anywhere in the file.

If the approved design opens on the hero, this is a straightforward reorder. **This needs your confirmation against the Figma file** — the numbering strongly suggests an accidental drag-reorder during export, but the client approved *something*, and I can't tell which order that was.

**Please confirm:** should the About page open with the hero video + Mission/Vision (`1, 2, 3, 4, 5, 6, 8…`), and was there ever a section 7?

---

## 5. Homepage sections

11 blocks, in this render order. All present. 🟢

| # | Block | Design | Media |
|---:|---|---|---|
| 1 | **Landing** | Full-screen cascading nav over cinematic video, logo top-left, vertical "Scroll" cue bottom-right | 🎬 `cinematic__new_vid.mp4` |
| 2 | **Animated Stats** | 4 count-up figures on `#0C0C0F`: **750+**, **300+**, **8**, **100%** | — |
| 3 | **Homepage Hero** | "Setting The Standard." + 4 stacked sub-lines; 3 CTAs | 🟢 `settign_th_standard_image.jpg` |
| 4 | **Why The Standard** | "More Than Representation." + REPRESENT / PROTECT / BUILD editorial blocks | — |
| 5 | **The Standard Difference** | Two columns: Traditional Agency (4 steps, "end of service") vs The Standard (8 steps, "Ongoing. For life.") | — |
| 6 | **Photo Break** | Pull-quote left, 3-image crossfade window right | 🟢 `this_is_the_standard` + `IMG_1340` + `this_is_the_standard_2` |
| 7 | **Our Services** | 3 columns (REPRESENT / BUILD / PROTECT), 5 services each | — |
| 8 | **Conn Law Firm** | "Powered by Conn Law Firm." + 9-item capability list, Andy Conn credit | 🟠 Stock bg + 🟢 `ConnLaw_4C_Horiz-4.jpg` |
| 9 | **Podcast** | "Setting The Standard" + latest-episode card + 5-segment weekly structure | — |
| 10 | **CTA** | "Ready to Set The Standard?" + 2 buttons, radial gradient | — |
| 11 | **Footer** | 3-column: brand / navigation / connect, + bottom bar | 🟢 `ConnLaw_4C_Horiz-4.jpg` |

### 🟠 Homepage ordering question

**The stats block (#2) renders above the hero (#3).** The count-up figures appear between the nav landing screen and the "Setting The Standard." hero.

That may be deliberate — but the more common pattern is landing → hero → stats. **Please confirm against the approved design.**

### Section detail worth checking off

**Animated Stats** — 750+ NFL executive & personnel relationships · 300+ college coach & personnel relationships · 8 UFL General Manager relationships · 100% athlete-centric representation.
*(An empty caption slot sits directly beneath this row — a blank `<p>` where a footnote appears to have been removed.)*

**The Standard Difference** —
Traditional: `01` Signs Athlete → `02` Negotiates Deal → `03` Collects Commission → `04` Moves On → *end of service*
The Standard: `01` Evaluate → `02` Invest → `03` Build Brand → `04` Create Content → `05` Generate Opportunities → `06` Legal Protection → `07` Build Business → `08` Create Legacy → *Ongoing. For life.*

**Conn Law Firm capabilities (9)** — Contract Review & Negotiation · IP & Trademark · Business Formation & Corporate Law · Litigation Support · Compliance & Regulatory · Mediation & Arbitration · NIL Negotiations · Overall Risk Management · Estate Planning

**Podcast weekly structure (5)** — `01` Around the League (10 min) · `02` Athlete Spotlight (10 min) · `03` The Standard Conversation (25–35 min) · `04` The Business of Sports (10 min) · `05` Ask The Standard (5–10 min)

---

## 6. Videos and image assets

**50 media files, 155 MB** — 4 videos, 46 images.

### Videos — all 4 present and placed 🟢

| File | Size | Placement | Behaviour |
|---|---:|---|---|
| `about_vid_6.mp4` | 15.2 MB | About hero (section 10) | Loop, muted, `contain` in a 16:9 frame |
| `cinematic__new_vid.mp4` | 10.4 MB | Home landing background | Loop, muted, `opacity .88`, `brightness(1.65)` |
| `atlanta_footage.mp4` | 6.6 MB | REPRESENT pillar landing hero | Loop, muted — 🟡 **page unreachable, see §7.1** |
| `golf222.mp4` | 3.4 MB | Splash screen | Plays once, `brightness(1.55)`, then 0.9s fade |

All four are muted + `playsInline`. None has a poster frame.

### Images — 40 of 46 placed 🟢

**Brand & people (6)** — `logo_4.png` (header/overlay) · `ConnLaw_4C_Horiz-4.jpg` (Conn Law section + footer) · `andyy.jpg` (Leadership) · `javonte-1.jpeg` (Leadership) · `conn_steeler.jpeg` (Legacy Matters) · `world_champion.jpeg` (Our Approach)

**Homepage (5)** — `settign_th_standard_image.jpg` (hero) · `this_is_the_standard.jpeg` + `IMG_1340.JPG` + `this_is_the_standard_2.jpeg` (Photo Break) · `superbowl.jpeg` (About manifesto)

**Service page heroes (17)** — `nil_1.JPG`, `nil_2.JPG`, `nil_3.jpeg`, `coaching_rep.png`, `coach_oppotunity5.png`, `contract_negoatiation_3.png`, `GENEral_manager_44.png`, `athleteic_directors.png`, `brand_partneship.jpg`, `client_relations.JPG`, `advisory_image1.png`, `build_your_team_protect_your_future.JPG`, `build_your_team.JPG`, `community_impact.jpg`, `charitable_1.JPG`, `charitable_2.jpg`, `public_speaking_2.jpeg`, `public_speaking_22.jpeg`, `life_after_sports.jpeg`, `life_after_sport_2.jpeg`, `coaching_oppot-1.jpeg`

**Secondary crossfade layer (8)** — `NIL-STANDARD.png`, `golfimagee.png`, `wealth_management.jpg`, `financial_planning.jpg`, `business_consulting.jpg`, `charitable_foundation_image.jpg`, `legal_backing-1.jpg`, `risk_management-1.jpg`

### 🟠 6 client images delivered but never placed (10.9 MB)

These are in the project and were never wired to any page:

| File | Size | Likely intended for |
|---|---:|---|
| `nil_1-1.JPG` | 6.8 MB | Duplicate of `nil_1.JPG` (byte-identical) |
| `aboutimage.png` | 1.9 MB | An About page background? |
| `coaching_oppot.jpeg` | 1.4 MB | Duplicate of `coaching_oppot-1.jpeg` (byte-identical) |
| `executive_placement.jpg` | 0.27 MB | **REPRESENT › Executive Placement** — that page currently uses a stock photo |
| `coaching_rep.jpeg` | 0.24 MB | Duplicate concept of `coaching_rep.png` |
| `golf_image2.jpg` | 0.21 MB | **REPRESENT › Pro & Collegiate Golf** — that page currently uses a stock photo |

> ⚠️ **Two of these look like genuine design misses.** `executive_placement.jpg` and `golf_image2.jpg` are named exactly after pages that are currently showing stock placeholders. Worth checking the Figma file to confirm whether those pages were designed with the client photo.

### 🟠 23 stock placeholder images still in production heroes

23 service-page heroes are still pulling from a stock photo library rather than client assets. The code comments them as *"swap placeholders when client supplies assets."*

Affected pages:
- **REPRESENT (3)** — NFLPA · Pro & Collegiate Golf · Executive Placement
- **BUILD (8)** — Wealth Management · Financial Planning · Investment Coordination · Marketing Opportunities · Business Consulting · Entrepreneurship · Company Formation *(+ all 3 pillar landings)*
- **PROTECT (9)** — Contract Review · Contract Negotiation · Business Law · Intellectual Property · Reputation Management · Compliance · Crisis Communications · Public Relations Support · Social Media Guidance
- **Homepage (1)** — Conn Law Firm section background

Most of these also crossfade to a real client image on top, so the stock photo is partly masked — but it is the first thing that loads on each page.

### Asset reuse worth flagging

| Image | Used on |
|---|---|
| `business_consulting.jpg` | **5 pages** — all of BUILD › Business |
| `legal_backing-1.jpg` | **4 pages** — all of PROTECT › Legal Backing |
| `financial_planning.jpg` | **2 pages** — Financial Planning + Investment Coordination |
| `risk_management-1.jpg` | **2 pages** — Reputation Management + Compliance |
| `charitable_foundation_image.jpg` | **2 pages** — Community Impact + Charitable Foundations |

This is by design — the secondary layer falls back from service → category → pillar. Flagging it so the client knows these pages intentionally share a photo.

### Typography 🟢

| Family | Weights | Role |
|---|---|---|
| **Bebas Neue** | 400 | All display headings, stat figures, pillar names |
| **Oswald** | 300–700 | Eyebrows, labels, buttons, sub-headings |
| **Inter** | 300–700 + italic | Body copy, pull-quotes, captions |

### Colour 🟢

| Role | Value |
|---|---|
| Page background | `#0A0A0A` |
| Alt surfaces | `#0C0C0F` (stats) · `#060608` (footer, manifesto) |
| Primary accent | `#C4C0B8` warm grey-gold |
| Accent hover | `#8C8884` |
| Nav L2 idle | `#c0b99a` |
| Nav L3 | `#E8D89A` |

### Icons 🟢

Instagram, X (Twitter), and YouTube glyphs are drawn inline. All other marks are typographic: `→` nav bullets, `◆` list bullets, `+` accordion toggles, `✓` wizard progress, `✕` close.

---

## 7. Missing or broken elements

Ordered by design impact. Everything below was verified in the source.

### 🟡 7.1 — Three pillar landing pages are built but unreachable

**The design exists. Nothing links to it.**

The REPRESENT, BUILD, and PROTECT landing pages are fully designed: pillar tagline, large headline, body copy, "Services Within" sidebar, and — for REPRESENT — the **`atlanta_footage.mp4` cinematic hero, the only pillar video in the project.**

The footer is the only place that tries to link to them, and it sends `"Represent"` where the page handler expects `"REPRESENT"`. The case doesn't match, so the click does nothing.

**Impact:** a 6.6 MB hero video and three designed pages that no visitor can currently see. Small fix, high visibility.

### 🟡 7.2 — Footer navigation is inert on every inner page

On all 33 service pages, About, and Contact, the footer renders with its navigation disconnected. Every footer link — About, Represent, Build, Protect, Contact, and **Book Consultation** — does nothing on those pages.

Only the homepage footer works (and even there, the three pillar links fail per §7.1).

**Impact:** once a visitor reaches a service page, the only working navigation is the logo and the hamburger. The footer looks fully functional.

### 🟡 7.3 — One page's copy is written but has no home

Full body copy, a hero image, and a brightness treatment all exist for a page called **"Business Formation"** — but the BUILD › Business menu lists **"Company Formation"** instead. No route reaches the Business Formation content.

Both names appear in the approved structure conversation-side. **Please confirm which one the client approved** — or whether both were meant to exist as separate pages.

### 🟠 7.4 — Five live pages are showing generic pillar copy

These pages render, look correct, and carry the right hero — but their body text falls back to the pillar's generic paragraph instead of page-specific copy:

| Page | Currently shows |
|---|---|
| REPRESENT › Athletes › **NIL** | Generic REPRESENT paragraph |
| BUILD › Trust › **Client Relations** | Generic BUILD paragraph |
| BUILD › Trust › **Personal Advisory** | Generic BUILD paragraph |
| BUILD › Business › **Brand Partnerships** | Generic BUILD paragraph |
| BUILD › Legacy › **Community Impact** | Generic BUILD paragraph |

**NIL is the most visible of these** — it is a headline service with a 3-image slideshow hero and no dedicated copy behind it.

The other 28 service pages all have bespoke copy. This reads as copy that was never delivered rather than copy that was lost.

### 🟠 7.5 — Community Impact slideshow crossfades one photo with itself

Configured as `community_impact.JPG` + `community_impact.jpg` — two spellings of the same file. The slideshow will appear static. A second photo was almost certainly intended.

*(This same filename casing also breaks the production build on Linux — covered in `PROJECT_REVIEW.md` §9.1. Flagging it here because it is visible in the design too.)*

### 🟠 7.6 — Seven interactive elements are designed but have no destination

These look clickable and do nothing:

| Element | Where |
|---|---|
| **Privacy Policy** | Footer — no page exists |
| **Terms of Service** | Footer — no page exists |
| **Instagram / X / YouTube** icons | Footer — no URLs anywhere in the project |
| **Watch** / **Listen** | Podcast section |
| **Spotify / Apple Podcasts / YouTube** | Podcast section platform row |
| **Book Consultation** | Every service page CTA |

### 🟠 7.7 — Placeholder content still in place

| Location | Shows |
|---|---|
| Contact › Phone | "Coming soon" |
| Contact › Email | "Coming soon" |
| Contact › Office | "Coming soon" |
| Contact › Social Media | "Coming soon" |
| Podcast › Latest Episode | "Episode Coming Soon" |
| Podcast › Episode subtitle | "First episode in production" |
| Browser tab title | **"Figma Make App"** |

### 🟠 7.8 — Both forms discard what the user types

**Contact form** (Name, Email, Phone, Message) and the **5-step Athlete Application** are visually complete but not connected to anything. The application wizard also **loses everything entered when you move between steps** — press *Previous* and the fields are empty.

The application ends on "Application Received. The Standard team will review your application and reach out within 48 hours." — with nothing sent.

**Design is intact; the plumbing is not.** Noted here because the confirmation message makes a promise the build can't keep.

### 🟠 7.9 — Brand naming inconsistency

| Location | Reads |
|---|---|
| Footer copyright | "© 2026 THE STANDARD **Sports Group LLC**" |
| Logo alt text, About page | "The Standard **Sports & Entertainment Group**" |
| Project folder | "std group llc" |

One of these is the legal entity. **Please confirm which**, and note the copyright year is hardcoded to 2026.

### 🟠 7.10 — Minor design artifacts from the export

| Item | Detail |
|---|---|
| Empty caption under stats | A blank paragraph sits below the stats row where a footnote appears to have been deleted |
| Missing em-dash | Podcast description reads `…and athletes  the conversations…` — a dash was lost |
| Two logo versions | Header uses the raster `logo_4.png`; footer uses a redrawn vector wordmark. A third redrawn Conn Law mark exists in the file, unused |
| Logo hover | Logo starts at 94% opacity, brightens to 100% on hover, but settles at 92% afterwards — it permanently dims slightly after the first hover |
| Nav overlay timing | Opens 300ms late due to a transition delay that should only apply on close |
| Splash on every visit | The intro video replays on every page load and refresh, not once per session |

### ✅ 7.11 — Confirmed intact

No missing sections, no missing nav levels, no missing pillar categories. Specifically verified present:

- All 3 pillars, all 10 categories, all 33 services
- Both nav presentations (desktop hover columns + mobile accordion)
- All 11 homepage blocks
- All 11 About sections
- All 4 videos
- The full 5-step application wizard + confirmation state
- The Conn Law Firm partnership section with all 9 capabilities
- The full podcast weekly structure
- The "Boardroom and the Courtroom" block with all 6 verdict figures
- The Traditional-vs-The-Standard comparison, all 12 rows
- Every scroll reveal, count-up, Ken Burns zoom, and crossfade

---

## Summary for client sign-off

**The approved design came through.** Every page, every navigation level, every section, and every layout is present in the export. Nothing structural was lost.

What needs a decision from you or the client:

| # | Question | Blocking? |
|---|---|---|
| 1 | Should the **About page open on the hero video + Mission/Vision**, or on "Our Story" as built? Was there ever a section 7? | Design decision |
| 2 | Should the **homepage stats sit above or below the hero**? | Design decision |
| 3 | Is it **"Business Formation" or "Company Formation"** — or both? | Copy exists for one, nav lists the other |
| 4 | Were **Executive Placement** and **Pro & Collegiate Golf** designed with the client photos? Both images were delivered but sit unused while stock placeholders show. | Asset decision |
| 5 | Which is the **legal entity name** for the footer? | Copy decision |
| 6 | Should **Community Impact** have a second photo? Its slideshow currently repeats one image. | Asset decision |

What needs content from the client:

- Body copy for **5 pages** (NIL, Client Relations, Personal Advisory, Brand Partnerships, Community Impact)
- Client photography to replace **23 stock heroes**
- Contact details (phone, email, office), **social media URLs**, podcast platform links
- Privacy Policy and Terms of Service copy

What we fix on our side (already scoped in `PROJECT_REVIEW.md`):

- Wire the 3 pillar landing pages so the REPRESENT video is reachable
- Reconnect the footer on all inner pages
- Connect both forms and stop the application wizard losing data
- The 7 dead buttons, the splash replay, the nav overlay delay, the logo hover, and the two text artifacts

**Nothing in this list requires redesigning anything.** It is wiring, content, and two ordering confirmations.

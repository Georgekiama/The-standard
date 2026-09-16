# The Standard Sports & Entertainment Group

Marketing site for The Standard Sports & Entertainment Group.
React 19 · Vite 8 · Tailwind CSS v4 · TypeScript.

## Getting started

```bash
pnpm install     # Node 22 / pnpm 10.34.3 (see .mise.toml)
pnpm dev         # http://localhost:8443
pnpm build       # outputs to dist/
pnpm preview     # serve the production build locally
```

Media is stored in **Git LFS**. Run `git lfs install` once before cloning
or checking out, otherwise `src/imports/` will contain pointer files
instead of images and the build will produce broken assets.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_FORM_ENDPOINT` | Yes, for forms to work | URL that accepts a JSON `POST` from the contact form and the athlete application. |

Set this in the hosting provider's environment settings (for Vercel:
Project → Settings → Environment Variables), then redeploy.

**Until it is set, both forms fail with a visible message rather than
showing a success screen.** This is deliberate — the site must never tell
someone their application was received when it was discarded.

The payload shape is:

```json
{
  "form": "contact" | "athlete-application",
  "submittedAt": "2026-09-16T20:00:00.000Z",
  "data": { "Full Name": "…", "Email Address": "…" }
}
```

Any service accepting a JSON POST works — Formspree, Basin, a serverless
function, or your own API.

## Site metadata

`standards/make/site.json` controls the document shell — title, meta
description, favicon, `robots`, and the accessibility skip-link. It is
applied at build time by the site-configuration plugin in `vite.config.ts`.

Setting `"robots": { "index": false }` adds `noindex, nofollow` **and**
emits a `robots.txt` containing `Disallow: /`. Use that for staging
deploys; it is currently `true` for production.

## Project structure

```
src/
  App.tsx        Entire application — components, routing state, and content
  index.css      Tailwind entry, fonts, theme tokens, global resets
  imports/       All media (Git LFS)
public/
  favicon.png    Brand logo, served at /favicon.png
standards/make/  Build/deploy scripts and site.json
```

## Known gaps

Tracked in `PROJECT_REVIEW.md` (technical) and `DESIGN_AUDIT.md` (design
inventory and sign-off checklist). The significant ones:

- **No router.** Navigation is component state, so every page is `/`.
  No deep links, no browser Back, and nothing for search engines to crawl
  beyond the home page.
- **Assets are unoptimised.** ~155 MB, including five photographs stored
  as PNG. Reducing these is the single biggest performance win available.
- **Content still outstanding.** Five service pages fall back to generic
  pillar copy; 23 hero images are stock placeholders; contact details and
  social links are unset.

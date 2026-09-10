# FairGuide

**Experience Uzbekistan through its people.**

FairGuide is a community-powered tourism platform for international tourists visiting Uzbekistan —
connecting visitors with trusted local guides and translators, with planned ecosystems for
student volunteers and Uzbek host families.

This repository contains the public marketing website (premium soft-UI, 5 languages) and an
admin control panel where **all content is editable** — logo, brand, contact info, images,
guide profiles, every section's copy in every language.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** — custom soft-UI design system (neumorphic shadows, warm cream + turquoise/saffron palette)
- **i18n** — JSON translation files per language with English fallback; runtime overrides from the admin panel
- **File-based persistence** — admin edits are stored in `data/content.json` (gitignored)

## Languages

| Code | Language | URL |
|------|----------|-----|
| en (default) | English | `/` |
| uz | O‘zbekcha | `/uz` |
| ru | Русский | `/ru` |
| tr | Türkçe | `/tr` |
| zh | 中文 | `/zh` |

## Getting started

```bash
npm install
npm run dev        # development
npm run build && npm start   # production (binds 0.0.0.0:3000)
```

## Admin control panel

Open **`/admin`**.

- Default password: `fairguide2026` — change it immediately in the panel (sidebar → Change password).
- **Site & Branding** (global, all languages): logo (text or uploaded image), tagline, contact, socials, footer description.
- **Translations** (per language): every section — hero, pillars, problem, guide profiles (incl. photos), price scanner, volunteer, host, platform cards, city gallery (incl. optional photos), how-it-works, FAQ, trust, vision, final CTA, footer, forms, and all secondary pages.
- Save / Discard / Reset-to-defaults per section; unsaved-changes protection; image uploads (max 5 MB) stored in `public/uploads/`.

### Content model

Defaults live in `src/i18n/*.json` (the source of truth, expandable). Admin edits are stored as
overrides in `data/content.json` and merged over the defaults at render time:

```
defaults (i18n files)  <  admin overrides (data/content.json)
```

Adding a new language: add a JSON file in `src/i18n/`, register it in `src/lib/locales.ts`
and `src/lib/content.ts` — the switcher, hreflang and sitemap pick it up automatically.

## Pages

`/` · `/how-it-works` · `/for-tourists` · `/for-guides` · `/volunteer` · `/host` · `/about` · `/privacy` · `/terms` — each available in all 5 locales (English at the root).

Planned architecture space (ready to be added): tourist dashboard, guide marketplace, volunteer
dashboard, host marketplace, bookings, product scanner, profiles, messaging, reviews,
certificates, ministry-partnership workflow, trip planner.

## Notes

- Reference prices are provided as informational reference data; the site never claims to be fraud-proof.
- Volunteer and host ecosystems are clearly labeled as planned features.
- SEO: semantic HTML, per-page titles/descriptions, Open Graph + Twitter cards, hreflang, `sitemap.xml`, `robots.txt`, lazy-loaded images with alt text.

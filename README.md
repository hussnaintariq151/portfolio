# Hussnain Tariq — Portfolio

Personal portfolio site: Home, Software, AI, Chemistry, About, Contact.
Design inspired by brittanychiang.com (dark navy + mint accent, mono type).
Plain HTML/CSS/JS — no build step, no dependencies. Deploys anywhere static.

## Structure

```
portfolio/
├── index.html          # Home (hero + about + 3 disciplines + featured work)
├── software.html       # 01 · Software engineering (backend, MLOps, IaC)
├── ai.html             # 02 · AI engineering (ML, DL, GenAI, RAG)
├── chemistry.html      # 03 · Chemistry MS (battery, hydrogen, drugs)
├── about.html          # 04 · Story, education, self-learning, experience
├── contact.html        # Email + socials
├── 404.html            # Not-found page (styled, matches the site)
├── styles.css          # Shared design system
├── main.js             # Menu, nav scroll state, scroll progress, reveals
├── favicon.svg         # "HT" mark
├── og.png              # 1200×630 social preview card
├── robots.txt          # Crawler rules + sitemap pointer
├── sitemap.xml         # Six URLs
├── vercel.json         # Clean URLs, security headers, asset caching
└── README.md           # This file
```

## Design system

- **Palette**: deep navy (`#0a192f`) background, mint (`#64ffda`) accent
- **Per-page accent**: `body.page-ai` and `body.page-chemistry` override `--accent`
  (blue / purple) so each discipline reads differently without a second stylesheet
- **Type**: Inter (body), JetBrains Mono (numbers, code labels, nav)
- **Style**: dark theme, generous whitespace, hover reveals, side rails for socials
- **Responsive**: 320px mobile up; nav collapses to a menu below 760px
- **Motion**: scroll-driven reveals, all disabled under `prefers-reduced-motion`
- **Print**: `@media print` switches to a light, chrome-free layout for PDF export

## Behaviour notes

- **No-JS safe.** Reveal animations only hide content once `main.js` adds `class="js"`
  to `<html>`. With JavaScript off, every page renders fully.
- **Side rails** (the fixed social icons on desktop) are `aria-hidden` and
  `tabindex="-1"` — they duplicate the footer links, so they stay out of the
  tab order and out of screen readers.
- **Accessibility**: skip link, visible focus rings, one `<h1>` per page,
  `aria-current="page"` on the active nav item, labelled sections.

## Before you go live

1. **Set your real domain.** The placeholder `https://hussnaintariq.vercel.app`
   appears in `<link rel="canonical">` and the `og:`/`twitter:` tags of every page,
   plus `robots.txt`, `sitemap.xml`, and the JSON-LD block in `index.html`.
   Find and replace it everywhere once you know your final URL.
2. **Add real project links.** Project cards currently point at your GitHub profile
   and are marked with `<!-- TODO -->` in `index.html`, `software.html`, `ai.html`.
   Replace each `href` with the repo or live-demo URL.
   **NDA entries are deliberately not links** — they render as plain `<div class="project-row">`
   with a `<span class="badge">under NDA</span>`, describe architecture only, and name no
   client, product, or internal system. Keep that convention if you add more.
3. **Check the dates.** The education timeline in `about.html` and `chemistry.html`
   still reads "2023 — present" for the MS.
4. **Regenerate `og.png`** if you change your headline — it is a plain 1200×630 PNG,
   so any image editor works.

## Deploy to Vercel

**Option A — GitHub + Vercel dashboard (easiest):**
1. Push this `portfolio` folder to a new GitHub repo (e.g. `hussnaintariq151/portfolio`).
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo → Deploy.
3. Done. You'll get a live URL like `hussnain-tariq.vercel.app`.
4. (Optional) Add a custom domain later from the Vercel dashboard.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
cd portfolio
vercel          # preview deploy
vercel --prod   # production deploy
```

`vercel.json` turns on clean URLs (`/about`, not `/about.html`), sets sensible
security headers, and caches CSS/JS/images for a day. Internal links still use
`.html` so the site works when opened from a plain file server too — Vercel
redirects those to the clean URL automatically.

Also works on Netlify (drag the folder to app.netlify.com/drop) or GitHub Pages,
though the `vercel.json` headers are Vercel-specific.

## Local preview

Any static server works. Fastest:
```bash
cd portfolio
python -m http.server 8000
# open http://localhost:8000
```

# Hussnain Tariq — Portfolio

Personal portfolio site: Home, Software, AI, Chemistry, About, Contact.
Design inspired by brittanychiang.com (dark navy + mint accent, mono type).
Plain HTML/CSS/JS — no build step, no dependencies. Deploys anywhere static.

## Structure

```
portfolio/
├── index.html          # Home (hero + about + 3 disciplines + featured work)
├── software.html       # 01 · Software engineering — a blueprint band plus one
│                       #      section per pillar (security, API design,
│                       #      performance, reliability, observability, data
│                       #      integrity, scalability, delivery), then work,
│                       #      stack and the portrait band
├── ai.html             # 02 · AI engineering (ML, DL, GenAI, RAG)
├── chemistry.html      # 03 · Chemistry MS (battery, hydrogen, drugs)
├── about.html          # 04 · Story, education, self-learning, experience
├── contact.html        # Email + socials
├── 404.html            # Not-found page (styled, matches the site)
├── styles.css          # Shared design system
├── main.js             # Menu, nav scroll state, scroll progress, reveals
├── favicon.svg         # "HT" mark
├── hero-1..3.jpg       # Hero slideshow frames, shared by home and 01 (2400px)
├── about-portrait.jpg  # Home-page "About me" portrait
├── industries-lab.jpg  # Home-page Industries band photo
├── software-portrait.jpg # 01 · "Who you’d be working with" portrait
├── work-desk.jpg       # 01 · "At the desk" row (1 of 3)
├── work-lab.jpg        # 01 · "At the desk" row (2 of 3)
├── work-cafe.jpg       # 01 · "At the desk" row (3 of 3)
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

## Home-page hero

The home page uses a full-bleed cinematic hero (`.cinema` in `styles.css`): three
photos crossfade with a slow Ken Burns push-in, the nav floats transparently over
the image until you scroll, and a dark scrim keeps the headline readable on every
frame. It is CSS-only — no JavaScript drives the slideshow.

- **Swapping photos**: replace `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`. Keep them
  ~2400px wide, landscape, and reasonably dark or low-detail. `hero-1.jpg` is also
  the static base layer (and the preloaded LCP image), so make it the strongest shot.
- **Mobile**: slides 2 and 3 are `display:none` below 700px, so phones only download
  `hero-1.jpg` — about 950 KB saved. The hero is a still image there.
- **Reduced motion**: the crossfade and the scroll cue stop; a single still frame shows.
- **Photo credits**: Timo Volz, Da Shika, Sascha Albert — via Unsplash
  ([Unsplash License](https://unsplash.com/license): free for commercial use,
  attribution not required).

Only `index.html` carries `<body class="home">`; every other page keeps the standard
solid nav and compact hero.

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

`vercel.json` turns on clean URLs (`/about`, not `/about.html`) and sets security
headers. Internal links still use `.html` so the site works when opened from a plain
file server too — Vercel redirects those to the clean URL automatically.

**Cache policy — do not raise the CSS/JS max-age.** Filenames here are not
content-hashed (`styles.css` is always `styles.css`), so a long `max-age` means a
returning visitor gets fresh HTML paired with a stale stylesheet, and the page
renders new markup with no matching rules. CSS and JS therefore revalidate on
every load — ETags make that a cheap `304`. Media gets one hour plus
`stale-while-revalidate`. If you ever add a build step that hashes filenames,
long caching becomes safe again.

Note that `vercel.json` is validated against a strict schema
(`additionalProperties: false`): a `"comment"` key inside a `headers` entry fails
the build. That is why this explanation lives here rather than in the file.

Also works on Netlify (drag the folder to app.netlify.com/drop) or GitHub Pages,
though the `vercel.json` headers are Vercel-specific.

## Local preview

Any static server works. Fastest:
```bash
cd portfolio
python -m http.server 8000
# open http://localhost:8000
```

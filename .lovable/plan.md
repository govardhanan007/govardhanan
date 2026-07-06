
# Govardhanan P — Portfolio (Static Build)

## Deployment shape (important — please read)

This Lovable project is a React (TanStack Start) shell. You asked for raw `index.html` / `styles.css` / `script.js` that deploys anywhere. To satisfy both the live preview here **and** a truly framework-free deployable, I will produce **two synchronized copies of the same site**:

1. **Raw static source** (this is what you deploy to Cloudflare Pages / Netlify / GitHub Pages / govardhanan.com):
   - `public/index.html`
   - `public/styles.css`
   - `public/script.js`
   - `public/assets/photo.jpg` (your uploaded photo)
   - `public/assets/resume.pdf` (your uploaded resume)
   - `public/robots.txt`, `public/sitemap.xml`, `public/favicon.ico`, `public/CNAME`
   - No build step required. Drop the folder on any host.
   - Reachable in the Lovable preview at `/index.html`.
2. **Preview mirror** — the TanStack root route (`/`) is rewritten to render the identical markup so the Lovable preview at `/` shows the same site. Same HTML structure, same CSS file, same JS file (loaded via `<link>`/`<script src>` from `/styles.css` and `/script.js`). No React component logic — just the static markup.

When you move to govardhanan.com, deploy the contents of `public/` as the site root. The React shell is not needed.

## What I need from you before I can finish

- **Professional photo** (JPG/PNG, ideally ≥ 1200px on the short side) → will be saved as `public/assets/photo.jpg` and used in Hero, About, Resume card, and `og:image`.
- **Resume PDF** → saved as `public/assets/resume.pdf`, wired to every Download Resume button.
- **Confirmed email address** (you said "customized mail" — please paste the exact address; I'll use it for `mailto:` and the contact card).

Until those arrive I will not fabricate anything. I'll leave the photo/resume/email fields empty in code with a clear TODO and disable the affected buttons rather than shipping placeholders.

## Sections (in order)

Sticky header nav with in-page anchor links: Home · About · Education · Skills · Projects · Certifications · Career Vision · Resume · Gallery · Connect. Includes a light/dark toggle (default: light, persisted in `localStorage`, respects `prefers-color-scheme` only if user hasn't chosen).

1. **Home / Hero** — name, title "MBA General Student | Mechanical Engineer | Future Business Leader", tagline "Leadership • Strategy • Innovation • Growth", subtle CSS typing effect on the tagline (JS, no library), fade-in entrance, animated gradient background (pure CSS). CTAs: Download Resume, View Projects, Connect With Me. Photo on the right.
2. **About** — short intro + attribute chips exactly as you listed (Leadership mindset, Marketing interest, Sales interest, HR management, Business strategy, Communication, Problem solving, Innovation, Ethics, Adaptability, Continuous learning). Photo repeated.
3. **Education** — 4 cards in the exact order: MBA General (2025–2027, pursuing) → B.Tech Mechanical (2022–2025) → Diploma Tool Engineering & Digital Manufacturing, NTTF Vellore (2019–2022) → SSLC (2018–2019). All at Dr. M.G.R. Educational and Research Institute where applicable.
4. **Skills** — animated cards (CSS transitions on hover, no library) for the 11 skills listed.
5. **Projects** — one card: Automatic Electromagnetic Braking System, expandable into sub-sections: Problem statement, Objective, Working principle, Methodology, Tools used, Applications, Results, Future scope. Image slot uses `loading="lazy"`; if you don't provide a project image, slot is hidden.
6. **Certifications** — empty-state card ("Coming soon — added as earned"), no fake entries.
7. **Career Vision** — 6 pillars: business leader, drive innovation, strategic thinking, organizational growth, ethical leadership, customer-centric mindset.
8. **Resume** — profile card with photo, contact info, Download PDF button (disabled with tooltip until resume uploaded).
9. **Gallery** — responsive CSS grid, hover-zoom on `<img>` via `transform: scale`. Empty-state tiles labeled achievements / certificates / events / project images until you provide real images.
10. **Connect** — icon grid (inline SVG for LinkedIn, Instagram, Facebook, X, WhatsApp, Telegram, Email, Phone, Website) with the exact URLs you provided. All external links open in new tab with `rel="noopener noreferrer"`. **No form.**
11. **Footer** — name, nav links, social icons, resume download, contact info, quote "Turning Vision into Value Through Leadership and Innovation.", © 2026 Govardhanan P.

## SEO, sharing, performance, accessibility

- `<head>` on `public/index.html`:
  - `<title>Govardhanan P — MBA General Student & Mechanical Engineer</title>` (≤60 chars)
  - meta description (recruiter-oriented, ≤160 chars)
  - `<link rel="canonical" href="https://govardhanan.com/">`
  - OpenGraph: og:type=profile, og:title, og:description, og:image=`https://govardhanan.com/assets/photo.jpg`, og:url=`https://govardhanan.com/`
  - Twitter: `summary_large_image` card with same image
  - JSON-LD `Person` schema (name, jobTitle, alumniOf, sameAs = your social URLs, email, telephone, url)
  - Theme-color meta, viewport meta, `lang="en"`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>` per section with `aria-labelledby`, `<article>` for cards, `<footer>`.
- Accessibility: single `<h1>`, correct heading order, `aria-label` on all icon-only buttons/links (theme toggle, social icons), visible `:focus-visible` outlines, skip-to-content link, tap targets ≥44×44, `prefers-reduced-motion` disables typing effect + gradient animation, honest color contrast in both themes.
- Performance: no framework, no font CDN unless needed (system font stack: `-apple-system, "Segoe UI", Inter, Roboto, sans-serif`), `loading="lazy"` + `decoding="async"` on non-hero images, hero photo gets `fetchpriority="high"` + `<link rel="preload" as="image">`, CSS/JS single files, no libraries.

## Design system

Premium corporate (Apple / McKinsey / Microsoft feel). CSS custom properties:

```text
--navy: #0A2540      accent + headings in light mode
--navy-deep: #061A30 dark-mode surface
--ink: #0B1220       body text light mode
--paper: #FFFFFF     background light mode
--mist: #F5F7FA      section alt background
--line: #E5E9F0      hairline borders
--accent: #1E5FBF    link/CTA (subtle, not neon)
--gold: #B7935A      subtle premium accent (used sparingly)
```

Dark mode inverts to navy/black surfaces with off-white text. Soft shadows (`0 8px 24px rgba(10,37,64,.08)`), 12px radii, generous 96px section padding on desktop / 56px on mobile, `clamp()` fluid type, subtle gradients only on hero backdrop and CTA hover.

## Files I will create / modify

Create:
- `public/index.html`
- `public/styles.css`
- `public/script.js`
- `public/robots.txt` (allow all, sitemap ref)
- `public/sitemap.xml` (single URL, `https://govardhanan.com/`)
- `public/CNAME` (contents: `govardhanan.com`, for GitHub Pages users)
- `public/assets/.gitkeep` (photo.jpg + resume.pdf added after you upload)

Modify (so the Lovable preview mirrors the same site at `/`):
- `src/routes/__root.tsx` — replace the default `<title>` / description meta with the portfolio's SEO meta; keep the shell.
- `src/routes/index.tsx` — remove the blank-page placeholder; render the exact same markup as `public/index.html`, with the SAME `<link rel="stylesheet" href="/styles.css">` and `<script src="/script.js" defer>` served from `public/`. No duplicated logic, one CSS + one JS file for both.

Leave untouched: routing scaffolding, error boundaries, `src/styles.css` (used by React shell only; the portfolio uses `/styles.css` from public).

## Verification before I say it's done

- Build passes.
- Playwright headless: load `/` and `/index.html`, screenshot desktop (1280×1800) and mobile (390×844), confirm both render identically, all nav anchors scroll to the right section, theme toggle flips and persists, keyboard tab order is sensible, no console errors, no broken links (each social URL returns non-4xx in a HEAD check).
- SEO: view-source shows the required meta + JSON-LD; canonical + og:url point at `https://govardhanan.com/`.

## After you approve

I'll implement the static site with the photo/resume slots empty and buttons disabled, then as soon as you upload the photo + resume + confirm the email I'll drop them into `public/assets/`, enable the buttons, and re-run the verification pass.

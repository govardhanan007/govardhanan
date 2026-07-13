## Goals

1. Resume must be viewable and downloadable by anyone — no login, no signup.
2. Your photo should appear only once on the page (currently it shows in three places: hero, About, and Resume card).

## What's actually happening with the resume

The resume PDF is already public at `/assets/resume.pdf` and the buttons (Download Resume / View Resume) link straight to it. Anyone opening the published site can click and get the file — no auth in the code path.

The reason it *feels* gated is that you're testing on the **preview URL** (`id-preview--…lovable.app`), which requires a Lovable login by design. To make the resume (and the whole site) reachable with zero login:

- Confirm publish visibility is **Public** (Project settings → Publish). If it's Private, only workspace members can view.
- Share the **published URL** (`https://govardhanana.lovable.app`) or your custom domain `govardhanan.com` once it's connected — not the preview URL.

I'll check publish visibility after you approve and flip it to Public if needed (that step needs your approval).

## Photo — reduce to one

Currently `/assets/photo.jpg` is rendered in three places in `public/index.html`:

- Line 112 — Hero portrait (large, top of page)
- Line 125 — About section portrait
- Line 277 — Resume card avatar

Plan: **keep only the Hero portrait** (line 112). Remove the About portrait and the Resume-card avatar, and adjust the two affected sections so the layout still looks right:

- About section becomes a single-column text block (drop `.about-portrait`, tighten `.about-grid` in `styles.css` to one column).
- Resume card drops the small avatar and centers the heading + action buttons.

Meta tags (`og:image`, `twitter:image`, JSON-LD `image`) still reference `photo.jpg` — those are for link previews on WhatsApp / LinkedIn etc., not visible on the page, so they stay.

## Files touched

- `public/index.html` — remove two `<img>` blocks and their wrappers
- `public/styles.css` — collapse `.about-grid` to one column, adjust `.resume-card` spacing

## Verification

- Load the preview, confirm exactly one photo renders on the page.
- Click **Download Resume** and **View Resume** — PDF opens / downloads with no auth prompt on the published site.
- Check publish visibility is Public.

Nothing else changes — resume file, links, and content stay as-is.
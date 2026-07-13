## Scope
Only the Skills section in `public/index.html` (lines 180-200) and matching styles in `public/styles.css`. No changes to hero, about, resume, footer or global tokens.

## Content changes (public/index.html)
- Subtitle: "Capabilities I am building" → **"Core Skills & Professional Competencies"**.
- Intro paragraph: tighten to one line — "A blend of human resources, business, engineering and interpersonal strengths."
- Replace the flat 11-card list with **5 category groups**, each rendered as a subsection with a category heading and its own responsive card grid:
  1. **Human Resources** — Recruitment, Employee Relations, HR Operations
  2. **Business & Management** — Business Management, Operations Management, Project Coordination
  3. **Technical** — CAD, CAM, Tool Engineering, Digital Manufacturing
  4. **Software** — Microsoft Excel, Microsoft PowerPoint, Microsoft Word
  5. **Professional Skills** — Leadership, Communication, Teamwork, Problem Solving, Time Management, Critical Thinking, Adaptability, Continuous Learning
- Each card: inline SVG icon (reuse the site's existing icon style, monochrome stroke) + skill name + one-line description. Existing `.skill-card` class stays; add `.desc` line and a category-specific icon per card.

## Layout & style (public/styles.css)
- Introduce `.skills-groups` (grid, gap 32px) and `.skill-group` (heading + inner grid). Reduces empty space by packing categories tightly instead of one giant 3-col grid with orphan rows.
- Category heading: small, uppercase, `--accent` colored eyebrow-style label with a thin divider line to the right.
- Inner grid: `repeat(auto-fill,minmax(220px,1fr))` — automatically fills 2 cols on mobile-lg, 3 on tablet, 4 on desktop; equal-height cards via `align-items:stretch` and `display:flex;flex-direction:column` on `.skill-card`.
- Card: keep current rounded corners, soft shadow, left accent bar hover animation; add `min-height` for consistency, add `.skill-card .desc` (small muted one-liner, `font-size:.85rem`, `color:var(--text-soft)`).
- Section padding: keep current `clamp(56px,8vw,104px)` but reduce `.section-head` bottom margin from 40px to 28px within Skills only (scoped via `#skills .section-head`).
- Keep `.reveal` scroll-in animation already wired in `script.js`.

## Responsive
- ≥1100px: 4 cards per row inside each group
- 700–1099px: 3 per row
- 480–699px: 2 per row
- <480px: 2 per row for short names, gracefully 1 if content overflows (auto-fill handles it)

## Files touched
- `public/index.html` — replace lines 180-200 block
- `public/styles.css` — extend `.skill-card` rules, add `.skills-groups`, `.skill-group`, `.group-title`

No JS changes needed (existing IntersectionObserver picks up `.reveal`).


# Ship photo + real brand icons + publish

## 1. Your photo (real, no AI edits)

- Copy `user-uploads://IMG_20260507_205917_171.jpg` → `public/assets/photo.jpg` (unchanged file — only browser-side CSS `filter: contrast(1.03) saturate(1.03)` is applied for slight polish, no face replacement, no crop, no AI).
- Automatically populates Hero, About, Resume card, and the `og:image` share preview (already wired to `/assets/photo.jpg`).
- Verify with Playwright screenshots on desktop + mobile.

## 2. Realistic brand icons (Play Store style) with deep links

Replace the current inline monochrome SVGs in the Connect grid and footer with the official full-color brand marks, rendered as inline SVG (no external CDN, no license risk, offline-safe, ~2 KB each). Each icon gets its brand background color on hover for that "app tile" feel — similar to how apps look on the Play Store.

Icons + destinations (all `target="_blank" rel="noopener noreferrer"` except mail/tel):

| App | Icon | Link |
|---|---|---|
| LinkedIn | Blue `in` tile | `https://www.linkedin.com/in/pgovardhanan` |
| Instagram | Pink→orange→purple gradient camera | `https://www.instagram.com/govardhanan1723` |
| Facebook | Blue `f` tile | `https://www.facebook.com/share/17dsqmsyUM/` |
| X (Twitter) | Black X mark | `https://x.com/Govardhanan007` |
| WhatsApp | Green speech bubble | `https://wa.me/918610391303` (opens WhatsApp app on mobile, Web on desktop) |
| Telegram | Blue paper-plane | `https://t.me/govardhanan1723` (opens Telegram app if installed) |
| Gmail | Multicolor M | `mailto:govardhanan1723@govardhanan.com` |
| Phone | Green handset | `tel:+917401097583` |
| Website | Navy globe | `https://govardhanan.com` |

Card treatment: rounded square (Play Store app-icon vibe), subtle drop shadow, hover raises + tints the border in the brand color, label under the icon (unchanged).

Same upgraded icons in the footer social row.

## 3. Confirm before I publish

- **Email**: your last answer was "customized mail" — the site currently shows `govardhanan1723@govardhanan.com`. I'll keep that unless you paste a different address in your next message.
- **Resume PDF**: still not uploaded. I'll leave the Download Resume buttons disabled with a "Resume coming soon" tooltip; upload the PDF whenever ready and I'll drop it in — no code change needed on your side, the buttons auto-enable.

## 4. Publish to Lovable, then connect govardhanan.com

- Run a security scan, then publish the site. This gives you a live `*.lovable.app` URL in ~1 minute.
- **Custom domain**: I can't set DNS for you. After publishing, open **Project Settings → Domains → Connect Domain**, enter `govardhanan.com`, and add both records at your registrar:
  - `A  @    → 185.158.133.1`
  - `A  www  → 185.158.133.1`
  - `TXT _lovable → <value shown in the dialog>`
  - If your domain is on Cloudflare, tick the "Domain uses Cloudflare or a similar proxy" box in the dialog (switches to CNAME verification).
  Lovable auto-provisions SSL; propagation up to 72h (usually minutes).
- Once the domain is Active, `https://govardhanan.com/` serves the same site.

## Files touched

- `public/assets/photo.jpg` (new — your real photo)
- `public/index.html` (Connect section + footer social markup swapped for branded SVGs; matching classes)
- `public/styles.css` (new `.connect-tile[data-brand="…"]` hover colors, footer social hover)
- `src/routes/index.tsx` re-fetches `/index.html`, so the preview mirrors automatically — no code change there.

## Verification

Playwright headless: load `/index.html` at 1280×1800 and 390×844, screenshot Hero + Connect grid, confirm photo renders and each brand tile shows the correct colored mark. HEAD-check every social URL for non-4xx.

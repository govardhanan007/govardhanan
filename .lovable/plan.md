
# Add your resume to the site

You uploaded `P_Govardhanan_HR_Fresher_Starter_Resume-1.docx`. The site's Download Resume buttons are already wired to `/assets/resume.pdf` and auto-enable when that file exists.

## Steps

1. Convert the DOCX to a PDF with LibreOffice (headless), preserving fonts and layout.
2. Save it as `public/assets/resume.pdf` (also keep `public/assets/resume.docx` as an editable copy, in case you want to update it later).
3. QA: render page 1 as an image and inspect for clipping, missing fonts, or broken layout. Re-run if needed.
4. Reload the preview and confirm all three "Download Resume" buttons (hero, resume card, footer) become enabled and download the PDF.

## No other changes

- No content edits — the PDF ships exactly as you wrote it.
- No new markup or styles needed; `script.js` already flips the buttons live once the PDF is reachable.

## After this

The next time you want to update the resume, just upload a new DOCX (or PDF directly) and I'll drop it in — no other changes needed.

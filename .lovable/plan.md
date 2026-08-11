# Replace the resume with the newly uploaded version

Your site currently serves an older resume file. The new upload becomes the single, exact resume used for both viewing and downloading — no edits to its content, wording, or layout.

## What changes

1. Replace `public/assets/resume.docx` with the newly uploaded `hr_resume_govardhanan.docx`.
2. Convert that exact file to `public/assets/resume.pdf` using headless LibreOffice (faithful conversion, no content changes).
3. Keep all existing buttons and URLs unchanged — "Download resume" and "View resume" in the hero, the resume card, and the footer all continue to point at `/assets/resume.pdf`, open without any login, and the view link keeps `target="_blank"` + `rel="noopener noreferrer"`.

## Verification

- Render every page of the new PDF to images and inspect for clipped text, broken fonts, or layout issues; re-convert if anything looks wrong.
- Confirm the PDF text matches the uploaded document exactly (headings, certifications list, skills, projects, languages, strengths).
- Load the live preview and confirm both resume buttons are enabled and resolve to the new PDF with no 404.

## Notes

- No section content on the site is rewritten in this change; only the resume file itself is swapped.
- After it's verified, publish so `govardhanan.com` serves the new resume.

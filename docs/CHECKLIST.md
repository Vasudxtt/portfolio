# Personalization Checklist

Use this as your master to-do list. Check off each item as you complete it.

---

## Content (Text)

- [ ] `docs/01-meta.md` → Page title, description, canonical URL, OG tags
- [ ] `docs/02-header.md` → Logo SVG, name, social links, location, email, QR code
- [ ] `docs/03-hero.md` → Name syllables, job title, tagline
- [ ] `docs/04-about.md` → Bio paragraphs, awards list
- [ ] `docs/05-work.md` → Project names, URLs, videos
- [ ] `docs/06-myway.md` → Frame image captions, watermark text
- [ ] `docs/07-cta-footer.md` → CTA phrase, email, footer logo

## Assets (Files)

- [ ] `docs/08-assets.md` → OG image, QR code, favicons, frame images, work videos

---

## Files to edit (in order)

1. `src/pages/index.astro` — meta tags in `<head>`
2. `src/components/SiteHead.astro` — logo, nav, socials, availability, QR
3. `src/components/SHero.astro` — name, title, tagline
4. `src/components/SAbout.astro` — bio text, awards data
5. `src/components/SWork.astro` — project info object, video files
6. `src/components/SMyWay.astro` — frame captions, watermark text
7. `src/components/SCTA.astro` — CTA lines, email
8. `src/components/SiteFoot.astro` — footer logo, name
9. `public/icons/site.webmanifest` — app name, colors
10. `public/icons/` — all favicon files (replace image files)
11. `public/images/aw-creative-developer.png` — OG social image
12. `public/images/qr-code.svg` — regenerated QR code
13. `src/assets/frames/` — all 14 frame photos
14. `src/assets/works/` — all work videos

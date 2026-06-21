# Personalization Guide — Visual Portfolio

This folder documents everything that needs to change to make this portfolio
yours. Work through the files in order.

---

## Quick orientation

```
docs/
  OVERVIEW.md       ← You are here — start here
  CHECKLIST.md      ← Master to-do list
  01-meta.md        ← Page title, description, SEO, Open Graph
  02-header.md      ← Logo, name, social links, location, email, QR code
  03-hero.md        ← Name animation, job title, tagline
  04-about.md       ← Bio text (5 paragraphs), awards/skills grid
  05-work.md        ← Projects list, video files
  06-myway.md       ← Gallery frame images, watermark text
  07-cta-footer.md  ← Contact CTA phrase, email, footer logo
  08-assets.md      ← All image/video files to replace
```

---

## What this portfolio contains (structure)

```
HEADER
  Logo (SVG monogram)
  Navigation: About / Work / Contact
  Social links (CodePen, LinkedIn)
  Availability text + email link
  QR code (links to your email)

HERO
  Your name (scrolling ticker, split into syllables)
  Your title ("Creative Developer" — two big words)
  Your tagline ("Do Things Your Way" — four words)

ABOUT
  Bio text (5 paragraphs about you)
  Awards / achievements grid (counters + text tiles)

WORK
  Scroll-driven video gallery
  Each card = one project video clip + title + link

MY WAY (gallery)
  14 photo frames flying in 3D space
  Large watermark text at the bottom

CTA (contact)
  Hover-reveal circle
  Two-line animated phrase ("Let's Rock")
  Your email address

FOOTER
  Logo (same SVG as header)
```

---

## Recommended order of work

### Phase 1 — Fill in the docs (planning)
Go through each doc file and fill in every blank (`___`) with your content.
Do this before touching any code.

### Phase 2 — Text content (code changes, no files)
1. `src/pages/index.astro` → meta tags (use `01-meta.md`)
2. `src/components/SiteHead.astro` → logo, links, text (use `02-header.md`)
3. `src/components/SHero.astro` → name, title, tagline (use `03-hero.md`)
4. `src/components/SAbout.astro` → bio, awards (use `04-about.md`)
5. `src/components/SWork.astro` → project info object (use `05-work.md`)
6. `src/components/SMyWay.astro` → frame captions, watermark (use `06-myway.md`)
7. `src/components/SCTA.astro` → CTA phrase, email (use `07-cta-footer.md`)
8. `src/components/SiteFoot.astro` → logo, name (use `07-cta-footer.md`)
9. `public/icons/site.webmanifest` → app name, colors

### Phase 3 — Asset files (file replacement)
10. Design and export your logo SVG
11. Generate favicon set using realfavicongenerator.net
12. Create OG image (1200×675) in Figma or Canva
13. Generate new QR code
14. Gather and compress 14 personal photos for frames
15. Screen-record your projects and compress videos
16. Replace all files (see `08-assets.md`)

### Phase 4 — Review
17. Run `bun dev` and check every section
18. Test on mobile (Chrome DevTools or real device)
19. Test the contrast toggle (top-right button)
20. Verify all links work (social, project URLs, email)
21. Check page title and description in browser tab and source

---

## Running the site locally

```bash
bun install
bun dev
```

Open `http://localhost:4321` in your browser.

---

## Searching for all Antoine references

If you want to find every place Antoine's name or links appear:

```bash
# Search for email
grep -r "wodniack" src/ public/

# Search for name
grep -r "Antoine" src/ public/

# Search for his domain
grep -r "wodniack.dev" src/ public/

# Search for his social handles
grep -r "codepen.io/wodniack" src/ public/
grep -r "linkedin.com/in/wodniack" src/ public/
```

---

## License reminder

This project is licensed under **CC BY-NC 4.0** (see `LICENSE.md`).

You are free to:
- Use it for your own personal portfolio
- Adapt and modify it

You must:
- Give credit to the original creator (Antoine Wodniack)
- **Not** use it commercially or sell it

The license requires significant modification — do not deploy it as-is with
only name/email swapped. Make it genuinely yours.

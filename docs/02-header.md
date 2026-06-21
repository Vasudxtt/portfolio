# 02 — Header / Navigation

**File:** `src/components/SiteHead.astro`

---

## 2.1 — Logo SVG (the "AW" monogram)

**Current location:** lines 22–38
**Current value:** An SVG that draws the letters A and W as a custom lettermark.

You have three options:

### Option A — Design your own lettermark SVG
Replace the two `<path>` elements inside the `<svg viewBox="0 0 280 280">` with
paths that form your own initials or logo. Keep the `fill="#160000"` attribute
so it respects the theme color system.

```html
<!-- REPLACE THIS BLOCK in SiteHead.astro lines 22-38 -->
<svg
  class="js-logo"
  width="280"
  height="280"
  viewBox="0 0 280 280"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Paste your own SVG path(s) here, fill="#160000" -->
  <path d="YOUR_PATH_DATA" fill="#160000"></path>
</svg>
```

Tools to generate a lettermark SVG:
- **Figma** — type your initials in a font, outline, export as SVG, copy the path
- **Inkscape** — free, Object → Object to Path, save as plain SVG
- **Adobe Illustrator** — Type → Create Outlines, export SVG

### Option B — Use a simple text-based SVG (quick)
```html
<svg
  class="js-logo"
  width="280"
  height="280"
  viewBox="0 0 280 280"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <text
    x="50%"
    y="55%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="sans-serif"
    font-weight="700"
    font-size="140"
    fill="#160000"
  >YOUR_INITIALS</text>
</svg>
```

### Option C — Keep the AW logo temporarily
If you just want to test the site, skip this step and come back to it.

---

## 2.2 — Screen-reader name (inside the logo link)

**Current location:** line 39
**Current text:**
```
Antoine Wodniack
```

**Replace with:**
```
YOUR_FULL_NAME
```

Example: `Jane Doe`

---

## 2.3 — Social links

**Current location:** lines 62–90

### CodePen
```html
<!-- Line 64 — change href -->
<a href="https://codepen.io/YOUR_CODEPEN_USERNAME" target="_blank" rel="noopener">
  <span class="sb__icon sb__icon--codepen" ...></span>
  <span class="u-sr-only">Follow me on CodePen</span>
</a>
```

Your CodePen username: `___________________________`

If you do not have CodePen, remove the entire `<li>` block (lines 63–73).

### LinkedIn
```html
<!-- Line 77 — change href -->
<a href="https://www.linkedin.com/in/YOUR_LINKEDIN_HANDLE/" target="_blank" rel="noopener">
  <span class="sb__icon sb__icon--linkedin" ...></span>
  <span class="u-sr-only">Follow me on LinkedIn</span>
</a>
```

Your LinkedIn handle: `___________________________`

### Adding more social icons (optional)
To add GitHub, Twitter/X, Dribbble, etc., copy one `<li>` block, paste it,
change the `href` and the SVG icon path. Use simpleicons.org to get SVG paths.

---

## 2.4 — Availability text

**Current location:** lines 103–113
**Current text (two lines):**
```
Coding globally from France.
Available for freelance work →   [Hire me]
```

**Replace with your own two lines:**

Line 1 — where you work from:
```
YOUR_LOCATION_LINE
```
Examples:
- `Based in Seoul, South Korea.`
- `Remote-first, anywhere.`
- `Working from Tokyo.`

Line 2 — your current status:
```
YOUR_STATUS_LINE
```
Examples:
- `Available for freelance work →`
- `Open to full-time roles →`
- `Not available right now.`

**Full replacement block:**
```html
<p>
  <span class="sb__line">
    <span class="sb__text">YOUR_LOCATION_LINE</span>
  </span>

  <span class="sb__line">
    <span class="sb__text">YOUR_STATUS_LINE</span>

    <a href="mailto:YOUR_EMAIL" class="sb__link">Hire me</a>
  </span>
</p>
```

---

## 2.5 — Email addresses (two places in this file)

**Line 111** — inside the availability text:
```html
<a href="mailto:YOUR_EMAIL" class="sb__link">Hire me</a>
```

**Line 117** — the QR code link:
```html
<a
  href="mailto:YOUR_EMAIL"
  class="sb-qr-code js-qr-code"
  title="Contact me!"
>
```

Your email: `___________________________`

---

## 2.6 — QR Code image

**Current location:** line 121
```html
<img src="/images/qr-code.svg" alt="QR Code" width="72" height="72" />
```

The file `public/images/qr-code.svg` currently encodes Antoine's email address.
You must regenerate it with your own email (or your website URL).

**How to generate:**
1. Go to https://qr.io or https://www.qr-code-generator.com
2. Enter `mailto:YOUR_EMAIL` or `https://YOUR_DOMAIN`
3. Download as SVG
4. Replace `public/images/qr-code.svg` with your file

---

## 2.7 — Console messages (optional)

**Current location:** lines 160–227
The `messages` array contains ~65 humorous loading/status messages that
type-write across the header console area. These are fun personality text.

You can:
- Keep them as-is (they are generic enough)
- Add your own jokes/messages to the array
- Remove the ones you dislike

No changes are required here — they do not reference Antoine personally.

---

## Full header values to fill in

```
YOUR_FULL_NAME        = ___________________________
YOUR_INITIALS         = ___________________________  (for logo option B)
YOUR_CODEPEN_USERNAME = ___________________________  (or DELETE the link)
YOUR_LINKEDIN_HANDLE  = ___________________________
YOUR_LOCATION_LINE    = ___________________________
YOUR_STATUS_LINE      = ___________________________
YOUR_EMAIL            = ___________________________
```

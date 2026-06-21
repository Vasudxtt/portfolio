# 07 — CTA Section & Footer

---

## 7.1 — CTA Section (Contact)

**File:** `src/components/SCTA.astro`

The CTA (Call to Action) section is the final section before the footer.
It features a large animated circle that reveals when hovered, showing a
two-line phrase and your email address.

---

### CTA phrase — the big animated text

**Current location:** lines 2–5 (the `lines` array in the frontmatter)
**Current value:**
```js
const lines = [
  ['L', 'e', 't<span class="sup">\'</span>', 's'],  // "Let's"
  ['R', 'o', 'c', 'k'],                             // "Rock"
]
// Renders: "LET'S ROCK"
```

This is the phrase that appears inside the hover circle. It is split into
**two lines**, each line broken into **individual characters** as array items.
Special characters use `<span>` tags (see the apostrophe example above).

**Rules:**
- Exactly **two lines** (two inner arrays)
- Each character is one array item (as a string)
- The `<span class="sup">` wrapper is needed for the apostrophe to size correctly
- All-caps is applied by CSS
- **4 characters per line** works perfectly; 3–5 is acceptable
- Longer lines will shrink the font size

---

### Your CTA phrase options

| Phrase | Array |
|---|---|
| `LET'S TALK` | `[['L','e','t<span class="sup">\'</span>','s'], ['T','a','l','k']]` |
| `HIRE ME` | `[['H','i','r','e'], ['M','e']]` |
| `GET IN TOUCH` | `[['G','e','t'], ['I','n']]` (too long for 4-char — see note below) |
| `SAY HI` | `[['S','a','y'], ['H','i']]` |
| `PING ME` | `[['P','i','n','g'], ['M','e']]` |
| `WORK?` | `[['W','o','r','k<span class="sup">?</span>']]` (single line — needs CSS edit) |
| `LET'S GO` | `[['L','e','t<span class="sup">\'</span>','s'], ['G','o']]` |
| `CONTACT` | `[['C','o','n'], ['t','a','c','t']]` |

**Your chosen phrase:**
```
Line 1: ___________________________   →  4 chars: ['_', '_', '_', '_']
Line 2: ___________________________   →  4 chars: ['_', '_', '_', '_']
```

---

### Full `lines` array replacement

```js
// In SCTA.astro frontmatter (top of file), replace:
const lines = [
  ['LINE_1_CHAR_1', 'LINE_1_CHAR_2', 'LINE_1_CHAR_3', 'LINE_1_CHAR_4'],
  ['LINE_2_CHAR_1', 'LINE_2_CHAR_2', 'LINE_2_CHAR_3', 'LINE_2_CHAR_4'],
]

// Example for "LET'S TALK":
const lines = [
  ['L', 'e', 't<span class="sup">\'</span>', 's'],
  ['T', 'a', 'l', 'k'],
]
```

---

### Email address in CTA

**Current location:** line 40
**Current value:**
```html
<a href="mailto:hello@wodniack.dev" class="s__cta__link">
  hello@wodniack.dev
</a>
```

**Replace with:**
```html
<a href="mailto:YOUR_EMAIL" class="s__cta__link">
  YOUR_EMAIL
</a>
```

Your email: `___________________________`

---

## 7.2 — Footer

**File:** `src/components/SiteFoot.astro`

The footer is minimal — it only contains the logo SVG and a screen-reader
accessible name. It mirrors the header logo exactly.

---

### Footer logo SVG

**Current location:** lines 4–18

The footer uses the exact same "AW" lettermark SVG as the header.
Replace it with the same logo SVG you created for the header (`docs/02-header.md`).

```html
<!-- Replace the two <path> elements inside the SVG: -->
<svg
  width="280"
  height="280"
  viewBox="0 0 280 280"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Paste your logo path(s) here -->
  <path d="YOUR_PATH_DATA" fill="#160000"></path>
</svg>
```

---

### Footer screen-reader name

**Current location:** line 20
**Current value:**
```html
<span class="u-sr-only">Antoine Wodniack</span>
```

**Replace with:**
```html
<span class="u-sr-only">YOUR_FULL_NAME</span>
```

---

## 7.3 — All values to fill in

```
CTA_LINE_1      = ___________________________
CTA_LINE_2      = ___________________________
YOUR_EMAIL      = ___________________________
YOUR_FULL_NAME  = ___________________________  (footer screen-reader text)
```

---

## 7.4 — Quick copy-paste for SCTA.astro

```astro
---
const lines = [
  ['L', 'e', 't<span class="sup">\'</span>', 's'],
  ['T', 'a', 'l', 'k'],
]
---

<!-- line 40 -->
<a href="mailto:YOUR_EMAIL" class="s__cta__link">
  YOUR_EMAIL
</a>
```

## 7.5 — Quick copy-paste for SiteFoot.astro

```astro
<footer class="site-foot">
  <div class="site-foot__logo">
    <a href="/">
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- YOUR LOGO PATHS HERE -->
      </svg>

      <span class="u-sr-only">YOUR_FULL_NAME</span>
    </a>
  </div>
</footer>
```

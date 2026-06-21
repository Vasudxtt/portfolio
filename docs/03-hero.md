# 03 — Hero Section

**File:** `src/components/SHero.astro` (lines 1–34)

The hero is the very first thing visitors see — full-screen, with animated
text. It has three text elements: your **name** (split into syllables for the
scrolling animation), your **job title** (two big words), and a **tagline**
(four short words).

---

## 3.1 — Your name (top separator)

**Current location:** line 12
**Current value:**
```js
strings={['Ant', 'oi', 'ne', 'Wo', 'dn', 'ia', 'ck']}
// Renders: Antoine Wodniack
```

Split your name into syllables or natural breaks. Each string in the array
becomes one segment of the scrolling ticker. More segments = longer ticker.
The total string `joined` must spell your full name exactly as you want it shown.

**How to split examples:**

| Name | Split |
|---|---|
| `Jane Doe` | `['Ja', 'ne', 'Do', 'e']` |
| `Carlos Mendes` | `['Car', 'los', 'Men', 'des']` |
| `Yuki Tanaka` | `['Yu', 'ki', 'Ta', 'na', 'ka']` |
| `Min-Jun Lee` | `['Min', '-', 'Jun', 'Le', 'e']` |

**Your name split:**
```js
strings={['YOUR', 'NA', 'ME', 'HE', 'RE']}
//        ↑ adjust these segments to spell your name
```

Write your name and split below:
```
Full name:  ___________________________
Split:      ['___', '___', '___', '___', '___']
```

---

## 3.2 — Job title (the big H1 words)

**Current location:** lines 15–25
**Current value:**
```html
<span class="s__title__word js-word">Creative</span>
<!-- star icon in between -->
<span class="s__title__word js-word">Developer</span>
```

These two words are rendered in the huge display font. They animate with a
glitch/dissolve effect when the page loads. Keep it to **two short words** for
the best visual result. Longer words will make the font smaller (it auto-scales).

**Guidelines:**
- Maximum ~10 characters per word for the best layout
- All-caps is applied automatically by CSS (`text-transform: uppercase`)
- Avoid punctuation — it will look odd at that size

**Common combinations:**

| Word 1 | Word 2 | Result |
|---|---|---|
| `Creative` | `Developer` | CREATIVE ★ DEVELOPER |
| `Frontend` | `Engineer` | FRONTEND ★ ENGINEER |
| `UI/UX` | `Designer` | UI/UX ★ DESIGNER |
| `Full` | `Stack` | FULL ★ STACK |
| `Motion` | `Designer` | MOTION ★ DESIGNER |
| `Web` | `Builder` | WEB ★ BUILDER |

**Your choice:**
```
Word 1: ___________________________
Word 2: ___________________________
```

**Replacement code:**
```html
<h1 class="s__title">
  <span class="s__title__word js-word">WORD_ONE</span>
  <img
    class="s__title__asset js-star"
    src="/images/asset-star.svg"
    alt=""
    width="48"
    height="48"
  />
  <span class="s__title__word js-word">WORD_TWO</span>
</h1>
```

---

## 3.3 — Tagline (bottom separator)

**Current location:** line 27–30
**Current value:**
```js
strings={['Do', 'Things', 'Your', 'Way']}
// Renders: Do Things Your Way
```

This is a short 3–4 word phrase that scrolls below the title. It should be
a **personal motto, philosophy, or descriptor**. Keep each array element to
1–2 words.

**Examples:**

| Tagline | Array |
|---|---|
| `Build With Purpose` | `['Build', 'With', 'Purpose']` |
| `Code Meets Design` | `['Code', 'Meets', 'Design']` |
| `Always Be Shipping` | `['Always', 'Be', 'Shipping']` |
| `Think Big Move Fast` | `['Think', 'Big', 'Move', 'Fast']` |
| `Pixel Perfect Always` | `['Pixel', 'Perfect', 'Always']` |
| `Make It Beautiful` | `['Make', 'It', 'Beautiful']` |
| `Less But Better` | `['Less', 'But', 'Better']` |

**Your tagline:**
```
Tagline: ___________________________
Array:   ['___', '___', '___', '___']
```

---

## Full hero replacement block

```astro
<ASeparator
  class="s__separator js-separator"
  strings={YOUR_NAME_ARRAY}
/>

<h1 class="s__title">
  <span class="s__title__word js-word">WORD_ONE</span>
  <img
    class="s__title__asset js-star"
    src="/images/asset-star.svg"
    alt=""
    width="48"
    height="48"
  />
  <span class="s__title__word js-word">WORD_TWO</span>
</h1>

<ASeparator
  class="s__separator js-separator"
  strings={YOUR_TAGLINE_ARRAY}
/>
```

---

## Values to fill in

```
YOUR_NAME_ARRAY    = ['___', '___', '___', '___']
WORD_ONE           = ___________________________
WORD_TWO           = ___________________________
YOUR_TAGLINE_ARRAY = ['___', '___', '___', '___']
```

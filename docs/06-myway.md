# 06 — "My Way" Gallery Section

**File:** `src/components/SMyWay.astro`

This section is an interactive 3D gallery where photos and star shapes fly
towards the viewer. It is the most personal section of the portfolio — it
tells your visual story through photos of your life, work, and personality.

There are two things to change:
1. **The 14 frame images** and their captions
2. **The large watermark text** ("Remember not to steal this")

---

## 6.1 — Frame images (14 photos)

**Current location:** lines 4–61 (the `frames` array in the frontmatter)

**Current image files** (in `src/assets/frames/`):
```
art-1987.jpg         art-dtyw.jpg         art-lines.jpg
first-fwa.jpg        roar.jpg
setup-2006.jpg       setup-2016.jpg       setup-2020.jpg
waaark.png
portfolio-2011.jpg   portfolio-2014.jpg   portfolio-2017.jpg   portfolio-2021.jpg
legos.jpg
```

### What to photograph / screenshot for your frames

The images should tell **who you are** — a mix of professional work and
personal moments. Below are Antoine's current captions with suggestions for
what you can use instead.

---

| # | Current file | Current caption | Your replacement photo |
|---|---|---|---|
| 1 | `art-1987.jpg` | `Generative art poster concept` | A creative side project, generative art, or experimental work |
| 2 | `art-dtyw.jpg` | `Generative art poster concept` | Another creative project or design experiment |
| 3 | `art-lines.jpg` | `Generative art poster concept` | Another piece of personal creative work |
| 4 | `first-fwa.jpg` | `My first FOTD on FWA ♥ (2012)` | Your first big milestone — first client, first job, first award |
| 5 | `roar.jpg` | `Roaaaar!` | A fun personal photo — pet, hobby, travel, or a goofy shot |
| 6 | `setup-2006.jpg` | `Early age (2006) desk setup` | Your earliest desk/workspace photo or a childhood photo |
| 7 | `setup-2016.jpg` | `2016 desk setup` | A mid-career workspace photo |
| 8 | `setup-2020.jpg` | `2020 desk setup` | Your current or most recent desk setup |
| 9 | `waaark.png` | `Waaark Creative Robots` | Your team, studio, or agency photo |
| 10 | `portfolio-2011.jpg` | `2011 portfolio` | Screenshot of an old version of your portfolio |
| 11 | `portfolio-2014.jpg` | `2014 portfolio` | Screenshot of another old portfolio version |
| 12 | `portfolio-2017.jpg` | `2017 portfolio (never released)` | A scrapped project or unreleased concept |
| 13 | `portfolio-2021.jpg` | `2021 portfolio` | A recent portfolio or project screenshot |
| 14 | `legos.jpg` | `Legos ♥` | A hobby, collection, or something you love |

---

### Photo specs

- **Format:** JPG or PNG (JPG preferred for photos)
- **Size:** Aim for ~800–1200px wide — the frames are 500px wide on desktop
- **Ratio:** Any ratio works — the image fills the frame proportionally
- **Orientation:** Landscape or portrait both work fine
- **Compression:** Compress before adding to keep repo size small
  - Use https://squoosh.app or `imageoptim` on Mac
  - Target < 200KB per image

---

### Your 14 frames (fill in)

```
Frame 1:
  File name:    ___________________________  (replace art-1987.jpg)
  Caption:      ___________________________

Frame 2:
  File name:    ___________________________  (replace art-dtyw.jpg)
  Caption:      ___________________________

Frame 3:
  File name:    ___________________________  (replace art-lines.jpg)
  Caption:      ___________________________

Frame 4:
  File name:    ___________________________  (replace first-fwa.jpg)
  Caption:      ___________________________

Frame 5:
  File name:    ___________________________  (replace roar.jpg)
  Caption:      ___________________________

Frame 6:
  File name:    ___________________________  (replace setup-2006.jpg)
  Caption:      ___________________________

Frame 7:
  File name:    ___________________________  (replace setup-2016.jpg)
  Caption:      ___________________________

Frame 8:
  File name:    ___________________________  (replace setup-2020.jpg)
  Caption:      ___________________________

Frame 9:
  File name:    ___________________________  (replace waaark.png)
  Caption:      ___________________________

Frame 10:
  File name:    ___________________________  (replace portfolio-2011.jpg)
  Caption:      ___________________________

Frame 11:
  File name:    ___________________________  (replace portfolio-2014.jpg)
  Caption:      ___________________________

Frame 12:
  File name:    ___________________________  (replace portfolio-2017.jpg)
  Caption:      ___________________________

Frame 13:
  File name:    ___________________________  (replace portfolio-2021.jpg)
  Caption:      ___________________________

Frame 14:
  File name:    ___________________________  (replace legos.jpg)
  Caption:      ___________________________
```

---

### Full `frames` array replacement

```js
const frames = [
  {
    caption: 'FRAME_1_CAPTION',
    src: import('/src/assets/frames/FRAME_1_FILENAME'),
  },
  {
    caption: 'FRAME_2_CAPTION',
    src: import('/src/assets/frames/FRAME_2_FILENAME'),
  },
  {
    caption: 'FRAME_3_CAPTION',
    src: import('/src/assets/frames/FRAME_3_FILENAME'),
  },
  {
    caption: 'FRAME_4_CAPTION',
    src: import('/src/assets/frames/FRAME_4_FILENAME'),
  },
  {
    caption: 'FRAME_5_CAPTION',
    src: import('/src/assets/frames/FRAME_5_FILENAME'),
  },
  {
    caption: 'FRAME_6_CAPTION',
    src: import('/src/assets/frames/FRAME_6_FILENAME'),
  },
  {
    caption: 'FRAME_7_CAPTION',
    src: import('/src/assets/frames/FRAME_7_FILENAME'),
  },
  {
    caption: 'FRAME_8_CAPTION',
    src: import('/src/assets/frames/FRAME_8_FILENAME'),
  },
  {
    caption: 'FRAME_9_CAPTION',
    src: import('/src/assets/frames/FRAME_9_FILENAME'),
  },
  {
    caption: 'FRAME_10_CAPTION',
    src: import('/src/assets/frames/FRAME_10_FILENAME'),
  },
  {
    caption: 'FRAME_11_CAPTION',
    src: import('/src/assets/frames/FRAME_11_FILENAME'),
  },
  {
    caption: 'FRAME_12_CAPTION',
    src: import('/src/assets/frames/FRAME_12_FILENAME'),
  },
  {
    caption: 'FRAME_13_CAPTION',
    src: import('/src/assets/frames/FRAME_13_FILENAME'),
  },
  {
    caption: 'FRAME_14_CAPTION',
    src: import('/src/assets/frames/FRAME_14_FILENAME'),
  },
]
```

---

## 6.2 — Watermark text ("Remember not to steal this")

**Current location:** lines 121–138
**Current text (shown twice — distorted and normal layers):**
```
Remember
not to
steal
this
```

This text is displayed in a massive perspective-distorted font at the bottom
of the section. It is a bold, artistic statement. Replace it with **your own
name, slogan, or phrase**.

### Rules for the text
- **4 lines works best** — each `<br />` creates a new line
- **Short words per line** — the font is huge, long words overflow
- **All-caps is applied by CSS** — type in any case
- **Avoid punctuation** in the middle of lines — it looks odd at scale

### Options

**Option A — Your name:**
```
YOUR
FIRST
NAME
HERE
```

**Option B — Your tagline (same as hero):**
```
BUILD
WITH
PUR
POSE
```

**Option C — A motivational phrase:**
```
MAKE
IT
YOUR
OWN
```

**Option D — Your website domain:**
```
YOUR
DOMAIN
.DEV
```

---

### Your watermark text (fill in):

```
Line 1: ___________________________
Line 2: ___________________________
Line 3: ___________________________
Line 4: ___________________________
```

---

### Full replacement block (update in TWO places — lines 119–138)

The same text block appears twice (once in `.s__catcher__text--distorted` and
once in `.s__catcher__text--normal`). Update both with identical content:

```html
<!-- FIRST instance (lines ~119-126) — inside .s__catcher__text--distorted -->
<div class="s__catcher__text s__catcher__text--distorted">
  LINE_ONE <br />
  LINE_TWO <br />
  LINE_THREE <br />
  LINE_FOUR
</div>

<!-- SECOND instance (lines ~130-137) — inside .s__catcher__text--normal -->
<div class="s__catcher__text s__catcher__text--normal">
  LINE_ONE <br />
  LINE_TWO <br />
  LINE_THREE <br />
  LINE_FOUR
</div>
```

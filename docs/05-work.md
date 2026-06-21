# 05 — Work Section

**File:** `src/components/SWork.astro` (lines 1–129)

The Work section is a scroll-driven gallery that displays your projects as
video cards flying past the screen. Each card shows a looping video clip and
links to the live project.

---

## 5.1 — How the project data works

At the top of `SWork.astro` there is an `info` object that maps a **key** to a
project's **title** and **site URL**. The key must match the filename prefix of
the video file in `src/assets/works/`.

```
File name pattern: KEY-NUMBER.mp4
Example:           Pen-4.mp4  →  key is "Pen"
Example:           Amazon-1.mp4  →  key is "Amazon"
```

One project can have **multiple video clips** — just name them `KEY-1.mp4`,
`KEY-2.mp4`, `KEY-3.mp4`, etc. They will all be grouped under the same project
title and link.

---

## 5.2 — Current `info` object (what to replace)

```js
// CURRENT — Antoine's data (lines 10–55)
const info = {
  Pen: {
    title: 'CodePen',
    site: 'https://codepen.io/wodniack',
  },
  Dummy1: { title: 'Dummy Project 1', site: 'https://wodniack.dev' },
  Dummy2: { title: 'Dummy Project 2', site: 'https://wodniack.dev' },
  // ... up to Dummy10
}
```

---

## 5.3 — Your project list

Fill in each project below. Then update the `info` object in `SWork.astro`
and rename/replace the video files in `src/assets/works/`.

**How many projects?**
The more the better for the scroll animation — aim for at least 6 projects.
Each project should have at least 2–4 video clips for visual variety.

---

### Project list (fill in)

```
Project 1
  Key (used in filename): ___________________________
  Display title:          ___________________________
  Live URL:               ___________________________
  Video files:            KEY-1.mp4, KEY-2.mp4, ...

Project 2
  Key:                    ___________________________
  Title:                  ___________________________
  URL:                    ___________________________
  Video files:            KEY-1.mp4, KEY-2.mp4, ...

Project 3
  Key:                    ___________________________
  Title:                  ___________________________
  URL:                    ___________________________
  Video files:            KEY-1.mp4, KEY-2.mp4, ...

Project 4
  Key:                    ___________________________
  Title:                  ___________________________
  URL:                    ___________________________
  Video files:            KEY-1.mp4, KEY-2.mp4, ...

Project 5
  Key:                    ___________________________
  Title:                  ___________________________
  URL:                    ___________________________
  Video files:            KEY-1.mp4, KEY-2.mp4, ...

Project 6
  Key:                    ___________________________
  Title:                  ___________________________
  URL:                    ___________________________
  Video files:            KEY-1.mp4, KEY-2.mp4, ...

CodePen (optional — shown between projects)
  Key:                    Pen   ← keep as "Pen" or rename
  Title:                  CodePen / YOUR_CODEPEN_LABEL
  URL:                    https://codepen.io/YOUR_USERNAME
  Video files:            Pen-1.mp4, Pen-2.mp4, ... (screen-caps of your pens)
```

---

## 5.4 — Full `info` object replacement

Copy this block and fill in your projects:

```js
const info = {
  // CodePen showcase (optional — remove if you don't use CodePen)
  Pen: {
    title: 'YOUR_CODEPEN_LABEL',
    site: 'https://codepen.io/YOUR_CODEPEN_USERNAME',
  },

  // Your real projects — key must match the video filename prefix
  PROJECT_1_KEY: {
    title: 'YOUR_PROJECT_1_TITLE',
    site: 'https://YOUR_PROJECT_1_URL',
  },
  PROJECT_2_KEY: {
    title: 'YOUR_PROJECT_2_TITLE',
    site: 'https://YOUR_PROJECT_2_URL',
  },
  PROJECT_3_KEY: {
    title: 'YOUR_PROJECT_3_TITLE',
    site: 'https://YOUR_PROJECT_3_URL',
  },
  PROJECT_4_KEY: {
    title: 'YOUR_PROJECT_4_TITLE',
    site: 'https://YOUR_PROJECT_4_URL',
  },
  PROJECT_5_KEY: {
    title: 'YOUR_PROJECT_5_TITLE',
    site: 'https://YOUR_PROJECT_5_URL',
  },
  PROJECT_6_KEY: {
    title: 'YOUR_PROJECT_6_TITLE',
    site: 'https://YOUR_PROJECT_6_URL',
  },
}
```

---

## 5.5 — Video files

**Location:** `src/assets/works/`

**Current files to delete:**
```
Dummy.mp4     ← placeholder dummy video
Pen-4.mp4     ← Antoine's CodePen work
Pen-5.mp4
Pen-6.mp4
Pen-7.mp4
Pen-8.mp4
```

**Your files to add** (one file = one card in the scroll gallery):
```
Pen-1.mp4         (or whatever key you chose for CodePen)
PROJECT_1_KEY-1.mp4
PROJECT_1_KEY-2.mp4
PROJECT_1_KEY-3.mp4
PROJECT_2_KEY-1.mp4
PROJECT_2_KEY-2.mp4
... etc
```

### Recording tips for project videos

- **Screen record** the live site — use QuickTime (Mac), OBS, or Loom
- Aim for **1920×1080** or **1280×720** — the cards are small so high-res is not critical
- Keep clips **5–15 seconds** long — they loop automatically
- Show **interactions**: hover states, animations, scroll effects
- Compress with **HandBrake** or `ffmpeg` before adding to the repo

```bash
# Compress with ffmpeg (keep quality, reduce size)
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow output.mp4

# Or resize to 720p and compress
ffmpeg -i input.mp4 -vf scale=1280:-2 -vcodec libx264 -crf 28 output.mp4
```

---

## 5.6 — Remove dummy project loop

After filling in the `info` object with your real projects, **delete the dummy
project generator block** in `SWork.astro` (lines 87–99):

```js
// DELETE THIS ENTIRE BLOCK:
for (let i = 1; i <= 14; i++) {
  const key = `Dummy${i}`
  const project = info[key]
  if (!project) continue

  for (let j = 0; j < 4; j++) {
    projects.push({
      caption: `${project.title} - Video ${j + 1}`,
      site: project.site,
      src: dummyVideo
    })
  }
}
```

Also remove the `dummyVideo` import on line 3:
```js
// DELETE:
import dummyVideo from '/src/assets/works/Dummy.mp4'
```

---

## 5.7 — Section title

The large "WORK" heading is hardcoded as individual letter spans:
```html
<span class="s__title__letter js-letter">W</span>
<span class="s__title__letter js-letter">O</span>
<span class="s__title__letter js-letter">R</span>
<span class="s__title__letter js-letter">K</span>
```

If you want a different heading (e.g. "PROJECTS", "SELECTED", "PORTFOLIO"),
replace each letter span accordingly.

**Note:** The ghost letter animation is generated from these spans. Shorter
words work better — 4–6 letters is ideal.

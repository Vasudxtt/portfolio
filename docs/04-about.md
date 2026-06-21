# 04 — About Section

**File:** `src/components/SAbout.astro`

The About section has two columns:
- **Left column** — a block of bio text (5 paragraphs)
- **Right column** — an awards grid with counters and labels

---

## 4.1 — Bio Text (5 paragraphs)

**Current location:** lines 30–48

These 5 paragraphs are Antoine's personal story. Replace every word with
your own. Below is the full current text, followed by writing prompts to
help you write your version.

---

### Current paragraph 1
> *Curiosity and the drive to learn are the most valuable skills for any
> creative developer. That hunger to understand how things work, to find
> clever workarounds, and to constantly push boundaries—that's what makes
> this craft so rewarding.*

**Your paragraph 1 — Introduction / Who you are:**
Write 2–4 sentences about what drives you as a developer/designer.
What is your core philosophy? What excites you about this craft?

```
Draft:
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
```

---

### Current paragraph 2
> *Over the years, I've learned more from studying other people's code than
> from any course or tutorial. Digging through Codrops experiments, exploring
> CodePen creations, and analyzing real-world projects—that's how I leveled
> up. And it's still part of my daily routine.*

**Your paragraph 2 — How you learned / your background:**
Where did you come from? How did you grow your skills? Self-taught, boot camp,
university? What resources shaped you?

```
Draft:
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
```

---

### Current paragraph 3
> *This portfolio brought me more recognition than I ever expected. What
> started as a quiet relaunch of my digital presence ended up winning a
> Webby Award. Now it's time to give back.*

**Your paragraph 3 — A milestone or turning point:**
Share a moment in your career that was meaningful — a big project, a client,
an award, a launch that went well, or a pivot that changed your direction.

```
Draft:
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
```

---

### Current paragraph 4
> *I'm open-sourcing this site to share the knowledge behind it. If you're
> a junior developer, I hope it helps you learn faster, build smarter, and
> gain confidence in your own journey.*

**Your paragraph 4 — What you do now / what you offer:**
What do you build? Who do you build it for? What kind of projects do you love?
What can a client or employer expect from you?

```
Draft:
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
```

---

### Current paragraph 5
> *If you're tempted to copy/paste it and make it yours as-is—don't.
> The community will call you out, and you'll doom yourself to eternal
> mediocrity.*

**Your paragraph 5 — Call to connect / closing thought:**
End with something personal — an invitation, a belief, a challenge, or a simple
invitation to get in touch.

```
Draft:
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
```

---

### Full replacement block for the bio

```html
<div class="s__content">
  <p>
    PARAGRAPH_ONE
  </p>

  <p>
    PARAGRAPH_TWO
  </p>

  <p>
    PARAGRAPH_THREE
  </p>

  <p>
    PARAGRAPH_FOUR
  </p>

  <p>
    PARAGRAPH_FIVE
  </p>
</div>
```

---

## 4.2 — Awards Section

**Current location:** lines 6–21 (the frontmatter `awards` object)

The awards grid has two types of tiles:
- **Counter tiles** — large platform name + count (e.g. `Awwwards SOTD x 16`)
- **Text tiles** — a full sentence award name (e.g. `2025 Webby Awards Winner`)

---

### Option A — You have real awards

Replace the values in the `awards` object at the top of `SAbout.astro`:

```js
const awards = {
  counters: {
    // platform_key: ['Label x Count', 'Label x Count']
    awwwards: ['SOTD x YOUR_COUNT'],
    fwa: ['SOTD x YOUR_COUNT'],
    cssda: ['WOTD x YOUR_COUNT'],
  },
  texts: {
    // key: 'Award text shown in the tile'
    award1: 'YOUR_AWARD_TITLE <br/>YOUR_AWARD_SUBTITLE',
    award2: 'YOUR_AWARD_TITLE 2',
  },
}
```

The CSS grid layout is hardcoded with keys like `&--awwwards`, `&--fwa`, etc.
If you rename the keys you must also update the SCSS grid placement rules
(search for `&--awwwards` in `SAbout.astro` and update each `grid-column` /
`grid-row` rule to match your new key names).

---

### Option B — You have no awards yet

Replace the entire awards block with a **skills / technologies** grid instead.
This is a common and professional alternative.

```js
// Replace the awards object at the top of SAbout.astro with:
const skills = {
  counters: {
    // Use your stack — these show as large text tiles
    react: ['TypeScript', 'Next.js'],
    gsap: ['WebGL', 'Three.js'],
    css: ['Sass', 'Tailwind'],
  },
  texts: {
    years: 'YOUR_NUMBER+ years of professional experience',
    projects: 'YOUR_NUMBER+ projects shipped',
    clients: 'YOUR_NUMBER+ happy clients',
  },
}
```

Then update the HTML to use `skills` instead of `awards`, and update the SCSS
grid layout keys to match the new property names.

---

### Option C — Remove awards entirely

Delete the entire `.s__block--awards` div (lines 52–153) and adjust the grid
layout. The `.s__block--about` will then take the full width.

---

### Your awards to fill in

**Counter tiles:**
```
Platform 1 name:    ___________________________
Platform 1 counts:  ['___ x ___', '___ x ___']

Platform 2 name:    ___________________________
Platform 2 counts:  ['___ x ___']

Platform 3 name:    ___________________________
Platform 3 counts:  ['___ x ___']
```

**Text tiles (up to 7):**
```
Award 1: ___________________________
Award 2: ___________________________
Award 3: ___________________________
Award 4: ___________________________
Award 5: ___________________________
Award 6: ___________________________
Award 7: ___________________________
```

---

## Full frontmatter replacement

```js
// At the top of SAbout.astro, replace the awards object:

const awards = {
  counters: {
    PLATFORM_1_KEY: ['LABEL_1 x COUNT', 'LABEL_2 x COUNT'],
    PLATFORM_2_KEY: ['LABEL_1 x COUNT'],
    PLATFORM_3_KEY: ['LABEL_1 x COUNT', 'LABEL_2 x COUNT'],
  },
  texts: {
    award1key: 'AWARD_TEXT_1 <br/>AWARD_SUBTEXT_1',
    award2key: 'AWARD_TEXT_2',
    award3key: 'AWARD_TEXT_3',
    award4key: 'AWARD_TEXT_4',
    award5key: 'AWARD_TEXT_5',
  },
}
```

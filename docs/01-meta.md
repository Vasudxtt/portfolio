# 01 — Page Metadata

**File:** `src/pages/index.astro` (lines 19–59)

---

## What to change and the full replacement code

Replace the entire `<head>` meta block (lines 19–59) with the version below.
Fill in every `YOUR_*` placeholder before saving.

```html
<title>YOUR_NAME 2025 Portfolio</title>

<meta
  name="description"
  content="YOUR_DESCRIPTION" />

<meta name="viewport" content="width=device-width" />
<meta name="generator" content={Astro.generator} />

<!-- Set to "index, follow" when your site is live and ready to be indexed -->
<meta name="robots" content="noindex, nofollow" />
<link rel="canonical" href="YOUR_DOMAIN_URL" />

<link
  rel="icon"
  type="image/png"
  href="/icons/favicon-48x48.png"
  sizes="48x48"
/>
<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
<link rel="shortcut icon" href="/icons/favicon.ico" />
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/icons/apple-touch-icon.png"
/>
<meta name="apple-mobile-web-app-title" content="YOUR_SHORT_NAME Portfolio" />

<meta name="theme-color" content="#160000" />
<meta name="msapplication-navbutton-color" content="#160000" />
<meta name="apple-mobile-web-app-status-bar-style" content="#160000" />

<meta property="og:locale" content="en_GB" />
<meta property="og:type" content="website" />
<meta property="og:title" content="YOUR_NAME 2025 Portfolio" />
<meta property="og:description" content="YOUR_DESCRIPTION" />
<meta property="og:url" content="YOUR_DOMAIN_URL" />
<meta property="og:site_name" content="YOUR_NAME 2025 Portfolio" />
<meta property="og:image" content="YOUR_DOMAIN_URL/images/YOUR_OG_IMAGE.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="675" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="YOUR_DOMAIN_URL/images/YOUR_OG_IMAGE.png" />
```

---

## Placeholder guide

| Placeholder | Example value | Notes |
|---|---|---|
| `YOUR_NAME` | `Jane Doe` | Your full name as you want it displayed |
| `YOUR_SHORT_NAME` | `JD` | Initials or short brand name, shown on iOS home screen |
| `YOUR_DOMAIN_URL` | `https://janedoe.dev` | No trailing slash |
| `YOUR_DESCRIPTION` | See below | 150–160 characters, readable sentence |
| `YOUR_OG_IMAGE.png` | `jane-doe-portfolio.png` | 1200×675px image in `/public/images/` |

---

## Description — write your own (150–160 chars)

The description appears in Google search results and when the page is shared on
social media. Write one clear sentence that tells who you are and what you do.

**Template:**
```
[Your role] based in [City]. I build [what you build] with [stack/tools].
Check out [X years of] work in [speciality].
```

**Example:**
```
Creative developer based in Seoul. I craft interactive web experiences
with WebGL, GSAP, and modern CSS. 7+ years of award-winning work.
```

**Your draft (fill in):**
```
_____________________________________________________________________________
_____________________________________________________________________________
```

---

## Canonical URL

This should be the exact URL where your site lives in production.

```
YOUR_DOMAIN_URL = https://___________________________
```

If you do not have a domain yet, leave the original `noindex, nofollow` robots
tag so search engines skip the site until it is ready.

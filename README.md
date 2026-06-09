# Vasudutt Pareek — Portfolio

A high-performance, single-page developer portfolio with 3D WebGL pitch, animated hero,
project carousel, Batman AI chatbot, and contact form.

## 📁 Folder Structure

```
portfolio/
├── index.html              ← Main HTML entry point
├── assets/
│   ├── css/
│   │   └── styles.css      ← All styles (147KB)
│   ├── js/
│   │   └── main.js         ← All JavaScript (114KB)
│   └── images/             ← Project screenshots
│       ├── proj_roadmap2077.jpg
│       ├── proj_cafefindr.jpg
│       ├── proj_originalityai.jpg
│       ├── proj_pokedex.jpg
│       ├── proj_fieldturf.jpg
│       ├── proj_prepzee.jpg
│       ├── proj_coffee.jpg
│       ├── proj_weather.jpg
│       ├── proj_qr.jpg
│       └── proj_todo.jpg
└── README.md
```

## 🚀 How to Run

Just open `index.html` in any modern browser — no build step, no npm install.

For the contact form to work, EmailJS is already configured with your keys.

## 🔧 Customisation Tips

| What to change | Where |
|---|---|
| Your name / bio | `index.html` — Hero & About sections |
| Project cards | `index.html` — `#projects` section |
| Project images | Replace files in `assets/images/` |
| Tech stack pills | `index.html` — `#pills-row` div |
| Batman AI replies | `assets/js/main.js` — `KB` array |
| Colours | `assets/css/styles.css` — `:root` variables |
| EmailJS keys | `index.html` — bottom script block |

## 📦 Dependencies (CDN — no install needed)

- Three.js r128
- EmailJS Browser SDK v4
- Google Fonts (Bebas Neue, Barlow Condensed, Share Tech Mono)

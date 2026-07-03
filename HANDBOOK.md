# 🧠 Vasudutt's Developer Handbook

> Your personal field guide. Everything in your stack and projects — **what it is, why you used it, the basics, and the questions people will actually ask you.**
> Read a section before an interview. Say it in your own words. Never memorize — *understand*.

---

## 0. How to use this

- Each tech has 4 parts: **What it is** · **Why you used it** · **Must-know basics** · **Likely questions (with answers)**.
- If someone asks something you don't know: *"I haven't gone deep on that yet, but here's how I'd reason about it…"* — honesty + reasoning beats bluffing.
- Your honest level: **~1.2 years**, junior full-stack. You ship real things. That's your strength — talk about **what you built and the decisions you made**, not buzzwords.

### Your 30-second pitch
> "I'm Vasudutt, a full-stack developer from VIT Vellore, currently building live client products at ItXiTPro. I work mainly in the MERN stack — React, Node, Express, MongoDB — plus WordPress and PHP for client sites. I like owning a feature end to end: designing the UI, building the API, wiring the database, and shipping it. Recently I've been building AI-powered tools using LLM APIs."

---

## 1. The mental model (read this first)

A web app has **three layers**:

1. **Frontend (client)** — runs in the browser. HTML (structure) + CSS (style) + JavaScript (behavior). Frameworks: **React**, **Next.js**.
2. **Backend (server)** — runs on a machine somewhere. Takes requests, runs logic, talks to the database, sends responses. **Node.js + Express**, or **PHP**.
3. **Database** — where data lives permanently. **MongoDB** (documents) or **MySQL** (tables).

They talk over **HTTP** using a **REST API** (URLs + methods like GET/POST). JSON is the data format that travels between them.

```
Browser (React)  →  HTTP request  →  Server (Express)  →  Database (MongoDB)
       ↑___________  JSON response  __________________________↓
```

**The MERN request flow (know this cold):**
User clicks → React calls `fetch('/api/users')` → Express route receives it → queries MongoDB with Mongoose → DB returns data → Express sends JSON → React updates state → UI re-renders.

---

## 2. The Starting XI — your core stack

### ① JavaScript
- **What:** The programming language of the web. The only language browsers run natively. Also runs servers via Node.
- **Why you used it:** Everything you build runs on it — frontend logic, backend (Node), interactivity.
- **Must-know basics:**
  - `var` / `let` / `const` — use `const` by default, `let` if it changes, avoid `var` (function-scoped, hoisting bugs).
  - **Data types:** string, number, boolean, null, undefined, object, array, symbol.
  - **Functions:** regular vs **arrow** (`=>`). Arrow functions don't have their own `this`.
  - **Async:** callbacks → **Promises** → **async/await**. The event loop runs one thing at a time but doesn't block on I/O.
  - **Array methods:** `map` (transform), `filter` (keep some), `reduce` (combine), `forEach` (loop).
  - **Spread/rest** `...`, **destructuring** `const {a} = obj`, **template literals** `` `hi ${name}` ``.
  - **Closures:** a function remembers the variables around it even after the outer function returns.
- **Likely questions:**
  - *"== vs ===?"* → `==` compares with type coercion (`1 == '1'` is true), `===` is strict (no coercion). **Always use `===`.**
  - *"What's hoisting?"* → Declarations are moved to the top of their scope. `var` is hoisted (undefined), `let`/`const` are in a "temporal dead zone".
  - *"Sync vs async?"* → Sync runs line by line and blocks. Async (Promises/await) lets slow work (network, files) happen without freezing everything.
  - *"What's `this`?"* → Depends on how a function is called. In an arrow function it's inherited from the surrounding scope.

### ② HTML / CSS
- **What:** HTML = the skeleton/content. CSS = the styling/layout.
- **Why you used it:** Foundation of every page. You hand-coded responsive client sites with it.
- **Must-know basics:**
  - **Semantic HTML:** `<header> <nav> <main> <section> <article> <footer>` — better for SEO + accessibility than `<div>` soup.
  - **Box model:** content → padding → border → margin. `box-sizing: border-box` makes width include padding+border.
  - **Layout:** **Flexbox** (1-D, rows/columns) and **Grid** (2-D). Know `display:flex`, `justify-content`, `align-items`, `gap`.
  - **Position:** static, relative, absolute, fixed, sticky.
  - **Responsive:** media queries `@media (max-width: 768px)`, relative units (`rem`, `%`, `vw`), mobile-first.
  - **Specificity:** inline > id > class > tag. Avoid `!important`.
- **Likely questions:**
  - *"Flexbox vs Grid?"* → Flex for one direction (a nav bar, a row of cards). Grid for two directions (a full page layout).
  - *"What's responsive design?"* → UI that adapts to screen size using fluid units + media queries.
  - *"rem vs px vs em?"* → px = fixed. rem = relative to root font-size (scales with user settings). em = relative to parent.

### ③ Node.js
- **What:** JavaScript running **outside** the browser (on a server), built on Chrome's V8 engine.
- **Why you used it:** Lets you write the backend in the same language as the frontend. Great for APIs and real-time apps.
- **Must-know basics:**
  - **Non-blocking, event-driven, single-threaded** — handles many connections without a thread per request (good for I/O-heavy apps, not CPU-heavy).
  - **npm** = package manager. `package.json` lists dependencies. `node_modules` holds them.
  - **CommonJS** (`require`) vs **ES Modules** (`import`).
  - Built-in modules: `fs` (files), `http`, `path`, `process`.
- **Likely questions:**
  - *"Why is Node good for I/O?"* → Its non-blocking event loop lets it handle thousands of concurrent requests without waiting on each one.
  - *"Node single-threaded but handles concurrency?"* → The event loop + libuv thread pool offload slow operations and run callbacks when they finish.
  - *"What's npm?"* → Node Package Manager — installs/manages third-party libraries.

### ④ Express.js
- **What:** A minimal web framework for Node. Handles routing, requests, responses, middleware.
- **Why you used it:** Fastest way to build a REST API in Node. You used it for backends (e.g., Roadmap2077, OriginalityAI).
- **Must-know basics:**
  - **Routing:** `app.get('/users', handler)`, `app.post(...)`, etc.
  - **Middleware:** functions that run between request and response — `(req, res, next) => {}`. Used for auth, logging, parsing (`express.json()`), CORS.
  - `req` (request: params, query, body) and `res` (response: `res.json()`, `res.status(404)`).
  - **Route params** `/users/:id` (`req.params.id`) vs **query** `?sort=name` (`req.query.sort`).
- **Likely questions:**
  - *"What's middleware?"* → A function in the request pipeline that can read/modify req/res or pass control with `next()`. Auth checks, body parsing, error handling.
  - *"How do you handle errors in Express?"* → An error-handling middleware with 4 args `(err, req, res, next)`.

### ⑤ MongoDB
- **What:** A **NoSQL document database**. Stores data as flexible JSON-like documents (BSON) in collections.
- **Why you used it:** Flexible schema, pairs naturally with JS/Node (data is basically JSON), fast to iterate. The "M" in MERN.
- **Must-know basics:**
  - **Document** (a record) → **Collection** (a table) → **Database**.
  - **Mongoose** = the ODM (Object Data Modeling) library — gives you Schemas/Models, validation, queries.
  - CRUD: `create`, `find`, `findById`, `updateOne`, `deleteOne`.
  - No fixed schema — documents in a collection can differ (but Mongoose adds structure).
- **Likely questions:**
  - *"SQL vs NoSQL / MongoDB vs MySQL?"* → SQL = structured tables, fixed schema, relations, good for complex queries/transactions. NoSQL/Mongo = flexible documents, scales horizontally, great when data is JSON-ish and the schema evolves.
  - *"What's Mongoose?"* → A library that adds schemas, validation, and a clean API on top of MongoDB.
  - *"When NOT to use MongoDB?"* → When you have lots of relationships and need strong transactions (banking) — a relational DB fits better.

### ⑥ REST API
- **What:** A style for designing APIs over HTTP using **resources** (URLs) and **methods**.
- **Why you used it:** Standard way your frontend talks to your backend.
- **Must-know basics:**
  - **HTTP methods:** `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove).
  - **Status codes:** 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.
  - **Stateless** — each request carries everything needed (e.g., the auth token); server stores no session between requests.
  - **JSON** request/response bodies.
  - Endpoint design: `GET /users`, `GET /users/:id`, `POST /users`, `DELETE /users/:id`.
- **Likely questions:**
  - *"What makes an API RESTful?"* → Stateless, resource-based URLs, standard HTTP methods, JSON.
  - *"PUT vs PATCH?"* → PUT replaces the whole resource; PATCH updates part of it.
  - *"What's a 401 vs 403?"* → 401 = not authenticated (who are you?). 403 = authenticated but not allowed.

### ⑦ Git
- **What:** A **version control system** — tracks code changes, lets you branch, merge, and collaborate.
- **Why you used it:** You managed Git/GitHub workflows at ItXiTPro — branches, code reviews, on-time delivery.
- **Must-know basics:**
  - `git add` → `git commit` → `git push`. `git pull` to get others' changes.
  - **Branches:** `git branch`, `git checkout -b feature`, `git merge`. Work on a branch, open a **Pull Request**, review, merge to `main`.
  - **Merge conflict:** two people changed the same lines — Git asks you to pick. You resolve manually.
  - `git status`, `git log`, `git stash`, `.gitignore`.
- **Likely questions:**
  - *"merge vs rebase?"* → Merge keeps history and adds a merge commit. Rebase rewrites your commits on top of another branch for a linear history.
  - *"What's a PR?"* → A request to merge your branch; teammates review before it lands.
  - *"How do you resolve a conflict?"* → Open the file, choose the right code between the `<<<<` markers, commit.

### ⑧ MySQL
- **What:** A **relational (SQL) database** — data in tables with rows/columns and defined relationships.
- **Why you used it:** Backend data for WordPress/PHP client work (Prepzee), structured business data.
- **Must-know basics:**
  - **Tables, rows, columns, primary key, foreign key.**
  - **CRUD in SQL:** `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
  - **JOINs** — combine rows from related tables (INNER, LEFT).
  - **Schema** is fixed and defined up front.
  - Indexes speed up reads; normalization avoids duplicate data.
- **Likely questions:**
  - *"What's a JOIN?"* → Combines rows from two tables based on a related column (e.g., users + orders on `user_id`).
  - *"Primary vs foreign key?"* → Primary uniquely identifies a row in its table; foreign key points to a primary key in another table (the relationship).
  - *"Normalization?"* → Organizing tables to reduce redundancy (each fact stored once).

### ⑨ React.js
- **What:** A JavaScript **library** for building UIs from reusable **components**.
- **Why you used it:** Your primary frontend tool — Pokédex, Coffee Tracker, etc. Component reuse + reactive UI.
- **Must-know basics:**
  - **Components** — functions that return JSX (HTML-in-JS). Reusable, composable.
  - **Props** — data passed *into* a component (read-only).
  - **State** — data a component owns and can change (`useState`). Changing state re-renders.
  - **Hooks:** `useState` (state), `useEffect` (side effects: fetch data, subscriptions), `useRef`, `useContext`.
  - **Virtual DOM** — React keeps a lightweight copy of the DOM, diffs it on change, and updates only what changed (fast).
  - **Keys** in lists — help React track items (`key={item.id}`).
  - **One-way data flow** — data flows down via props; events flow up via callbacks.
- **Likely questions:**
  - *"Props vs state?"* → Props come from the parent and are read-only. State is internal and changeable.
  - *"What's the Virtual DOM?"* → An in-memory representation React diffs against the real DOM to update efficiently.
  - *"What does useEffect do?"* → Runs side effects after render — data fetching, subscriptions, manual DOM. The dependency array controls when it re-runs (`[]` = once on mount).
  - *"Why keys in lists?"* → So React can identify which items changed/added/removed and avoid re-rendering everything.
  - *"Controlled component?"* → A form input whose value is driven by React state.

### ⑩ TypeScript
- **What:** JavaScript **with static types**. Compiles down to plain JS.
- **Why you used it:** Catches bugs before runtime, better autocomplete, safer refactors on bigger projects.
- **Must-know basics:**
  - **Types:** `string`, `number`, `boolean`, `string[]`, `any` (avoid), `unknown`.
  - **Interfaces / types** — describe the shape of objects: `interface User { name: string; age: number }`.
  - **Optional** `age?: number`, **union** `string | number`, **generics** `Array<T>`.
  - Type errors are caught at **compile time**, not when the user hits the bug.
- **Likely questions:**
  - *"Why TypeScript?"* → Catches type errors early, makes code self-documenting, improves tooling/autocomplete, safer in teams.
  - *"interface vs type?"* → Both describe shapes; interfaces can be extended/merged, `type` can do unions and more. For objects they're mostly interchangeable.
  - *"What's `any`?"* → Turns off type checking for a value — use sparingly; it defeats the point.

### ⑪ Next.js
- **What:** A **React framework** that adds routing, server-side rendering, and full-stack features.
- **Why you used it:** SEO-friendly rendering, file-based routing, API routes — production-grade React.
- **Must-know basics:**
  - **File-based routing** — a file in `pages/` (or `app/`) becomes a route.
  - **Rendering modes:** **SSR** (render on each request), **SSG** (render at build time), **CSR** (in browser), **ISR** (regenerate periodically).
  - **API routes** — backend endpoints inside the same project.
  - Built-in **Image**, font, and performance optimizations.
- **Likely questions:**
  - *"SSR vs CSR vs SSG?"* → SSR renders HTML on the server per request (fresh, good SEO). SSG renders once at build (fastest, for static content). CSR renders in the browser (SPA).
  - *"Why Next over plain React?"* → SEO via server rendering, routing out of the box, API routes, image/perf optimization.

### ⑫ Tailwind CSS
- **What:** A **utility-first** CSS framework — style with small classes in your HTML (`flex`, `p-4`, `text-center`).
- **Why you used it:** Fast styling without writing custom CSS files or naming things; consistent design system.
- **Must-know basics:**
  - Utility classes compose styles: `class="flex items-center gap-4 p-6 rounded-lg"`.
  - **Responsive prefixes:** `md:flex`, `lg:text-xl`. **State:** `hover:`, `focus:`.
  - Configurable via `tailwind.config.js`. Purges unused classes for a tiny production bundle.
- **Likely questions:**
  - *"Tailwind vs regular CSS?"* → Tailwind = utility classes inline, fast iteration, consistent spacing/colors, no naming/cascade headaches. Trade-off: busy HTML.
  - *"Isn't inline styling bad?"* → Utilities aren't inline styles — they're reusable, responsive, and stripped of unused CSS at build.

### ⑬ WordPress
- **What:** The world's most popular **CMS** (content management system), built on PHP + MySQL.
- **Why you used it:** Real client websites at ItXiTPro — fast to build, client can edit content themselves.
- **Must-know basics:**
  - **Themes** (look) + **Plugins** (features). **Posts**, **Pages**, **Custom Post Types**.
  - **The Loop** — PHP that pulls and displays posts.
  - Page builders (**WPBakery**), **ACF** for custom fields, **Yoast** for SEO.
  - Powered by PHP templates + a MySQL database.
- **Likely questions:**
  - *"What's a Custom Post Type?"* → A content type beyond posts/pages (e.g., "Courses", "Properties") with its own fields and admin UI.
  - *"Theme vs plugin?"* → Theme controls appearance; plugin adds functionality.
  - *"How did you customize sites?"* → Custom themes/templates, CPTs, ACF fields, form/lead-capture integration, SEO + speed tuning.

### ⑭ PHP
- **What:** A server-side scripting language — the backbone of WordPress and a lot of the web.
- **Why you used it:** WordPress/CMS backends, custom logic, MySQL queries for client work.
- **Must-know basics:**
  - Runs on the server, generates HTML. `<?php ... ?>` blocks.
  - Variables `$x`, arrays, functions, superglobals (`$_GET`, `$_POST`, `$_SESSION`).
  - Talks to MySQL (PDO / mysqli). In WordPress you use `WP_Query`, hooks (`add_action`, `add_filter`).
- **Likely questions:**
  - *"GET vs POST?"* → GET puts data in the URL (visible, for fetching). POST puts it in the body (for submitting/changing data).
  - *"What are WordPress hooks?"* → Actions and filters that let you run your code at specific points without editing core.

### ⑮ Three.js
- **What:** A JavaScript library for **3D graphics** in the browser using WebGL.
- **Why you used it:** Visual/interactive effects (CafeFindr particles, creative dev work).
- **Must-know basics:**
  - The trio: **Scene** (the world) + **Camera** (the viewpoint) + **Renderer** (draws to a `<canvas>`).
  - **Mesh** = **Geometry** (shape) + **Material** (surface). **Lights** for realism.
  - An **animation loop** (`requestAnimationFrame`) re-renders each frame.
- **Likely questions:**
  - *"What do you need for a Three.js scene?"* → Scene, Camera, Renderer, and at least one Mesh (geometry + material).
  - *"What's WebGL?"* → A browser API for GPU-accelerated 2D/3D rendering; Three.js is a friendly layer over it.

### ⑯ Firebase
- **What:** Google's **Backend-as-a-Service** — database, auth, hosting, storage without running your own server.
- **Why you used it:** Coffee Tracker — real-time data + auth with no backend to maintain.
- **Must-know basics:**
  - **Firestore / Realtime Database** — cloud NoSQL that syncs live to clients.
  - **Authentication** — email/password, Google, etc., out of the box.
  - **Hosting**, **Storage**, **Cloud Functions**.
- **Likely questions:**
  - *"Why Firebase?"* → Ship fast with no backend — real-time sync, built-in auth, hosting. Great for MVPs and small apps.
  - *"Firebase vs your own Node backend?"* → Firebase = speed, less control, vendor lock-in, can get costly at scale. Custom backend = full control, more work.

---

## 3. The Bench — supporting tools (one-liners)

| Tool | What it is / why you used it |
|---|---|
| **Python** | General-purpose language — scripting, automation, basic data/AI tasks. |
| **Vercel** | Hosting platform optimized for Next.js/frontend; push to deploy, instant previews. |
| **Netlify** | Static-site/frontend hosting + CI; you deployed several projects here. |
| **WPBakery** | Drag-and-drop page builder for WordPress — fast client page layouts. |
| **Framer** | Design/prototyping (and no-code site) tool — UI motion and mockups. |
| **Groq API** | Ultra-fast LLM inference API — you used it for the AI features in Roadmap2077. |
| **Shopify** | Hosted e-commerce platform — stores, products, checkout. |
| **HubSpot** | CRM + marketing tool — you wired lead-capture forms (FieldTurf). |
| **Leaflet.js** | Lightweight JS library for interactive maps — CafeFindr used it with OpenStreetMap. |

---

## 3.5 The new signings — added to the squad, know them cold

> These are now on your portfolio, so interviewers WILL ask. Same rule: what it is, why, one likely question.

- **Astro** — static-site framework that ships zero JS by default ("islands" add interactivity only where needed). *Why:* your portfolio runs on it — instant loads, great Lighthouse. *Q: "Why Astro over Next?"* → Content-first sites don't need a full React runtime; Astro renders to plain HTML and hydrates only the interactive islands.
- **GSAP** — the industry-standard JS animation library (timelines, ScrollTrigger). *Why:* powers your portfolio's scroll effects. *Q:* "CSS vs GSAP?" → CSS for simple transitions; GSAP for orchestrated, scroll-linked, or interrupted animations.
- **Prisma** — type-safe ORM for Node/TypeScript. Schema file → generated client → autocompleted queries. *Q: "Why an ORM?"* → Type safety end to end, migrations, no hand-rolled SQL injection risks — but know when raw SQL wins (complex reports).
- **PostgreSQL** — the serious relational DB: ACID, joins, JSON columns, full-text search. *Q: "Postgres vs MySQL?"* → Broadly similar; Postgres has richer types (JSONB, arrays), better standards compliance — you pick per project/team.
- **Redis** — in-memory key-value store. *Why:* caching hot data, sessions, rate-limiting. *Q:* "Where would you add it?" → Cache expensive DB queries or API responses with a TTL; sessions in multi-server setups.
- **Docker** — containers: your app + its exact environment, runs the same everywhere. `Dockerfile` → image → container. *Q: "Container vs VM?"* → Containers share the host kernel — start in ms, MBs not GBs.
- **AWS** — the cloud. Know the big four: **EC2** (servers), **S3** (file storage), **RDS** (managed databases), **Lambda** (serverless functions). *Q:* "How would you deploy your app on AWS?" → Container on EC2/ECS or Lambda for the API, RDS Postgres, S3 for assets.
- **GitHub Actions** — CI/CD in your repo: on every push, run tests/lint/build, then deploy. A YAML file in `.github/workflows/`. *Q:* "What's in your pipeline?" → install → lint → test → build → deploy on main.
- **Auth.js / JWT / OAuth** — Auth.js = the Next.js auth library (sessions, providers). JWT = signed token the client sends per request (stateless). OAuth = "log in with Google" — delegated access via an authorization server. *Q: "Session vs JWT?"* → Sessions store state on the server (easy revocation); JWTs are stateless (scale easily, harder to revoke — use short expiry + refresh tokens).
- **OpenAI API / LLM Integration / AI Agents** — calling LLMs from your backend (never expose keys client-side), prompt design, streaming responses. An **agent** = an LLM in a loop with tools: it decides, calls a function/API, reads the result, repeats. *Q:* "How do you keep LLM output reliable?" → Constrain with system prompts + structured output (JSON schema), validate before using, and keep a human/deterministic fallback.

---

## 4. Your Projects — how to talk about them

> For each: **what it does → stack → why those choices → one thing you're proud of → likely follow-up.**

### Roadmap2077 — AI career platform
- **What:** Personalized career roadmaps, exam planners, AI question papers, Resume AI, unlimited AI mentorship.
- **Stack:** Node.js, Express, **Groq API** (LLM), HTML/CSS/JS.
- **Why:** Node/Express for a fast API; Groq for low-latency AI responses.
- **Proud of:** Wiring an LLM into a real product with multiple AI tools.
- **Follow-up:** *"How do you call the LLM?"* → Backend route takes the user prompt, sends it to the Groq API with a system prompt, streams/returns the response to the frontend. (Keep the API key on the **server**, never the client.)

### CafeFindr — luxury café discovery
- **What:** Find cafés on a live interactive map with filters + 3D particle effects. No backend.
- **Stack:** **Leaflet.js** + **OpenStreetMap** data, **Three.js**, vanilla JS.
- **Why:** Leaflet is lightweight and free (no Google Maps key); OSM is open data; pure frontend = zero hosting cost.
- **Proud of:** A polished, "premium" app with no backend or API keys.
- **Follow-up:** *"How does the map work?"* → Leaflet renders OSM tiles, I plot café markers from the data and add popups + filtering.

### OriginalityAI — AI/plagiarism detection
- **What:** Upload a PDF/DOCX → get AI-content + plagiarism analysis with rewrite suggestions.
- **Stack:** Node/Express backend, AI/NLP, file parsing (PDF/DOCX).
- **Follow-up:** *"How do you handle file uploads?"* → A multipart form on the frontend, `multer`-style middleware on the server, parse the text, run the analysis.

### Pokémon Pokédex
- **What:** All 151 Pokémon, responsive, instant search + type filters.
- **Stack:** **React**, REST API (PokéAPI), state management.
- **Why:** React for reusable cards + reactive search; async data fetching from a public API.
- **Follow-up:** *"How did you fetch data?"* → `useEffect` + `fetch` on mount, stored in state, rendered a list, filtered client-side.

### FieldTurf Landscape — WordPress client site
- **What:** Full business website with HubSpot CRM lead capture; SEO + speed.
- **Stack:** **WordPress**, PHP, HubSpot.
- **Follow-up:** *"What did you own?"* → Design → build → SEO → performance → deployment for a real client, end to end.

### Prepzee — ed-tech WordPress platform
- **Stack:** WordPress, **PHP**, **MySQL**, Custom Post Types, form validation, lead capture.

### Coffee Tracker — React + Firebase
- **What:** Log coffee, track caffeine, visualize habits with **real-time sync**.
- **Stack:** **React**, **Firebase** (Firestore + Auth).
- **Why:** Firebase = real-time data + auth with no backend.

### Weather App / QR Generator / To-Do
- **Weather:** live API fetch by city (JS + weather API). Shows you can consume a third-party API.
- **QR:** generate a downloadable QR from text/URL (vanilla JS, no dependencies).
- **To-Do:** CRUD + **LocalStorage** persistence (data survives refresh).

---

## 5. Core concepts they love to ask

- **What happens when you type a URL and hit enter?** → DNS resolves the domain to an IP → browser opens a TCP (and TLS) connection → sends an HTTP request → server responds with HTML → browser parses HTML, fetches CSS/JS/images → renders the page → JS runs.
- **Authentication vs Authorization** → AuthN = *who are you* (login). AuthZ = *what are you allowed to do* (permissions).
- **JWT (JSON Web Token)** → A signed token the server gives on login; the client sends it on each request (usually in the `Authorization: Bearer` header). Stateless auth.
- **CORS** → Browser security that blocks requests to a different origin unless the server allows it (via `Access-Control-Allow-Origin` headers).
- **API key safety** → Never put secret keys in frontend code (anyone can see them). Keep them on the server / in environment variables.
- **SQL vs NoSQL** → Tables + relations + fixed schema (MySQL) vs flexible documents that scale horizontally (MongoDB). Pick based on the data shape.
- **GET vs POST** → GET reads (data in URL, cacheable, no body). POST creates/changes (data in body).
- **Synchronous vs asynchronous** → Sync blocks until done; async lets slow I/O happen without freezing the app (Promises/async-await).
- **What is an environment variable?** → A config value (API keys, DB URLs) kept out of code, set per environment (dev/prod), e.g., in a `.env` file.

---

## 6. HR / behavioral (have a story ready)

- **"Tell me about yourself."** → Use your 30-second pitch (top of this doc).
- **"Hardest bug you fixed?"** → Pick a real one (a CORS error, an async race, a merge conflict). Structure: *situation → what I tried → root cause → fix → lesson.*
- **"Why should we hire you?"** → You ship real products end to end, you're a fast learner, and you care about details (UX + performance).
- **"Where do you see gaps?"** → Be honest: deeper testing, system design at scale, DevOps/CI-CD. Then say how you're learning them.
- **"Why did you choose X over Y?"** → Always frame as a **trade-off** (speed vs control, cost vs scale). Interviewers love trade-off reasoning.

---

## 6.5 Walking someone through THIS portfolio

Recruiters and technical interviewers will open your site live. Have a 60-second tour ready and know what's under the hood.

- **The pitch (60s):** *"It's a single-page Astro site — static-generated, so it loads instantly and scores high on Core Web Vitals. The scroll experience is GSAP + a custom canvas/animation engine. Everything is themeable: the colour picker repaints the entire site live by swapping CSS custom properties, and the text auto-contrasts using a luminance check so it never breaks readability."*
- **Things you can defend if asked:**
  - *"Why Astro?"* → Ships zero JS by default, static output (fast + cheap to host), great Lighthouse scores; I add interactivity only where needed (islands).
  - *"How does the colour picker not break contrast?"* → I compute relative luminance of the chosen colour and pick dark or light text against it; surfaces that must stay fixed (the green pitch, the globe) read a stored ink colour instead of the theme variable.
  - *"What's the hardest part?"* → Theme-safety across every possible colour, and keeping 60fps with multiple canvases (I pause off-screen sections with an IntersectionObserver).
  - *"Accessibility?"* → Semantic landmarks, `prefers-reduced-motion` disables the heavy animation, decorative canvases are `aria-hidden`.
- **Honesty line:** *"It started from an open-source template (credited in the README under CC-BY-NC), and I rebuilt the content, theming system, the tech-stack 'pitch', the AI chatbot, and the deploy pipeline myself."* — owning this is far stronger than pretending it's 100% from scratch.

---

## 7. What to study next (your growth list)

1. **Testing** — Jest + React Testing Library (most juniors skip this; it sets you apart).
2. **Auth deeply** — JWT, sessions, OAuth, hashing passwords (bcrypt).
3. **System design basics** — load balancing, caching (Redis), CDNs, databases at scale.
4. **DevOps** — Docker, CI/CD (GitHub Actions), environment management.
5. **Data structures & algorithms** — arrays, hashmaps, recursion, Big-O — for DSA rounds.
6. **One backend deeper** — pick Node or PHP and go past the basics (streams, queues, caching).

---

*Last updated: keep this current as you learn. Read one section a day and you'll never be caught off guard. — You've got this. 🔴*

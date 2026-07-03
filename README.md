# 📚 Exam Chronicle

A comprehensive GCSE & A-Level revision tracking app covering History, Geography, and Religious Studies across Edexcel, AQA, and OCR exam boards. Built as a Progressive Web App — install it on any phone or tablet and use it offline.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/exam-chronicle)

---

## What it does

Students track every past-paper question they've practised, log confidence (○ / ◑ / ●), get AI-powered marking and feedback, and use spaced repetition to focus revision where it matters most.

---

## Subjects & exam boards

| Subject | Boards | Levels |
|---------|--------|--------|
| History | Edexcel · AQA · OCR | GCSE · A Level |
| Geography | Edexcel · AQA · OCR | GCSE · A Level |
| Religious Studies | Edexcel · AQA · OCR | GCSE · A Level |

---

## Feature overview

### 📖 Core revision tools
| Feature | Description |
|---------|-------------|
| **Topic tracker** | 98 pre-built topic tabs across all specs; add questions with one tap |
| **Confidence tracking** | ○ not attempted · ◑ in progress · ● confident — updates per question |
| **Spaced repetition** | Confidence toggles set a due-date: ○=1 day, ◑=4 days, ●=10 days |
| **Due today queue** | Focused card-flip session through all questions due for review |
| **Weak spots** | Auto-surfaced list of your 10 lowest-confidence questions across all topics |
| **Series view** | See all questions from a single exam paper sitting in order |
| **Exam countdown** | Set your exam date per subject — shows days remaining in the header |
| **Study streak** | Consecutive days of revision tracked; 🔥 streak shown in header |

### 🤖 AI features (requires API key)
| Feature | Description |
|---------|-------------|
| **Question Marker** | Upload a photo of handwritten work; Claude/ChatGPT marks it against the mark scheme |
| **Flashcard self-mark** | Write your answer; AI grades it and gives level-by-level feedback |
| **AI Essay Planner** | Structured essay planning for any question with argument scaffolding |
| **AI Predictor** | Gap-analysis across your tracked questions to flag likely exam topics |
| **Knowledge Test** | AI-generated short-answer quiz for any topic; auto-marks your responses |
| **AI Auto-fill** | Populate question summaries and mark schemes for a topic using AI |
| **Mark scheme explainer** | "Why these marks?" — AI explains each mark scheme point in plain English |
| **Source practice** | Timed source-analysis sessions with circular countdown ring |
| **AI difficulty rating** | After marking, rate questions Easy / Medium / Hard; persists per question |

### 📊 Progress & analysis
| Feature | Description |
|---------|-------------|
| **Grade tracker** | Log mock scores over time; line chart with letter grade and trend |
| **Topic mastery badges** | A–E letter grade per topic tab based on confident question % |
| **Class competition** | Leaderboard for class groups with gold/silver/bronze medals |
| **Share progress** | Generate a formatted progress card to share with teachers or parents |
| **Printable revision sheet** | A4-formatted question list with mark schemes and answer lines per topic |
| **Export CSV** | Download any view as a spreadsheet |

### 🎨 Visual & UX
- Frosted-glass sticky header with scroll-aware backdrop blur
- 3D flashcard flip with swipe-to-mark gestures on mobile
- Staggered card entrance animations on topic switch
- Confetti burst when a topic reaches 100% confident
- Bottom sheet Entry modal on mobile with drag handle
- Circular progress rings (ConfRing) throughout
- Gold/navy/teal brand palette with dark mode
- PWA install: works offline, home screen icon, native feel

---

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/exam-chronicle.git
cd exam-chronicle
npm install
```

### 2. Run locally

```bash
npm run dev
# → http://localhost:5173
```

### 3. Set up AI marking (optional)

The AI features support three providers. Set yours via the **AI Settings** button in the app:

| Provider | Where to get a key |
|----------|-------------------|
| Claude (Anthropic) | [console.anthropic.com](https://console.anthropic.com) |
| ChatGPT (OpenAI) | [platform.openai.com](https://platform.openai.com/api-keys) |
| Copilot (your own endpoint) | Set in AI Settings |

API keys are stored in your browser's `localStorage` only — never committed to git.

> **School deployment?** If you're deploying school-wide, consider adding a lightweight backend proxy so students don't need individual API keys. See `src/App.jsx` → `callAIText()` for the fetch wrapper to adapt.

---

## Deploying

### Netlify (recommended — free tier works)

1. Push to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
3. Select your repo — `netlify.toml` is auto-detected
4. Click **Deploy** — live in ~90 seconds

Build settings (auto-detected from `netlify.toml`):
```
Build command:  npm ci && npm run build
Publish dir:    dist
Node version:   20
```

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"
npm install -D gh-pages
npm run deploy
```

---

## PWA / mobile install

Once deployed, students can install Exam Chronicle like a native app:

- **iOS Safari**: Share → Add to Home Screen
- **Android Chrome**: ⋮ menu → Add to Home Screen
- **Desktop Chrome**: Address bar install icon

The service worker (`public/sw.js`) caches the app shell for offline use. Question data is stored in `localStorage` so it persists between sessions without a backend.

---

## Project structure

```
exam-chronicle/
├── public/
│   ├── manifest.json        PWA manifest (name, icons, theme colour)
│   ├── sw.js                Offline-first service worker
│   ├── favicon.ico
│   ├── logo.png
│   └── icons/               PWA icons (16, 32, 180, 192, 512px)
├── src/
│   └── App.jsx              Full application (~13,600 lines, single-file)
├── index.html               Entry point with Tailwind + Montserrat font
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml             Deploy config
└── .gitignore
```

> **Why single-file?** The app evolved incrementally through many sessions and the monolithic structure keeps deployment and debugging simple. All components, data, styles, and logic are co-located in `src/App.jsx`. There are no external API calls at runtime except the optional AI marking endpoints.

---

## Data & privacy

- **All data stays on-device** in `localStorage`. There is no database, no user accounts, and no data sent to any server (except direct API calls to your chosen AI provider when you use marking features).
- Question data, confidence scores, notes, and progress are all stored locally and exportable as JSON via the in-app export button.
- Clearing `localStorage` or the site data will reset the app.

---

## Customising

### Adding topics or specs

Open `src/App.jsx` and search for `const TOPICS`. Each topic follows this shape:

```js
{
  id: 'unique-id',
  name: 'Full topic name',
  short: 'Short label',
  board: 'Edexcel',       // 'Edexcel' | 'AQA' | 'OCR'
  level: 'GCSE',          // 'GCSE' | 'A Level'
  subject: 'History',     // 'History' | 'Geography' | 'Religious Studies'
  paper: 'Paper 1',
  icon: BookOpen,          // Lucide icon component
  structure: [            // Question structure
    { q: 'Q1', marks: 4, type: 'inference' },
    { q: 'Q2(a)', marks: 4, type: 'describe' },
    // ...
  ]
}
```

### Changing the AI provider default

Search for `const DEFAULT_PROVIDER` near the top of `src/App.jsx`.

---

## Tech stack

| Tool | Version | Role |
|------|---------|------|
| React | 18.3.1 | UI framework |
| Vite | 5.3.1 | Build tool |
| Tailwind CSS | 3.4.4 | Utility styles |
| Lucide React | 0.383.0 | Icons |
| Anthropic / OpenAI | via fetch | AI marking |

No other runtime dependencies.

---

## Licence

MIT — free to use, deploy, and modify for educational purposes.

If you use this in a school, a ⭐ on GitHub and a mention to students goes a long way!

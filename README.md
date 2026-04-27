# Cadeco Operations · Team 7 · UH IE Capstone

INDE 4334 capstone deliverable site. Vite + React + React Router + Recharts.
Designed for Vercel deployment, dark theme, UH brand-aligned.

## Pages

- **/** — Landing (hero, headline metrics, problem/solution, three pillars, CTA)
- **/dashboard** — 7-tab interactive dashboard (Overview, Pareto, Cycle Time, Travel, Capacity, Roles, Trends)
- **/about** — Team members, methodology, course context, acknowledgments
- **/downloads** — Categorized deliverables (Documentation, Diagrams, Data, Presentation)

## Local development

```bash
npm install
npm run dev          # → http://localhost:5173
```

## Build

```bash
npm run build        # → dist/
npm run preview      # → preview the production build
```

## Deploy to Vercel

### One-time setup

1. Push this directory to a GitHub repo
2. Go to vercel.com → Add New Project
3. Import the GitHub repo
4. Vercel auto-detects Vite. Click Deploy.
5. Get your URL: `cadeco-team7.vercel.app` (or the custom subdomain you set)

### Subsequent updates

Just push to the connected branch. Vercel auto-deploys. The QR code URL stays the same.

### Custom domain (optional)

Vercel Settings → Domains → Add domain. Points to your custom domain or stays on the .vercel.app subdomain.

## File downloads

Drop the actual deliverable files into `public/files/` so they're served at `/files/<filename>`.
The Downloads page references files like:
- `/files/Documentation_Guide_v3.docx`
- `/files/Cell_Layout_v5.drawio`
- `/files/Cadeco_Dashboard_v3.xlsx`
- ...etc

If a file isn't in `public/files/`, the link 404s. Add files as the project completes — entries
in `src/data/projectData.js` (the `deliverables` array) map names → filenames.

## Updating numbers

All project numbers live in **`src/data/projectData.js`** — single source of truth.
Edit there and every page rebuilds with the new values.

## Project structure

```
src/
├── App.jsx              · Router setup
├── main.jsx             · Entry point
├── styles.css           · Global styles + animations
├── theme.js             · Color palette + font tokens
├── components/
│   ├── Layout.jsx       · Top nav + footer wrapper
│   └── UI.jsx           · Reusable primitives (Btn, StatCard, Panel, etc.)
├── data/
│   └── projectData.js   · ALL project data — edit here
└── pages/
    ├── Home.jsx         · Landing
    ├── Dashboard.jsx    · 7-tab analytics
    ├── About.jsx        · Team + methodology
    ├── Downloads.jsx    · Deliverable links
    └── NotFound.jsx     · 404
```

## Numbers locked per chat corrections (26 Apr 2026)

- Printer walk: 4.35 → 0.45 min (94 ft round-trip @ 3.5 ft/sec)
- Team Lead travel: ~913 ft → ~130 ft (86%)
- Total NVA: 19.35 → 0.45 min (98%)
- 6-activity cycle total: 29.31 → 3.05 min (90%)
- Cases: 34,604 / Lines: 1,221 / Orders: 229
- Capacity: 44 / 256 (17.2%)

---

Built April 2026. Spring 2026 graduation.

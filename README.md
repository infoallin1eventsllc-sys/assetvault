# AssetVault

**[Live demo →](https://assetvault-otis.netlify.app)**

**Institutional Real-World Asset (RWA) tokenization dashboard — a React 19 + TypeScript frontend showcase demonstrating modern web development patterns.**

A design-forward interface that visualizes how fractional real-world assets (real estate, private equity, infrastructure) could be tokenized, tracked, and traded on an institutional platform. Built to demonstrate frontend engineering skills across modern React, TypeScript, and animation tooling — not a live financial product.

## What it demonstrates

- **React 19** with functional components and hooks-based state management
- **TypeScript** end-to-end, with shared interfaces for domain models (`Asset`, `NewsItem`, `PortfolioItem`)
- **Tailwind CSS 4** (latest major) for utility-first styling
- **Framer Motion** for view transitions and micro-interactions
- **Recharts** for financial data visualization
- **Lucide React** for icon system
- **Vite 6** for fast dev and production builds
- **Mobile-responsive design** — desktop sidebar collapses to bottom nav on mobile

## Views

Six primary views, all navigable via sidebar (desktop) or bottom nav (mobile):

- **Overview** — asset catalog with buy-token flow
- **Mirrored Model** — deep-dive on the "1:1 mirror token" institutional concept
- **Tokenize** — form for minting new fractional assets
- **Treasury** — vault status and compliance placeholders
- **Analytics** — market intelligence with news sentiment feed
- **Portfolio** — user holdings with cost-basis tracking

## Architecture

State is lifted to `App.tsx` and passed to view components via props. Each view is a self-contained component in `src/components/`. Domain models live in `src/types.ts`, mock data in `src/mockData.ts`.

- **Client-side only.** No backend, no persistence, no external API calls in the current version. All data is mock data illustrating the shape a real backend would return.
- **Zero authentication.** This is a UI showcase.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Tests

```bash
npm test          # run tests once
npm run test:watch # run in watch mode
```

## Type-check

```bash
npm run lint
```

## Build for production

```bash
npm run build
```

## Known security notes

The `esbuild <= 0.24.2` advisory (GHSA-67mh-4wv8-2f99) is flagged transitively via `vite` and `vitest`. This affects the local dev server only — production builds are static assets with no esbuild runtime. Suppressing via `--force` would break the Vitest major version. Tracked in `.security-notes.md` and will be resolved when the upstream `vitest` transitive dependency is updated.

## Roadmap

- [x] Code-split heavy views with React.lazy (845kB to 361kB initial bundle)
- [ ] Add integration tests for the buy-token and tokenize flows
- [ ] Replace expiring Google-hosted asset images with local or CDN-hosted assets
- [ ] Wire up a real Gemini API integration for news sentiment (currently a static mock)
- [ ] Add persistence layer (backend + database) to make holdings survive page refresh
- [ ] Deploy to Netlify or Vercel

## License

MIT

# Harry Potter Explorer

A small web app to browse the Harry Potter universe — characters, houses, and spells — built with Next.js and the free [HP-API](https://hp-api.onrender.com). Take-home frontend assignment.

## Features

- **Browse characters** — responsive grid of characters with photo and house
- **Character details** — patronus, wand, actor, ancestry, date of birth, and more
- **Browse by house** — filter characters by Gryffindor, Hufflepuff, Ravenclaw, or Slytherin with house-colored accents
- **Browse spells** — all spells with their descriptions, each with a per-spell magical glow (oklch, derived from the spell name)
- **Search** — fuzzy name search with debounce (Fuse.js)
- **Sort & load more** — sort by name/house, client-side load-more (24 per batch)
- **Students / staff scopes** — filter to Hogwarts students or staff
- **Loading & error states** — skeleton loading, friendly error with retry
- **Custom 404** and per-character metadata (`generateMetadata`) for clean share links

## Tech Stack

- **Next.js 16** (App Router, Turbopack) — server components for detail pages, client components where state lives
- **Tailwind CSS v4** + shadcn/ui primitives (Button, Input, Skeleton)
- **TanStack Query** — characters fetching/caching (scoped to the characters page via `Providers`)
- **Fuse.js** — fuzzy search
- **Framer Motion** + **Lenis** — list transitions and smooth scrolling
- **Vitest** + **React Testing Library** — component tests (jsdom)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run dev     # dev server (localhost:3000)
npm run build   # production build
npm run lint    # eslint
npm run test    # vitest (component tests)
```

The app calls the HP-API directly (no proxy/backend). Note the free Render instance can be slow to warm up on first request.

## Decisions & Trade-offs

- **Characters fetched once, filtered client-side.** The list endpoint returns ~430 records; fetching it once and doing search/sort/filter/pagination in the client keeps interactions instant and the API calls minimal. Query is cached with React Query so navigating back to `/characters` doesn't refetch.
- **Server components for detail pages.** `/characters/[id]` and `/spells` are server components fetching their data — better for SEO, no client waterfalls, and `generateMetadata` derives the page title from the character. Both use `unstable_cache` (1h revalidation) since the free-tier API is slow to warm up and characters/spells change rarely.
- **House colors as fixed map, not an API.** The API has no `/houses` endpoint (per the assignment notes), so houses are a fixed constant list with their heraldic colors.
- **Tests cover the risky bits, not everything.** A small Vitest + Testing Library suite checks the `CharacterDetail` alive-status rendering (a real null-handling bug) and the `CharacterImage` image/fallback branch. Filter logic is thin wrappers over React Query + Fuse.js, which are better covered by integration/E2E.
- **No /incantation on spells.** The HP-API spells endpoint only returns `name` and `description`, so the spells page renders those.

## What I'd Do With More Time

- **Deploy & CI.** Push to Vercel on main and run ESLint + tests on every PR — the repo is already public and the workflow is one `vercel deploy`.
- **`generateStaticParams` for popular characters** — pre-render the top characters at build time to cut API load further.
- **Integration tests for the filter chain** — `useCharacterFilters` (React Query + Fuse.js + debounce) is the most bug-prone piece and deserves a real integration suite beyond the current component tests.
- **E2E smoke test** — one Playwright test per flow (browse → filter → detail → back) to lock the navigation state.
- **Students/staff accuracy** — the list endpoint returns `hogwartsStudent: null` for many records, so the client-side scope filter can miss real students; the dedicated `/characters/students` endpoint would be more accurate at the cost of a second fetch.

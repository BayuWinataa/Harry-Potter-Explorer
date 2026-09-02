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

- **Next.js 16** (App Router, Turbopack) — server components for pages, client components where state lives
- **Tailwind CSS v4** + Base UI-backed shadcn/ui-style primitives (Button, Input, Skeleton)
- **TanStack Query** — hydrates the server-fetched character list into the client (via `Providers`)
- **Axios** + **Zod** — typed API client with runtime response validation
- **Fuse.js** + **use-debounce** — fuzzy name search with debounce
- **Lenis** — smooth scrolling; list transitions are a plain CSS `animate-fade-up` (Framer Motion dropped)
- **lucide-react** — icons
- **next/font** — self-hosted 'Harry Potter' display face + Sofia Sans body, with Geist Mono
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

- **Characters fetched once on the server, filtered client-side.** `/characters` is a server component that fetches the list and wraps it in `unstable_cache` (1h revalidate). The array hydrates a TanStack Query (5 min staleTime, so no refetch on mount) and the ~430 records stay in memory — search, sort, house/scope filters, and pagination all run client-side, keeping interactions instant.
- **Server components on every data page.** `/characters/[id]`, `/spells`, and `/characters` all fetch server-side through `unstable_cache` (1h revalidation) — better for SEO, no client waterfalls, and `generateMetadata` derives the detail-page title from the character. The house filter is kept in the URL (`?house=…`), so a character's back-link restores the list you came from.
- **House colors as fixed map, not an API.** The API has no `/houses` endpoint (per the assignment notes), so houses are a fixed constant list with their heraldic colors.
- **Tests cover the risky bits, not everything.** A small Vitest + Testing Library suite checks the `CharacterDetail` alive-status rendering (a real null-handling bug) and the `CharacterImage` image/fallback branch. Filter logic is thin wrappers over React Query + Fuse.js, which are better covered by integration/E2E.
- **No /incantation on spells.** The HP-API spells endpoint only returns `name` and `description`, so the spells page renders those.

## What I'd Do With More Time

- **Deploy & CI.** Push to Vercel on main and run ESLint + tests on every PR — the repo is already public and the workflow is one `vercel deploy`.
- **`generateStaticParams` for popular characters** — pre-render the top characters at build time to cut API load further.
- **Integration tests for the filter chain** — `useCharacterFilters` (React Query + Fuse.js + debounce) is the most bug-prone piece and deserves a real integration suite beyond the current component tests.
- **E2E smoke test** — one Playwright test per flow (browse → filter → detail → back) to lock the navigation state.
- **Students/staff accuracy** — the list endpoint returns `hogwartsStudent: null` for many records, so the client-side scope filter can miss real students; the dedicated `/characters/students` endpoint would be more accurate at the cost of a second fetch.

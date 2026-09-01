# Harry Potter Explorer

A small web app to browse the Harry Potter universe — characters, houses, and spells — built with Next.js and the free [HP-API](https://hp-api.onrender.com). Take-home frontend assignment.

## Features

- **Browse characters** — responsive grid of characters with photo and house
- **Character details** — patronus, wand, actor, ancestry, date of birth, and more
- **Browse by house** — filter characters by Gryffindor, Hufflepuff, Ravenclaw, or Slytherin with house-colored accents
- **Browse spells** — all spells with their descriptions
- **Search** — fuzzy name search with debounce (Fuse.js)
- **Sort & paginate** — sort by name/house, client-side pagination (24/page)
- **Students / staff scopes** — filter to Hogwarts students or staff
- **Loading & error states** — skeleton loading, friendly error with retry
- **Custom 404** and per-character metadata (`generateMetadata`) for clean share links

## Tech Stack

- **Next.js 16** (App Router, Turbopack) — server components for detail pages, client components where state lives
- **Tailwind CSS v4** + shadcn/ui primitives (Button, Input, Skeleton)
- **TanStack Query** — characters fetching/caching (scoped to the characters page via `Providers`)
- **Fuse.js** — fuzzy search
- **Framer Motion** — subtle list transitions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

The app calls the HP-API directly (no proxy/backend). Note the free Render instance can be slow to warm up on first request.

## Decisions & Trade-offs

- **Characters fetched once, filtered client-side.** The list endpoint returns ~430 records; fetching it once and doing search/sort/filter/pagination in the client keeps interactions instant and the API calls minimal. Query is cached with React Query so navigating back to `/characters` doesn't refetch.
- **Server components for detail pages.** `/characters/[id]` and `/spells` are server components fetching their data — better for SEO, no client waterfalls, and `generateMetadata` derives the page title from the character.
- **House colors as fixed map, not an API.** The API has no `/houses` endpoint (per the assignment notes), so houses are a fixed constant list with their heraldic colors.
- **No test suite.** The assignment lists tests as an optional stretch goal; I prioritized polish and scope. See below.
- **No /incantation on spells.** The HP-API spells endpoint only returns `name` and `description`, so the spells page renders those.

## What I'd Do With More Time

- Add a small unit test suite (Vitest + Testing Library) for the filter logic — the derived data chain in `useCharacterFilters` is the most testable and most bug-prone part.
- Add infinite scroll or "load more" instead of pagination for a smoother browse.
- Character detail could use `generateStaticParams` + `unstable_cache` to pre-render popular characters and reduce API load.
- Add a house overview section linking each house to its filtered character list.
- Add ESLint/Prettier CI and a Vercel deploy on push.

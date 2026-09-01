'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Fuse from 'fuse.js';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { fetchCharacters } from '@/services/hpApi';
import { HOUSES, HOUSE_COLORS, hpQueryKeys } from '@/types/hp';
import { CharacterCard, characterKey } from '@/components/character-card';
import { cn } from '@/lib/utils';

const SCOPES = [
  { value: 'all', label: 'All' },
  { value: 'students', label: 'Students' },
  { value: 'staff', label: 'Staff' },
] as const;

type Scope = (typeof SCOPES)[number]['value'];

const COUNT_LABEL: Record<Scope, string> = {
  all: 'wizards and witches from the wizarding world.',
  students: 'Hogwarts students.',
  staff: 'Hogwarts staff members.',
};

const FILTERS = ['All', ...HOUSES] as const;
const PAGE_SIZE = 24;

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'house-asc', label: 'House A–Z' },
  { value: 'house-desc', label: 'House Z–A' },
] as const;

type SortBy = (typeof SORT_OPTIONS)[number]['value'];

function CharactersContent() {
  const [scope, setScope] = useState<Scope>('all');
  const searchParams = useSearchParams();
  const router = useRouter();
  const houseParam = searchParams.get('house');
  const house: (typeof FILTERS)[number] =
    houseParam && HOUSES.includes(houseParam as (typeof HOUSES)[number])
      ? (houseParam as (typeof FILTERS)[number])
      : 'All';
  const setHouse = (h: (typeof FILTERS)[number]) => {
    setPage(1);
    router.push(h === 'All' ? '/characters' : `/characters?house=${h}`);
  };
  const [sortBy, setSortBy] = useState<SortBy>('name-asc');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 400);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: hpQueryKeys.characters,
    queryFn: fetchCharacters,
  });

  // students/staff = subset of /characters via hogwartsStudent/hogwartsStaff flags
  const scoped = useMemo(() => {
    const list = data ?? [];
    if (scope === 'students') return list.filter((c) => c.hogwartsStudent);
    if (scope === 'staff') return list.filter((c) => c.hogwartsStaff);
    return list;
  }, [data, scope]);

  const fuse = useMemo(
    () => new Fuse(scoped, { keys: ['name'], threshold: 0.3 }),
    [scoped],
  );

  const searched = debouncedQuery
    ? fuse.search(debouncedQuery).map((r) => r.item)
    : scoped;

  const characters = searched.filter(
    (c) => house === 'All' || c.house === house,
  );

  const sorted = useMemo(() => {
    const list = [...characters];
    switch (sortBy) {
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'house-asc':
        return list.sort((a, b) =>
          (a.house || 'Unknown').localeCompare(b.house || 'Unknown'),
        );
      case 'house-desc':
        return list.sort((a, b) =>
          (b.house || 'Unknown').localeCompare(a.house || 'Unknown'),
        );
      default:
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [characters, sortBy]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <main className="container mx-auto px-4 pt-24 pb-10">
      <h1 className="font-display text-3xl font-bold">Characters</h1>
      <div
        className="mt-3 h-1 w-16 rounded-full"
        style={{
          backgroundColor:
            house !== 'All' ? HOUSE_COLORS[house].bg : 'var(--primary)',
        }}
      />
      <p className="mt-2 text-sm text-muted-foreground">
        {scoped.length} {COUNT_LABEL[scope]}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {SCOPES.map((s) => (
          <button
            key={s.value}
            onClick={() => {
              setScope(s.value);
              setPage(1);
            }}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors',
              scope === s.value
                ? 'border-transparent bg-primary font-medium text-primary-foreground'
                : 'border-border text-muted-foreground hover:bg-muted',
            )}
            aria-pressed={scope === s.value}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((h) => {
            const active = house === h;
            const color = h !== 'All' ? HOUSE_COLORS[h] : null;
            return (
              <button
                key={h}
                onClick={() => setHouse(h)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm transition-colors',
                  active
                    ? 'border-transparent font-medium'
                    : 'border-border text-muted-foreground hover:bg-muted',
                )}
                style={
                  active && color
                    ? { backgroundColor: color.bg, color: color.color }
                    : undefined
                }
                aria-pressed={active}
              >
                {h}
              </button>
            );
          })}
        </div>
        <label className="sr-only" htmlFor="sort">
          Sort characters
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="rounded-lg border border-input bg-background px-2 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <section className="mt-8">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 animate-pulse rounded-lg border border-border bg-muted"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-10 text-center">
            <p className="text-sm text-destructive">
              Failed to load characters. Check your connection and try again.
            </p>
            <button
              onClick={() => refetch()}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && characters.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {debouncedQuery
              ? `No characters match "${debouncedQuery}".`
              : `No characters found in ${house}.`}
          </p>
        )}

        {!isLoading && !isError && characters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((c) => (
              <CharacterCard key={characterKey(c)} character={c} />
            ))}
          </motion.div>
        )}

        {!isLoading && !isError && pageCount > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-2 text-sm text-muted-foreground">
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={() => setPage(Math.min(pageCount, currentPage + 1))}
              disabled={currentPage === pageCount}
              className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default function CharactersPage() {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 pt-24 pb-10">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        </main>
      }
    >
      <CharactersContent />
    </Suspense>
  );
}

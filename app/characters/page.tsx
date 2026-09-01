'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Fuse from 'fuse.js';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { fetchCharacters } from '@/services/hpApi';
import { HOUSES, HOUSE_COLORS, hpQueryKeys } from '@/types/hp';
import { CharacterCard, characterKey } from '@/components/character-card';
import { cn } from '@/lib/utils';

const FILTERS = ['All', ...HOUSES] as const;
const PAGE_SIZE = 24;

export default function CharactersPage() {
  const [house, setHouse] = useState<(typeof FILTERS)[number]>('All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 400);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: hpQueryKeys.characters,
    queryFn: fetchCharacters,
  });

  const fuse = useMemo(
    () => new Fuse(data ?? [], { keys: ['name'], threshold: 0.3 }),
    [data],
  );

  const searched = debouncedQuery
    ? fuse.search(debouncedQuery).map((r) => r.item)
    : (data ?? []);

  const characters = searched.filter(
    (c) => house === 'All' || c.house === house,
  );

  const pageCount = Math.max(1, Math.ceil(characters.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = characters.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Characters</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {data?.length ?? 0} wizards and witches from the wizarding world.
      </p>

      <div className="mt-6 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
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

      <section className="mt-8">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-lg border border-border bg-muted"
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

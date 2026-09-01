"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { CharacterCard } from "@/components/character-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCharacterFilters,
  SCOPES,
  COUNT_LABEL,
  FILTERS,
  SORT_OPTIONS,
} from "@/hooks/use-character-filters";
import { HOUSE_COLORS } from "@/types/hp";
import { cn } from "@/lib/utils";
import { Providers } from "@/app/providers";

function CharactersContent() {
  const {
    scope,
    setScope,
    house,
    setHouse,
    sortBy,
    setSortBy,
    query,
    setQuery,
    debouncedQuery,
    isLoading,
    isError,
    refetch,
    scoped,
    characters,
    visible,
    pageCount,
    currentPage,
    setPage,
  } = useCharacterFilters();

  return (
    <main className="container mx-auto px-4 pt-24 pb-10">
      <h1 className="font-display text-3xl font-bold">Characters</h1>
      <div
        className="mt-3 h-1 w-16 rounded-full"
        style={{
          backgroundColor:
            house !== "All" ? HOUSE_COLORS[house].bg : "var(--primary)",
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
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              scope === s.value
                ? "border-transparent bg-primary font-medium text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted",
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
          <Input
            type="search"
            value={query}
            aria-label="Search characters by name"
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((h) => {
            const active = house === h;
            const color = h !== "All" ? HOUSE_COLORS[h] : null;
            return (
              <button
                key={h}
                onClick={() => setHouse(h)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "border-transparent font-medium"
                    : "border-border text-muted-foreground hover:bg-muted",
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
          onChange={(e) =>
            setSortBy(e.target.value as (typeof SORT_OPTIONS)[number]["value"])
          }
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
              <Skeleton key={i} className="aspect-3/4 rounded-lg" />
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((c) => (
              <CharacterCard key={c.id} character={c} />
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
    <Providers>
      <Suspense
        fallback={
          <main className="container mx-auto px-4 pt-24 pb-10">
            <Skeleton className="h-8 w-40 rounded-md" />
          </main>
        }
      >
        <CharactersContent />
      </Suspense>
    </Providers>
  );
}

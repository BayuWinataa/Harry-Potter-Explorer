'use client';

import { useQuery } from '@tanstack/react-query';
import { Sparkles } from 'lucide-react';
import { fetchSpells } from '@/services/hpApi';
import { hpQueryKeys } from '@/types/hp';

export default function SpellsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: hpQueryKeys.spells,
    queryFn: fetchSpells,
  });

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Spells</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {data?.length ?? 0} incantations from the wizarding world.
      </p>

      <section className="mt-8">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-lg border border-border bg-muted"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-10 text-center">
            <p className="text-sm text-destructive">
              Failed to load spells. Check your connection and try again.
            </p>
            <button
              onClick={() => refetch()}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && (data?.length ?? 0) === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No spells found.
          </p>
        )}

        {!isLoading && !isError && (data?.length ?? 0) > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data!.map((spell) => (
              <div
                key={spell.id}
                className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-ring"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 shrink-0 text-primary" />
                  <span className="font-display text-lg font-semibold leading-snug">
                    {spell.name}
                  </span>
                </div>
                {spell.description && (
                  <p className="text-sm text-muted-foreground">
                    {spell.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

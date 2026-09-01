import { Sparkles } from 'lucide-react';
import { fetchSpells } from '@/services/hpApi';

export default async function SpellsPage() {
  const spells = await fetchSpells();

  return (
    <main className="container mx-auto px-4 pt-24 pb-10">
      <h1 className="font-display text-3xl font-bold">Spells</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {spells.length} incantations from the wizarding world.
      </p>

      <section className="mt-8">
        {spells.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No spells found.
          </p>
        )}

        {spells.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spells.map((spell) => (
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

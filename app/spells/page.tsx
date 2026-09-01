import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { fetchSpells } from "@/services/hpApi";

export const metadata: Metadata = { title: "Spells" };

// Spells berubah jarang — cache 1h, sama seperti detail karakter.
const getSpells = cache(async () => {
  const spells = await unstable_cache(() => fetchSpells(), ["spells"], {
    revalidate: 3600,
  })();
  return spells;
});

function spellHue(name: string) {
  let h = 5381;
  for (const c of name) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
  return h % 360;
}

export default async function SpellsPage() {
  const spells = await getSpells();

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
            {spells.map((spell) => {
              const h = spellHue(spell.name);
              return (
                <div
                  key={spell.id}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-colors hover:border-ring"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(120px at 30% 0%, oklch(0.7 0.13 ${h} / 0.28), transparent 70%)`,
                    }}
                  />
                  <span className="relative font-display text-2xl leading-none">
                    {spell.name}
                  </span>
                  <div
                    className="relative mt-2 h-px w-10"
                    style={{ background: `oklch(0.72 0.14 ${h})` }}
                  />
                  {spell.description && (
                    <p className="relative mt-3 text-sm text-muted-foreground">
                      {spell.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

import { fetchSpells } from '@/services/hpApi';

// Warna "cahaya mantra" deterministik per nama.
function hue(name: string) {
  return [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 0);
}

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
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-colors hover:border-ring"
              >
                {/* glow: warna cahaya mantra */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(120px at 30% 0%, hsl(${hue(spell.name)} 70% 60% / 0.30), transparent 70%)`,
                  }}
                />
                <span className="relative font-display text-2xl leading-none">
                  {spell.name}
                </span>
                <div
                  className="relative mt-2 h-px w-10"
                  style={{ background: `hsl(${hue(spell.name)} 70% 60%)` }}
                />
                {spell.description && (
                  <p className="relative mt-3 text-sm text-muted-foreground">
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

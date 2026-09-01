export default function SpellsLoading() {
  return (
    <main className="container mx-auto px-4 pt-24 pb-10">
      <div className="h-8 w-32 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-48 animate-pulse rounded bg-muted" />

      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-lg border border-border bg-muted"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

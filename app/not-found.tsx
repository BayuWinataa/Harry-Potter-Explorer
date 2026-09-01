import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container mx-auto max-w-4xl px-4 pt-24 pb-10">
      <div className="flex flex-col items-center gap-4 rounded-lg border border-border px-6 py-16 text-center">
        <p className="font-display text-6xl font-bold text-primary">404</p>
        <h1 className="font-display text-2xl font-bold">Page not found</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          This page seems to have vanished like a Portkey — or it never
          existed in the first place.
        </p>
        <Link
          href="/"
          className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

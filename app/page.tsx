import Image from 'next/image';
import Link from 'next/link';
import { ScrollText, Wand2 } from 'lucide-react';
import { HOUSES, HOUSE_COLORS } from '@/types/hp';

const HOUSE_TRAITS: Record<string, string> = {
  Gryffindor: 'Courage, daring, nerve, and chivalry.',
  Hufflepuff: 'Hard work, patience, loyalty, and fair play.',
  Ravenclaw: 'Intelligence, wisdom, wit, and learning.',
  Slytherin: 'Ambition, cunning, leadership, and resourcefulness.',
};

export default function Home() {
  return (
    <main>
      <section className="relative flex h-screen items-end justify-center overflow-hidden">
        <Image
          src="/Hero-image.webp"
          alt="Hogwarts Castle"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-background to-transparent" />
        <div className="relative z-10 mx-auto w-full px-4 pb-4 text-center sm:pb-8">
          <h1 className="font-display text-4xl text-foreground sm:text-6xl">
            Potterverse University
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <section className="py-10">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-bold">Browse by House</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOUSES.map((house) => {
              const colors = HOUSE_COLORS[house];
              return (
                <Link
                  key={house}
                  href={`/characters?house=${house}`}
                  className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-5 transition-[transform,border-color] duration-200 hover:scale-[1.02] hover:border-ring"
                >
                  <div
                    className="h-1 w-10 rounded-full"
                    style={{ backgroundColor: colors.bg }}
                  />
                  <span className="font-display text-xl font-bold">
                    {house}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {HOUSE_TRAITS[house]}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="py-10 pb-20">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-bold">Start Exploring</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/characters"
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-[transform,border-color] duration-200 hover:scale-[1.02] hover:border-ring"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wand2 className="size-6" />
              </div>
              <div className="flex-1">
                <span className="font-display text-lg font-bold">Characters</span>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse wizards, witches, and creatures. Filter by house.
                </p>
              </div>
            </Link>
            <Link
              href="/spells"
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-[transform,border-color] duration-200 hover:scale-[1.02] hover:border-ring"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ScrollText className="size-6" />
              </div>
              <div className="flex-1">
                <span className="font-display text-lg font-bold">Spells</span>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse incantations and their descriptions.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

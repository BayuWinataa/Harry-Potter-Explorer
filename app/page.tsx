import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HOUSES } from '@/types/hp';

const HOUSE_TRAITS: Record<string, string> = {
  Gryffindor: 'Courage, daring, nerve, and chivalry.',
  Hufflepuff: 'Hard work, patience, loyalty, and fair play.',
  Ravenclaw: 'Intelligence, wisdom, wit, and learning.',
  Slytherin: 'Ambition, cunning, leadership, and resourcefulness.',
};

const HOUSE_CREST: Record<string, string> = {
  Gryffindor: '/houses/gryffindor.svg',
  Hufflepuff: '/houses/hufflepuff.svg',
  Ravenclaw: '/houses/ravenclaw.svg',
  Slytherin: '/houses/slytherin.svg',
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
              return (
                <Link
                  key={house}
                  href={`/characters?house=${house}`}
                  className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center transition-[transform,border-color] duration-200 hover:scale-[1.01] hover:border-ring"
                >
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden">
                    <Image
                      src={HOUSE_CREST[house]}
                      alt={`${house} crest`}
                      width={72}
                      height={72}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
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

        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-bold">Start Exploring</h2>
              <div className="h-px flex-1 bg-border/60" />
            </div>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative overflow-hidden">
                  <Image
                    src="/charakter.webp"
                    alt="A witch from the wizarding world"
                    width={359}
                    height={401}
                    className="w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                <h3 className="font-display text-3xl font-bold sm:text-4xl">
                  Meet the characters
                </h3>
                <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                  Explore every wizard, witch, and creature in the HP-API.
                  Search by name, filter by house, and visit each character&apos;s
                  full profile.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Link
                    href="/characters"
                    className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
                  >
                    Browse Characters
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left lg:order-first">
                <h3 className="font-display text-3xl font-bold sm:text-4xl">
                  Learn the spells
                </h3>
                <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                  Study every incantation — from Lumos to Expelliarmus — with
                  their descriptions, straight from the HP-API.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Link
                    href="/spells"
                    className={cn(buttonVariants({ size: 'lg' }), 'gap-4')}
                  >
                    Browse Spells
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-sm lg:order-last">
                <div className="relative overflow-hidden">
                  <Image
                    src="/spelll.webp"
                    alt="A magic spell in the wizarding world"
                    width={334}
                    height={596}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

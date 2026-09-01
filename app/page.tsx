import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/home/section-heading';
import { ExploreRow } from '@/components/home/explore-row';
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
          <SectionHeading>Browse by House</SectionHeading>
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
            <SectionHeading>Start Exploring</SectionHeading>

            <ExploreRow
              image={{
                src: '/charakter.webp',
                alt: 'A witch from the wizarding world',
                width: 359,
                height: 401,
              }}
              title="Meet the characters"
              copy="Explore every wizard, witch, and creature in the HP-API. Search by name, filter by house, and visit each character's full profile."
              href="/characters"
              cta="Browse Characters"
            />

            <ExploreRow
              reverse
              image={{
                src: '/spelll.webp',
                alt: 'A magic spell in the wizarding world',
                width: 334,
                height: 596,
              }}
              title="Learn the spells"
              copy="Study every incantation — from Lumos to Expelliarmus — with their descriptions, straight from the HP-API."
              href="/spells"
              cta="Browse Spells"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

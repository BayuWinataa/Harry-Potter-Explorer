import Link from 'next/link';
import { ScrollText, Wand2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">
        Explore the Wizarding World
      </h1>
      <p className="max-w-xl text-muted-foreground">
        Browse Harry Potter characters and spells, straight from the HP-API.
        Pick a house, find your favorite wizard, learn a spell or two.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/characters" className={cn(buttonVariants(), 'gap-1.5')}>
          <Wand2 className="size-4" />
          Browse Characters
        </Link>
        <Link
          href="/spells"
          className={cn(buttonVariants({ variant: 'outline' }), 'gap-1.5')}
        >
          <ScrollText className="size-4" />
          Browse Spells
        </Link>
      </div>
    </main>
  );
}

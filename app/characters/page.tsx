import { Suspense } from "react";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { CharactersContent } from "@/components/characters-content";
import { fetchCharacters } from "@/services/hpApi";
import { Skeleton } from "@/components/ui/skeleton";

const getCharacters = cache(async () =>
  unstable_cache(fetchCharacters, ["characters-list"], { revalidate: 3600 })(),
);

export default async function CharactersPage() {
  const characters = await getCharacters();
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 pt-24 pb-10">
          <Skeleton className="h-8 w-40 rounded-md" />
        </main>
      }
    >
      <CharactersContent initialCharacters={characters} />
    </Suspense>
  );
}

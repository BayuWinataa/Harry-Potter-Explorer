import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CharacterDetail } from '@/components/character-detail';
import { fetchCharacterById } from '@/services/hpApi';
import type { Character } from '@/types/hp';

// Unstable_cache: characters change rarely, cache 1h to avoid hammering the
// free-tier API on every request. Network/5xx errors still propagate to the
// error boundary; only a missing character falls through to notFound().
const getCharacter = cache(async (id: string): Promise<Character | null> => {
  const [character] = await unstable_cache(
    () => fetchCharacterById(id),
    ['character', id],
    { revalidate: 3600 },
  )();
  return character ?? null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) return {};

  const meta: string[] = [character.name];
  if (character.house) meta.push(character.house);
  if (character.actor) meta.push(`played by ${character.actor}`);
  return {
    title: character.name,
    description: `${meta.join(' — ')} in the wizarding world.`,
  };
}

export default async function CharacterPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ house?: string }>;
}) {
  const { id } = await params;
  const { house } = await searchParams;
  const character = await getCharacter(id);
  if (!character) notFound();

  // Back bawa filter house yang dipakai saat datang dari /characters?house=X.
  const backHref = house ? `/characters?house=${house}` : '/characters';

  return <CharacterDetail character={character} backHref={backHref} />;
}

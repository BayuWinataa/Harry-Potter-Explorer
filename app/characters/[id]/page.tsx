import { cache } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CharacterDetail } from '@/components/character-detail';
import { fetchCharacterById } from '@/services/hpApi';
import type { Character } from '@/types/hp';

const getCharacter = cache(async (id: string): Promise<Character | null> => {
  let characters: Awaited<ReturnType<typeof fetchCharacterById>>;
  try {
    characters = await fetchCharacterById(id);
  } catch {
    return null;
  }
  return characters[0] ?? null;
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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) notFound();

  return <CharacterDetail character={character} />;
}

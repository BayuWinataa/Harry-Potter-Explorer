import { notFound } from 'next/navigation';
import { CharacterDetail } from '@/components/character-detail';
import { fetchCharacterById } from '@/services/hpApi';

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let characters: Awaited<ReturnType<typeof fetchCharacterById>>;
  try {
    characters = await fetchCharacterById(id);
  } catch {
    notFound();
  }

  const character = characters[0];
  if (!character) notFound();

  return <CharacterDetail character={character} />;
}

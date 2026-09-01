'use client';

import Link from 'next/link';
import type { Character } from '@/types/hp';
import { CharacterImage } from '@/components/character-image';
import { HouseBadge } from '@/components/house-badge';

// Stable API id is always present (all records have UUIDs).
export function CharacterCard({
  character,
  house,
}: {
  character: Character;
  house?: string;
}) {
  // Bawa house query ke detail supaya tombol back balik dengan filter utuh.
  const href =
    house && house !== 'All'
      ? `/characters/${character.id}?house=${house}`
      : `/characters/${character.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-[transform,border-color] duration-200 hover:scale-[1.02] hover:border-ring"
    >
      <CharacterImage
        name={character.name}
        image={character.image}
        className="aspect-square"
      />
      <div className="flex flex-col gap-1.5 p-4">
        <span className="font-display text-lg font-semibold leading-snug">
          {character.name}
        </span>
        <HouseBadge house={character.house} />
      </div>
    </Link>
  );
}

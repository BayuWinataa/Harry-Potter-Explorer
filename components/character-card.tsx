'use client';

import Link from 'next/link';
import type { Character } from '@/types/hp';
import { HOUSE_COLORS } from '@/types/hp';
import { CharacterImage } from '@/components/character-image';

// Character id can be "" in HP-API records — fallback key from name for routing
export function characterKey(c: Character) {
  return c.id || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function CharacterCard({ character }: { character: Character }) {
  const houseColor = character.house ? HOUSE_COLORS[character.house] : null;

  return (
    <Link
      href={`/characters/${characterKey(character)}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-ring"
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
        {houseColor ? (
          <span
            className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: houseColor.bg, color: houseColor.color }}
          >
            {character.house}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">No house</span>
        )}
      </div>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Character } from '@/types/hp';
import { HOUSE_COLORS } from '@/types/hp';

// Character id can be "" in HP-API records — fallback key from name for routing
export function characterKey(c: Character) {
  return c.id || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function CharacterCard({ character }: { character: Character }) {
  const [imgError, setImgError] = useState(false);
  const showImage = character.image && !imgError;
  const houseColor = character.house ? HOUSE_COLORS[character.house] : null;

  return (
    <Link
      href={`/characters/${characterKey(character)}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-ring"
    >
      <div className="relative aspect-square bg-muted">
        {showImage ? (
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-accent">
            <span className="font-display text-4xl font-bold text-muted-foreground">
              {initials(character.name)}
            </span>
          </div>
        )}
      </div>
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

'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { fetchCharacters } from '@/services/hpApi';
import { HOUSE_COLORS, hpQueryKeys } from '@/types/hp';
import { CharacterImage } from '@/components/character-image';
import { characterKey } from '@/components/character-card';

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm">{value}</dd>
    </div>
  );
}

export function CharacterDetail({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: hpQueryKeys.characters,
    queryFn: fetchCharacters,
  });

  const character = (data ?? []).find((c) => c.id === id || characterKey(c) === id);

  if (isLoading) {
    return (
      <main className="container mx-auto max-w-4xl px-4 pt-24 pb-10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="aspect-square w-full max-w-xs rounded-lg bg-muted" />
            <div className="flex-1 space-y-3">
              <div className="h-8 w-1/2 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !character) {
    return (
      <main className="container mx-auto max-w-4xl px-4 pt-24 pb-10">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-border px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Character not found or could not be loaded.
          </p>
          <Link
            href="/characters"
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            Back to Characters
          </Link>
        </div>
      </main>
    );
  }

  const houseColor = character.house ? HOUSE_COLORS[character.house] : null;
  const text = (v: string | number | null | undefined) =>
    v === null || v === undefined || v === '' ? undefined : String(v);

  const details = [
    ['Actor', text(character.actor)],
    ['Species', text(character.species)],
    ['Gender', text(character.gender)],
    ['Date of Birth', text(character.dateOfBirth)],
    ['Year of Birth', text(character.yearOfBirth)],
    ['Ancestry', text(character.ancestry)],
    ['Eye Colour', text(character.eyeColour)],
    ['Hair Colour', text(character.hairColour)],
    ['Patronus', text(character.patronus)],
    ['Wand', [text(character.wand?.wood), text(character.wand?.core), character.wand?.length ? `${character.wand.length}"` : undefined].filter(Boolean).join(', ')],
    ['Status', character.alive ? 'Alive' : 'Deceased'],
    ['Role', [character.hogwartsStudent ? 'Student' : null, character.hogwartsStaff ? 'Staff' : null].filter(Boolean).join(', ')],
  ] as const;

  return (
    <main className="container mx-auto max-w-4xl px-4 pt-24 pb-10">
      <Link
        href="/characters"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Characters
      </Link>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:gap-8">
        <CharacterImage
          name={character.name}
          image={character.image}
          className="aspect-square w-full max-w-xs shrink-0 overflow-hidden rounded-lg border border-border"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold">{character.name}</h1>
            {houseColor && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: houseColor.bg, color: houseColor.color }}
              >
                {character.house}
              </span>
            )}
          </div>

          <dl className="mt-4 divide-y divide-border border-y border-border">
            {details.map(([label, value]) => (
              <InfoRow key={label} label={label} value={value} />
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}

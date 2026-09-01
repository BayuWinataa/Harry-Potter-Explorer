import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HOUSE_COLORS } from '@/types/hp';
import type { Character } from '@/types/hp';
import { CharacterImage } from '@/components/character-image';

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm">{value}</dd>
    </div>
  );
}

export function CharacterDetail({ character }: { character: Character }) {
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
          sizes="(max-width: 640px) 100vw, 320px"
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

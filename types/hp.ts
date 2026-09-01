import { z } from 'zod';

const WandSchema = z.object({
  wood: z.string().nullish(),
  core: z.string().nullish(),
  length: z.number().nullish(),
});

// Zod schemas double as runtime validation of the HP-API response shape and
// as the source of the TypeScript types (z.infer). nullish() = null | undefined.
export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  alternate_names: z.array(z.string()).default([]),
  species: z.string().nullish(),
  gender: z.string().nullish(),
  house: z.string().nullish(),
  dateOfBirth: z.string().nullish(),
  yearOfBirth: z.number().nullish(),
  wizard: z.boolean().nullish(),
  ancestry: z.string().nullish(),
  eyeColour: z.string().nullish(),
  hairColour: z.string().nullish(),
  wand: WandSchema.nullish(),
  patronus: z.string().nullish(),
  hogwartsStudent: z.boolean().nullish(),
  hogwartsStaff: z.boolean().nullish(),
  actor: z.string().nullish(),
  alternate_actors: z.array(z.string()).default([]),
  alive: z.boolean().nullish(),
  image: z.string().nullish(),
});

export const SpellSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
});

export type Character = z.infer<typeof CharacterSchema>;
export type Spell = z.infer<typeof SpellSchema>;

export const HOUSES = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'] as const;

export const HOUSE_COLORS: Record<string, { color: string; bg: string }> = {
  Gryffindor: { color: '#d3a625', bg: '#740001' },
  Slytherin: { color: '#c0c0c0', bg: '#1a472a' },
  Ravenclaw: { color: '#946b2d', bg: '#0e1a40' },
  Hufflepuff: { color: '#ecb939', bg: '#372e29' },
};

// Query Keys for TanStack Query
export const hpQueryKeys = {
  characters: ['characters'] as const,
  character: (id: string) => ['characters', id] as const,
  spells: ['spells'] as const,
} as const;
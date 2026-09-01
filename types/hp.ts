export interface Character {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}

export interface Wand {
  wood: string;
  core: string;
  length: number;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
}

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
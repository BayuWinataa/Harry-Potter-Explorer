import axios from 'axios';
import { z } from 'zod';
import { CharacterSchema, SpellSchema } from '@/types/hp';
import type { Character, Spell } from '@/types/hp';

// Base API configuration
const BASE_URL = 'https://hp-api.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request/response interceptors for logging or error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`API Error [${error.config?.url}]:`, error.message);
    return Promise.reject(error);
  }
);

const CharacterArraySchema = z.array(CharacterSchema);
const SpellArraySchema = z.array(SpellSchema);

/**
 * Fetches all characters from the Harry Potter API
 */
export const fetchCharacters = async (): Promise<Character[]> => {
  const response = await api.get<unknown>('/characters');
  return CharacterArraySchema.parse(response.data);
};

/**
 * Fetches a single character by ID (endpoint returns array of 1).
 * A 404 (unknown id) resolves to an empty array; network/5xx errors
 * propagate so the error boundary can offer a retry.
 */
export const fetchCharacterById = async (id: string): Promise<Character[]> => {
  try {
    const response = await api.get<unknown>(`/character/${id}`);
    return CharacterArraySchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

/**
 * Fetches all spells
 */
export const fetchSpells = async (): Promise<Spell[]> => {
  const response = await api.get<unknown>('/spells');
  return SpellArraySchema.parse(response.data);
};
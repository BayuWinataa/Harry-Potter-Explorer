import axios from 'axios';
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

/**
 * Fetches all characters from the Harry Potter API
 */
export const fetchCharacters = async (): Promise<Character[]> => {
  const response = await api.get<Character[]>('/characters');
  return response.data;
};

/**
 * Fetches a single character by ID (endpoint returns array of 1)
 */
export const fetchCharacterById = async (id: string): Promise<Character[]> => {
  const response = await api.get<Character[]>(`/character/${id}`);
  return response.data;
};

/**
 * Fetches all spells
 */
export const fetchSpells = async (): Promise<Spell[]> => {
  const response = await api.get<Spell[]>('/spells');
  return response.data;
};
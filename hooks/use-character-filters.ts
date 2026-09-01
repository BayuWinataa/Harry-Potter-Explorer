'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Fuse from 'fuse.js';
import { fetchCharacters } from '@/services/hpApi';
import { HOUSES, hpQueryKeys } from '@/types/hp';

export const SCOPES = [
  { value: 'all', label: 'All' },
  { value: 'students', label: 'Students' },
  { value: 'staff', label: 'Staff' },
] as const;

export type Scope = (typeof SCOPES)[number]['value'];

export const COUNT_LABEL: Record<Scope, string> = {
  all: 'wizards and witches from the wizarding world.',
  students: 'Hogwarts students.',
  staff: 'Hogwarts staff members.',
};

export const FILTERS = ['All', ...HOUSES] as const;
export const PAGE_SIZE = 24;

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'house-asc', label: 'House A–Z' },
  { value: 'house-desc', label: 'House Z–A' },
] as const;

export type SortBy = (typeof SORT_OPTIONS)[number]['value'];

export function useCharacterFilters() {
  const [scope, setScope] = useState<Scope>('all');
  const searchParams = useSearchParams();
  const router = useRouter();
  const houseParam = searchParams.get('house');
  const house: (typeof FILTERS)[number] =
    houseParam && HOUSES.includes(houseParam as (typeof HOUSES)[number])
      ? (houseParam as (typeof FILTERS)[number])
      : 'All';
  const setHouse = (h: (typeof FILTERS)[number]) => {
    setVisibleCount(PAGE_SIZE);
    router.push(h === 'All' ? '/characters' : `/characters?house=${h}`);
  };
  const [sortBy, setSortBy] = useState<SortBy>('name-asc');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [debouncedQuery] = useDebounce(query, 400);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: hpQueryKeys.characters,
    queryFn: fetchCharacters,
  });

  // students/staff = subset of /characters via hogwartsStudent/hogwartsStaff flags
  const scoped = useMemo(() => {
    const list = data ?? [];
    if (scope === 'students') return list.filter((c) => c.hogwartsStudent);
    if (scope === 'staff') return list.filter((c) => c.hogwartsStaff);
    return list;
  }, [data, scope]);

  const fuse = useMemo(
    () => new Fuse(scoped, { keys: ['name'], threshold: 0.3 }),
    [scoped],
  );

  const searched = useMemo(
    () =>
      debouncedQuery
        ? fuse.search(debouncedQuery).map((r) => r.item)
        : scoped,
    [fuse, debouncedQuery, scoped],
  );

  const characters = useMemo(
    () =>
      searched.filter((c) => house === 'All' || c.house === house),
    [searched, house],
  );

  const sorted = useMemo(() => {
    const list = [...characters];
    switch (sortBy) {
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'house-asc':
        return list.sort((a, b) =>
          (a.house || 'Unknown').localeCompare(b.house || 'Unknown'),
        );
      case 'house-desc':
        return list.sort((a, b) =>
          (b.house || 'Unknown').localeCompare(a.house || 'Unknown'),
        );
      default:
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [characters, sortBy]);

  // Client-side pagination: all data is in memory (single fetch), so "load
  // more" just reveals the next slice instead of hitting the API again.
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;
  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE);
  const resetList = () => setVisibleCount(PAGE_SIZE);

  return {
    scope,
    setScope,
    house,
    setHouse,
    sortBy,
    setSortBy,
    query,
    setQuery,
    debouncedQuery,
    isLoading,
    isError,
    refetch,
    scoped,
    characters,
    visible,
    hasMore,
    loadMore,
    resetList,
  };
}

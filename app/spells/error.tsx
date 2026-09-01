'use client';

import { useEffect } from 'react';
import { ErrorCard } from '@/components/error-card';

export default function SpellsError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorCard
      message="Failed to load spells. Check your connection and try again."
      retry={retry}
    />
  );
}

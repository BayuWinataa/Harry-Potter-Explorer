'use client';

import { useEffect } from 'react';
import { ErrorCard } from '@/components/error-card';

export default function CharactersError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorCard message="Something went wrong rendering this page." retry={retry} />;
}

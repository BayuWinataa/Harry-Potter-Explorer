/* eslint-disable @next/next/no-img-element -- external flaky images from HP-API need onError fallback */
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function CharacterImage({
  name,
  image,
  className,
}: {
  name: string;
  image?: string;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = image && !imgError;

  return (
    <div className={cn('relative bg-muted', className)}>
      {showImage ? (
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-accent">
          <span className="font-display text-4xl font-bold text-muted-foreground">
            {initials(name)}
          </span>
        </div>
      )}
    </div>
  );
}

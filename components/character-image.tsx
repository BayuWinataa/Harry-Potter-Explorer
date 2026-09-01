'use client';

import Image from 'next/image';
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
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw',
}: {
  name: string;
  image?: string;
  className?: string;
  sizes?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = image && !imgError;

  return (
    <div className={cn('relative bg-muted', className)}>
      {showImage ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes={sizes}
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

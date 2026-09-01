'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/characters', label: 'Characters' },
  { href: '/spells', label: 'Spells' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="size-5" />
          <span>Harry Potter Explorer</span>
        </Link>
        <ul className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
                    active
                      ? 'bg-muted font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

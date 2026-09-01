'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/characters', label: 'Characters' },
  { href: '/spells', label: 'Spells' },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-3 z-20 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 backdrop-blur">
        {NAV_LINKS.map(({ href, label }) => {
          const active =
            pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-full px-4 py-1 font-display text-sm transition-colors',
                active
                  ? 'bg-radial from-primary to-primary/20 text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted',
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

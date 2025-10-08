'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  href: string;
  match?: (pathname: string) => boolean;
}

const NAV_LINKS: NavLink[] = [
  {
    label: 'Home',
    href: '/',
    match: (pathname) => pathname === '/',
  },
  {
    label: 'Project',
    href: '/project',
    match: (pathname) => pathname.startsWith('/project'),
  },
  {
    label: 'Tool',
    href: '/tool',
    match: (pathname) => pathname.startsWith('/tool'),
  },
  {
    label: 'Service',
    href: '/service',
    match: (pathname) => pathname.startsWith('/service'),
  },
];

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b border-dotted border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          sabi of vibe
        </Link>
        <div className="flex items-center gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = link.match ? link.match(pathname) : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wide transition-all duration-300',
                  isActive
                    ? 'bg-foreground text-background shadow-lg'
                    : 'bg-background text-muted-foreground hover:-translate-y-0.5 hover:bg-muted hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

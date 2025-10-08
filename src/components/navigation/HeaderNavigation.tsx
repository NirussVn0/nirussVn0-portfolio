'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Project',
    href: '/project',
    isActive: (pathname) => pathname.startsWith('/project'),
  },
  {
    label: 'Tool',
    href: '/project#tool-stack',
    isActive: (pathname) => pathname.startsWith('/project'),
  },
  {
    label: 'Service',
    href: '/#service',
    isActive: (pathname) => pathname === '/' || pathname.startsWith('/service'),
  },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const { isDark, toggleTheme, mounted } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur sm:px-8 lg:px-16">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground transition-colors hover:text-foreground"
        >
          NirussVn0
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.4em] transition-all duration-300',
                  'hover:text-foreground hover:-translate-y-0.5',
                  active ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:text-foreground"
          aria-label="Toggle theme"
          disabled={!mounted}
        >
          {isDark ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

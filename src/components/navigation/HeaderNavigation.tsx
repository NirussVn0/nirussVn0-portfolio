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
      </div>
    </header>
  );
}

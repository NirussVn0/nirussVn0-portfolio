'use client';

import { useMemo } from 'react';
import type { IntroOverlayController } from '@/hooks/useIntroOverlay';

interface IntroOverlayProps {
  title: string;
  subtitle?: string;
  description?: string;
  controller: IntroOverlayController;
}

function AnimatedTitle({ title }: { title: string }) {
  const characters = useMemo(() => Array.from(title), [title]);

  return (
    <h1
      className="intro-overlay__title text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase"
      aria-label={title}
    >
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="intro-overlay__char"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          {character === ' ' ? '\u00A0' : character}
        </span>
      ))}
    </h1>
  );
}

export function IntroOverlay({ title, subtitle, description, controller }: IntroOverlayProps) {
  if (!controller.shouldRender) {
    return null;
  }

  return (
    <div
      className={`intro-overlay fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${controller.isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      role="presentation"
    >
      <div className="intro-overlay__backdrop" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
        <div className="intro-overlay__halo" aria-hidden="true" />
        <AnimatedTitle title={title} />
        {subtitle ? (
          <p className="text-sm sm:text-base tracking-[0.35em] uppercase text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
        {description ? (
          <p className="max-w-xl text-sm sm:text-base text-muted-foreground/90">
            {description}
          </p>
        ) : (
          <p className="max-w-xl text-sm sm:text-base text-muted-foreground/90">
            A breath of motion and light before the story unfolds.
          </p>
        )}
        <button
          type="button"
          onClick={controller.dismiss}
          className="intro-overlay__cta px-6 py-2 border border-border uppercase tracking-[0.3em] text-xs sm:text-sm"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

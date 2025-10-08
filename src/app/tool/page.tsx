import type { Metadata } from 'next';

import { ToolStackGrid } from '@/components/projects/ToolStackGrid';
import { TECHNOLOGIES, TOOL_STACK_GROUPS } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Tool Stack • NirussVn0',
  description:
    'My daily driver tool stack across front-end, back-end, data, and productivity workflows.',
};

export default function ToolPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-24 space-y-16">
        <section className="space-y-6">
          <div className="magnet-card border-dotted-thick border-border p-8 sm:p-10">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
              tool stack
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold uppercase">
              The systems behind the builds.
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Everything I rely on to architect, ship, and maintain projects—from interface craft to
              automation layers and the apps that keep me sharp.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <header>
            <h2 className="text-2xl font-semibold uppercase">Stacks by focus</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hover to explore the languages, frameworks, services, and tools that I reach for first.
            </p>
          </header>
          <ToolStackGrid toolStacks={TOOL_STACK_GROUPS} technologies={TECHNOLOGIES} />
        </section>
      </main>
    </div>
  );
}

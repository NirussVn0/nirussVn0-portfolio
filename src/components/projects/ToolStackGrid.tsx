'use client';

import {
  type Technology,
  type ToolStackGroup,
} from '@/lib/projects';
import { TechIcon } from '@/components/ui/TechIcon';
import { cn } from '@/lib/utils';

interface ToolStackGridProps {
  toolStacks: readonly ToolStackGroup[];
  technologies: readonly Technology[];
  className?: string;
}

export function ToolStackGrid({
  toolStacks,
  technologies,
  className,
}: ToolStackGridProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-2', className)}>
      {toolStacks.map((stack) => (
        <article
          key={stack.id}
          className="group magnet-card border-gradient-animated border-border p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-muted/50 hover:shadow-2xl"
        >
          <header className="mb-4 space-y-2">
            <h3 className="text-lg font-semibold uppercase tracking-wide">
              {stack.label}
            </h3>
            {stack.description ? (
              <p className="text-sm text-muted-foreground">{stack.description}</p>
            ) : null}
          </header>
          <div className="flex flex-wrap gap-3">
            {stack.technologyIds.map((techId) => {
              const tech = technologies.find((item) => item.id === techId);
              if (!tech) {
                return null;
              }
              return (
                <span
                  key={tech.id}
                  className="group/tool inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-all duration-300 hover:border-border hover:bg-foreground hover:text-background"
                >
                  <TechIcon
                    tech={tech.icon}
                    size="1.25em"
                    as="span"
                    unstyled
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-muted group-hover/tool:bg-background"
                    iconClassName="h-4 w-4"
                  />
                  <span>{tech.label}</span>
                </span>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}

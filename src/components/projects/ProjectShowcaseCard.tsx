import Image from 'next/image';
import Link from 'next/link';

import type { ReactNode } from 'react';

import type { Project, Technology } from '@/lib/projects';
import { TechIcon } from '@/components/ui/TechIcon';
import { cn } from '@/lib/utils';

interface ProjectShowcaseCardProps {
  project: Project;
  typeLabels: string[];
  technologies: Technology[];
  index?: number;
}

export function ProjectShowcaseCard({
  project,
  typeLabels,
  technologies,
  index = 0,
}: ProjectShowcaseCardProps) {
  const delay = `${120 + index * 80}ms`;

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/80',
        'magnet-card border-solid-animated transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-2xl',
      )}
      style={{ transitionDelay: delay }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-muted">
        <Image
          src={project.image}
          alt={`${project.title} cover`}
          fill
          sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={index < 2}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            <span>{project.date}</span>
            <div className="flex flex-wrap gap-2">
              {typeLabels.map((label) => (
                <span
                  key={`${project.id}-${label}`}
                  className="rounded-full border border-border px-3 py-1 text-[10px] tracking-[0.25em]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold uppercase leading-snug transition-transform duration-500 group-hover:-translate-y-1">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.excerpt}
            </p>
          </div>
        </div>

        {technologies.length ? (
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Stack
            </span>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={`${project.id}-${tech.id}`}
                  className="group/tech inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-all duration-300 hover:border-border hover:text-foreground"
                >
                  <TechIcon
                    tech={tech.icon}
                    size="1.2em"
                    as="span"
                    unstyled
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-muted group-hover/tech:bg-background"
                    iconClassName="h-4 w-4"
                  />
                  <span>{tech.label}</span>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {project.link ? (
            <ExternalLinkButton href={project.link} variant="primary">
              Live project
            </ExternalLinkButton>
          ) : null}
          {project.repo ? (
            <ExternalLinkButton href={project.repo} variant="secondary">
              Source code
            </ExternalLinkButton>
          ) : null}
        </div>
      </div>
    </article>
  );
}

interface ExternalLinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

function ExternalLinkButton({
  href,
  children,
  variant = 'primary',
}: ExternalLinkButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wide transition-all duration-300',
        isPrimary
          ? 'bg-foreground text-background hover:-translate-y-0.5 hover:shadow-lg'
          : 'bg-background text-muted-foreground hover:-translate-y-0.5 hover:bg-muted hover:text-foreground',
      )}
    >
      {children}
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </Link>
  );
}

'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';

import {
  type Project,
  resolveProjectTechnologies,
  resolveProjectTypeLabels,
} from '@/lib/projects';
import { cn } from '@/lib/utils';
import { TechIcon } from '@/components/ui/TechIcon';

interface ProjectCardProps {
  project: Project;
  index: number;
  activeSection: string;
}

const CARD_ANIMATION_CLASSES = [
  'magnet-card border-border p-6 h-full flex flex-col',
  'transition-[transform,opacity,shadow,background-color,color] duration-500',
  'ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform will-change-opacity',
  'opacity-0 translate-y-4',
  'data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0',
];

const CTA_ICON = (
  <svg
    className="h-4 w-4 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export function ProjectCard({
  project,
  index,
  activeSection,
}: ProjectCardProps) {
  const border =
    index % 3 === 0 ? 'border-zigzag-animated' : 'border-gradient-animated';
  const isActiveSection = activeSection === 'thoughts';
  const transitionDelay = isActiveSection ? `${150 + index * 90}ms` : '0ms';
  const preferredLink = project.link ?? project.repo ?? null;
  const actionLabel = project.link
    ? 'View live project'
    : project.repo
      ? 'View repository'
      : 'Case study coming soon';
  const isLinked = Boolean(preferredLink);
  const cardClasses = cn(
    'group rounded-xl',
    CARD_ANIMATION_CLASSES,
    isLinked &&
      'cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:bg-muted/60',
    !isLinked && 'cursor-default',
    border
  );

  const article = (
    <article
      className={cardClasses}
      data-inview={isActiveSection ? 'true' : undefined}
      style={{ transitionDelay }}
    >
      <div className="flex h-full flex-col gap-5">
        <ProjectMeta date={project.date} typeLabels={resolveProjectTypeLabels(project.typeIds)} />
        <ProjectHeading title={project.title} />
        <ProjectExcerpt excerpt={project.excerpt} />
        <ProjectTags techIds={project.techIds} />
        <ProjectCallToAction label={actionLabel}>
          {CTA_ICON}
        </ProjectCallToAction>
      </div>
    </article>
  );

  if (!isLinked) {
    return article;
  }

  return (
    <Link
      href={preferredLink ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {article}
    </Link>
  );
}

interface ProjectMetaProps {
  date: Project['date'];
  typeLabels: string[];
}

function ProjectMeta({ date, typeLabels }: ProjectMetaProps) {
  if (!date && !typeLabels.length) {
    return null;
  }

  const typeDisplay = typeLabels.join(' • ');

  return (
    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
      <span>{date}</span>
      {typeDisplay ? <span className="text-right">{typeDisplay}</span> : <span aria-hidden="true" />}
    </div>
  );
}

interface ProjectHeadingProps {
  title: Project['title'];
}

function ProjectHeading({ title }: ProjectHeadingProps) {
  return (
    <h3 className="text-lg font-bold transition-[color,transform,text-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xl group-hover:-translate-y-0.5 group-hover:text-foreground">
      {title}
    </h3>
  );
}

interface ProjectExcerptProps {
  excerpt: Project['excerpt'];
}

function ProjectExcerpt({ excerpt }: ProjectExcerptProps) {
  return <p className="leading-relaxed text-muted-foreground">{excerpt}</p>;
}

function ProjectTags({ techIds }: { techIds: Project['techIds'] }) {
  const technologies = resolveProjectTechnologies(techIds);
  if (!technologies.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2 text-xs">
      {technologies.map((tech) => (
        <li
          key={tech.id}
          className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300 group-hover:border-border group-hover:text-foreground"
        >
          <TechIcon
            tech={tech.icon}
            size="1em"
            as="span"
            unstyled
            className="flex h-4 w-4 items-center justify-center"
            iconClassName="h-4 w-4"
          />
          <span>{tech.label}</span>
        </li>
      ))}
    </ul>
  );
}

interface ProjectCallToActionProps {
  label: string;
  children: ReactNode;
}

function ProjectCallToAction({ label, children }: ProjectCallToActionProps) {
  return (
    <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground">
      <span>{label}</span>
      {children}
    </div>
  );
}

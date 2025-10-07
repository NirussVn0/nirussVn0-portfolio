'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';

import { Projects } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TechIcon } from '@/components/ui/TechIcon';

interface ProjectCardProps {
  project: Projects;
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
  const isLinked = Boolean(project.link);
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
        <ProjectMeta date={project.date} types={project.types} />
        <ProjectHeading title={project.title} />
        <ProjectExcerpt excerpt={project.excerpt} />
        <ProjectTags tags={project.tags} />
        <ProjectCallToAction label={isLinked ? 'View project' : 'Read more'}>
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
      href={project.link ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {article}
    </Link>
  );
}

interface ProjectMetaProps {
  date: Projects['date'];
  types: Projects['types'];
}

function ProjectMeta({ date, types }: ProjectMetaProps) {
  if (!date && !types) {
    return null;
  }

  return (
    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
      <span>{date}</span>
      {types ? <span>{types}</span> : <span aria-hidden="true" />}
    </div>
  );
}

interface ProjectHeadingProps {
  title: Projects['title'];
}

function ProjectHeading({ title }: ProjectHeadingProps) {
  return (
    <h3 className="text-lg font-bold transition-[color,transform,text-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xl group-hover:-translate-y-0.5 group-hover:text-foreground">
      {title}
    </h3>
  );
}

interface ProjectExcerptProps {
  excerpt: Projects['excerpt'];
}

function ProjectExcerpt({ excerpt }: ProjectExcerptProps) {
  return <p className="leading-relaxed text-muted-foreground">{excerpt}</p>;
}

interface ProjectTagsProps {
  tags?: Projects['tags'];
}

function ProjectTags({ tags }: ProjectTagsProps) {
  if (!tags?.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2 text-xs">
      {tags.map((tag) => (
        <li
          key={tag}
          className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300 group-hover:border-border group-hover:text-foreground"
        >
          <TechIcon
            tech={tag}
            size="1em"
            as="span"
            unstyled
            className="flex h-4 w-4 items-center justify-center"
            iconClassName="h-4 w-4"
          />
          <span>{tag}</span>
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

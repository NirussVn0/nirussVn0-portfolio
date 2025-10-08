'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import {
  type Project,
  type ProjectType,
  type ProjectTypeId,
  type Technology,
  type ToolStackGroup,
  resolveProjectTechnologies,
  resolveProjectTypeLabels,
} from '@/lib/projects';
import { cn } from '@/lib/utils';
import { ProjectShowcaseCard } from '@/components/projects/ProjectShowcaseCard';
import { ToolStackGrid } from '@/components/projects/ToolStackGrid';
import { TechIcon } from '@/components/ui/TechIcon';

interface ProjectCatalogProps {
  projects: readonly Project[];
  projectTypes: readonly ProjectType[];
  technologies: readonly Technology[];
  toolStacks: readonly ToolStackGroup[];
}

type TypeFilter = ProjectTypeId | 'all';

export function ProjectCatalog({
  projects,
  projectTypes,
  technologies,
  toolStacks,
}: ProjectCatalogProps) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [techFilter, setTechFilter] = useState<string | null>(null);

  const typeOptions = useMemo(
    () => [
      { id: 'all' as TypeFilter, label: 'All Projects' },
      ...projectTypes.map((type) => ({ id: type.id as TypeFilter, label: type.label })),
    ],
    [projectTypes],
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType =
        typeFilter === 'all' || project.typeIds.includes(typeFilter as ProjectTypeId);
      const matchesTech = !techFilter || project.techIds.includes(techFilter);
      return matchesType && matchesTech;
    });
  }, [projects, techFilter, typeFilter]);

  const resetFilters = () => {
    setTypeFilter('all');
    setTechFilter(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-24 space-y-20">
        <header className="space-y-8">
          <div className="magnet-card border-dotted-thick border-border p-8 sm:p-10 lg:p-12 space-y-6 text-left">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
                project matrix
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold uppercase leading-tight">
                Explore my build log.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Filter by project type or the languages and tools that power them. Each card includes
                a dedicated cover plus the stack, so you can quickly jump into the live build or
                inspect the repository.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {projects.length} projects tracked • {filteredProjects.length} visible
            </div>
          </div>
        </header>

        <section className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold uppercase">Tool Stack</h2>
            <ToolStackGrid toolStacks={toolStacks} technologies={technologies} />
          </div>

          <div className="space-y-8">
            <div className="magnet-card border-wave-animated border-border p-6 space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold uppercase">Filter Projects</h2>
                  <p className="text-sm text-muted-foreground">
                    Narrow down by project type or jump straight to a language or tool.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wide transition-all duration-300',
                    typeFilter === 'all' && !techFilter
                      ? 'cursor-default bg-muted text-muted-foreground'
                      : 'hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-lg',
                  )}
                  disabled={typeFilter === 'all' && !techFilter}
                >
                  Reset filters
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8 8 0 104.582 9M4 4l5 5"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                <span className="block text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  Project Type
                </span>
                <div className="flex flex-wrap gap-3">
                  {typeOptions.map((option) => {
                    const isActive = option.id === typeFilter;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setTypeFilter(option.id)}
                        className={cn(
                          'rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wide transition-all duration-300',
                          isActive
                            ? 'bg-foreground text-background shadow-lg'
                            : 'bg-background text-muted-foreground hover:-translate-y-0.5 hover:bg-muted hover:text-foreground',
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5">
                <span className="block text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  Language & Tools
                </span>
                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech) => {
                    const isActive = techFilter === tech.id;
                    return (
                      <button
                        key={tech.id}
                        type="button"
                        onClick={() => setTechFilter(isActive ? null : tech.id)}
                        className={cn(
                          'group inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs uppercase tracking-wide transition-all duration-300',
                          isActive
                            ? 'bg-foreground text-background shadow-lg'
                            : 'bg-background text-muted-foreground hover:-translate-y-0.5 hover:bg-muted hover:text-foreground',
                        )}
                        title={`Filter by ${tech.label}`}
                      >
                        <TechIcon
                          tech={tech.icon}
                          size="1.1em"
                          as="span"
                          unstyled
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-muted group-hover:bg-background"
                          iconClassName="h-4 w-4"
                        />
                        <span>{tech.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold uppercase">Projects</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} project
              {filteredProjects.length === 1 ? '' : 's'} that match your filters.
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="magnet-card border-dotted-thick border-border p-10 text-center text-sm text-muted-foreground">
              No projects match the selected filters yet. Try a different combination or{' '}
              <Link href="/#connect" className="underline underline-offset-4">
                drop me a message
              </Link>
              .
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-10 md:grid-cols-2">
              {filteredProjects.map((project, index) => {
                const typeLabels = resolveProjectTypeLabels(project.typeIds);
                const techStack = resolveProjectTechnologies(project.techIds);
                return (
                  <ProjectShowcaseCard
                    key={project.id}
                    project={project}
                    typeLabels={typeLabels}
                    technologies={techStack}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

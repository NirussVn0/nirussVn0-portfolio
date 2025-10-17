'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import type { ProjectSnapshot } from '@/domain/projects/Project';
import { createProjectControllers } from '@/modules/projects/ProjectModule';

interface ProjectSectionProps {
  activeSection: string;
  sectionRef: (el: HTMLElement | null) => void;
}

const SECTION_ID = 'project';
const FEATURE_COUNT = 3;

export function ProjectSection({
  activeSection,
  sectionRef,
}: ProjectSectionProps) {
  const [featuredProjects, setFeaturedProjects] = useState<ProjectSnapshot[]>([]);

  const { refresh: refreshController } = useMemo(() => createProjectControllers(), []);

  useEffect(() => {
    let isMounted = true;

    void refreshController.initialLoad().then((catalog) => {
      if (!isMounted) {
        return;
      }

      setFeaturedProjects(catalog.projects.slice(0, FEATURE_COUNT));
    });

    return () => {
      isMounted = false;
    };
  }, [refreshController]);

  const isActiveSection = activeSection === SECTION_ID;

  return (
    <section
      id={SECTION_ID}
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div
          className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
          data-inview={isActiveSection ? 'true' : undefined}
          style={{
            transitionDelay: isActiveSection ? '80ms' : '0ms',
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Project Hypergrid
              </h2>
              <p className="max-w-xl text-sm text-muted-foreground">
                Enter the dedicated project space to explore full case studies,
                tag-driven filtering, and the entire stack powering each build.
              </p>
            </div>
            <Link
              href="/project"
              className="inline-flex items-center gap-3 border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
            >
              Enter Matrix
              <svg
                className="h-4 w-4"
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
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <FeatureCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  project: ProjectSnapshot;
}

function FeatureCard({ project }: FeatureCardProps) {
  return (
    <article className="magnet-card flex h-full flex-col gap-4 border-pulse-animated border-border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
        <span>{project.date}</span>
        <span>{project.categories[0]?.label ?? 'Project'}</span>
      </div>
      <h3 className="text-lg font-semibold uppercase tracking-[0.3em]">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground">{project.summary}</p>
      <div className="mt-auto flex flex-wrap gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        {project.languages.slice(0, 3).map((language) => (
          <span
            key={language.slug}
            className="rounded-full border border-border px-3 py-1"
          >
            {language.label}
          </span>
        ))}
        {project.languages.length > 3 ? (
          <span className="rounded-full border border-border px-3 py-1">
            +{project.languages.length - 3}
          </span>
        ) : null}
      </div>
    </article>
  );
}

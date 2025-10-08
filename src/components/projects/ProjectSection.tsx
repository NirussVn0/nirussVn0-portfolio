'use client';

import Link from 'next/link';

import { FEATURED_PROJECTS, PROJECTS } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface ProjectSectionProps {
  activeSection: string;
  sectionRef: (el: HTMLElement | null) => void;
}

const SECTION_ID = 'thoughts';

export function ProjectSection({
  activeSection,
  sectionRef,
}: ProjectSectionProps) {
  const isActiveSection = activeSection === SECTION_ID;
  const projects = (FEATURED_PROJECTS.length ? FEATURED_PROJECTS : PROJECTS).slice(
    0,
    4,
  );

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Featured Projects
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                A quick glimpse at work I&apos;m most proud of right now.
                Explore the full matrix to browse every build, filter by stack,
                and discover the story behind each project.
              </p>
            </div>
            <Link
              href="/project"
              className="inline-flex items-center gap-2 self-start rounded-full border border-dotted border-border px-5 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-2xl"
            >
              View all projects
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

        <div className="auto-rows-fr grid gap-6 sm:gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${project.date}`}
              project={project}
              index={index}
              activeSection={activeSection}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

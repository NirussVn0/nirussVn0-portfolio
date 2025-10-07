'use client';

import { PROJECTS } from '@/lib/constants';
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
          <h2 className="text-3xl sm:text-4xl font-bold uppercase">
            Thoughts Project
          </h2>
        </div>

        <div className="auto-rows-fr grid gap-6 sm:gap-8 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
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

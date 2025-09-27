'use client';

import { ARTICLES } from '@/lib/constants';
import { ArticleCard } from '@/components/thoughts/ArticleCard';

interface ThoughtsSectionProps {
  activeSection: string;
  sectionRef: (el: HTMLElement | null) => void;
}

export function ThoughtsSection({ activeSection, sectionRef }: ThoughtsSectionProps) {
  return (
    <section
      id="thoughts"
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div
          className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
          data-inview={activeSection === 'thoughts' ? 'true' : undefined}
          style={{
            transitionDelay: activeSection === 'thoughts' ? '80ms' : '0ms',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold uppercase">
            Thoughts Project
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {ARTICLES.map((post, index) => (
            <ArticleCard 
              key={index} 
              post={post} 
              index={index} 
              activeSection={activeSection} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
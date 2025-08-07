'use client';

import { useEffect, useRef } from 'react';
import { AnimationController } from '@/lib/animations';
import { Icon } from '@/components/icons';

export class TechStackSection {
  private animationController: AnimationController;

  constructor() {
    this.animationController = new AnimationController();
  }

  initializeAnimations(container: HTMLElement) {
    this.animationController.fadeIn('.tech-title', 0, 1000);
    this.animationController.staggeredReveal('.tech-category', 300);
    this.animationController.staggeredReveal('.tech-item', 600);
  }

  setupHoverEffects() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item) => {
      const hoverEffect = this.animationController.hoverEffect(item);
      
      item.addEventListener('mouseenter', hoverEffect.enter);
      item.addEventListener('mouseleave', hoverEffect.leave);
    });
  }

  cleanup() {
    this.animationController.cleanup();
  }
}

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const techStackSectionRef = useRef<TechStackSection | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    techStackSectionRef.current = new TechStackSection();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && techStackSectionRef.current) {
            techStackSectionRef.current.initializeAnimations(entry.target as HTMLElement);
            setTimeout(() => {
              if (techStackSectionRef.current) {
                techStackSectionRef.current.setupHoverEffects();
              }
            }, 1000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (techStackSectionRef.current) {
        techStackSectionRef.current.cleanup();
      }
      observer.disconnect();
    };
  }, []);

  const techCategories = [
    {
      title: 'Frontend',
      icon: 'palette',
      technologies: [
        { name: 'React', icon: 'react', color: 'from-primary-400 to-primary-600' },
        { name: 'Next.js', icon: 'nextjs', color: 'from-gray-700 to-black' },
        { name: 'TypeScript', icon: 'typescript', color: 'from-primary-500 to-primary-700' },
        { name: 'Tailwind CSS', icon: 'tailwind', color: 'from-accent-400 to-accent-600' },
        { name: 'Vue.js', icon: 'vue', color: 'from-success-400 to-success-600' },
        { name: 'Angular', icon: 'angular', color: 'from-error-500 to-error-700' },
      ],
    },
    {
      title: 'Backend',
      icon: 'code',
      technologies: [
        { name: 'Node.js', icon: 'nodejs', color: 'from-success-500 to-success-700' },
        { name: 'Python', icon: 'python', color: 'from-warning-400 to-warning-600' },
        { name: 'Express.js', icon: 'rocket', color: 'from-gray-600 to-gray-800' },
        { name: 'FastAPI', icon: 'rocket', color: 'from-accent-400 to-accent-600' },
        { name: 'GraphQL', icon: 'external', color: 'from-secondary-400 to-secondary-600' },
        { name: 'REST API', icon: 'external', color: 'from-primary-400 to-primary-600' },
      ],
    },
    {
      title: 'Database',
      icon: 'database',
      technologies: [
        { name: 'PostgreSQL', icon: 'postgresql', color: 'from-primary-600 to-primary-800' },
        { name: 'MongoDB', icon: 'mongodb', color: 'from-success-600 to-success-800' },
        { name: 'Redis', icon: 'database', color: 'from-error-400 to-error-600' },
        { name: 'MySQL', icon: 'database', color: 'from-warning-400 to-warning-600' },
        { name: 'Supabase', icon: 'database', color: 'from-accent-400 to-accent-600' },
        { name: 'Firebase', icon: 'database', color: 'from-warning-500 to-warning-600' },
      ],
    },
    {
      title: 'DevOps & Tools',
      icon: 'code',
      technologies: [
        { name: 'Docker', icon: 'docker', color: 'from-primary-400 to-primary-600' },
        { name: 'AWS', icon: 'aws', color: 'from-warning-400 to-warning-600' },
        { name: 'Vercel', icon: 'external', color: 'from-gray-700 to-black' },
        { name: 'Git', icon: 'github', color: 'from-warning-500 to-error-500' },
        { name: 'GitHub Actions', icon: 'github', color: 'from-gray-600 to-gray-800' },
        { name: 'Kubernetes', icon: 'code', color: 'from-primary-500 to-secondary-500' },
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="tech-title opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tech Stack & Workflow
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build 
            scalable, high-performance applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="tech-category opacity-0"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-8">
                  <div className="mr-4">
                    <Icon
                      name={category.icon}
                      size={32}
                      className="text-white"
                      hover={true}
                      hoverScale={1.1}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={tech.name}
                      className="tech-item opacity-0 group cursor-pointer"
                    >
                      <div className={`bg-gradient-to-br ${tech.color} p-4 rounded-xl text-white text-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/20`}>
                        <div className="mb-2 flex justify-center">
                          <Icon
                            name={tech.icon}
                            size={24}
                            className="text-white"
                            hover={true}
                            hoverScale={1.15}
                            hoverRotate={5}
                          />
                        </div>
                        <div className="text-sm font-medium">{tech.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="tech-category opacity-0">
            <h3 className="text-3xl font-bold text-white mb-8">My Development Workflow</h3>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { step: '01', title: 'Planning', icon: 'clipboard', description: 'Requirements analysis and architecture design' },
                { step: '02', title: 'Development', icon: 'laptop', description: 'Clean code with TDD and best practices' },
                { step: '03', title: 'Testing', icon: 'beaker', description: 'Comprehensive testing and quality assurance' },
                { step: '04', title: 'Deployment', icon: 'deploy', description: 'CI/CD pipeline and production deployment' },
              ].map((workflow, index) => (
                <div
                  key={workflow.step}
                  className="tech-item opacity-0 text-center group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                    <div className="mb-4 flex justify-center">
                      <Icon
                        name={workflow.icon}
                        size={32}
                        className="text-white"
                        hover={true}
                        hoverScale={1.1}
                        hoverRotate={3}
                      />
                    </div>
                    <div className="text-primary-400 font-bold text-sm mb-2">{workflow.step}</div>
                    <h4 className="text-white font-semibold mb-2">{workflow.title}</h4>
                    <p className="text-gray-300 text-sm">{workflow.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

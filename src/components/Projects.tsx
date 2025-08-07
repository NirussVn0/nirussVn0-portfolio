'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimationController } from '@/lib/animations';
import { Icon } from '@/components/icons';

export class ProjectsSection {
  private animationController: AnimationController;

  constructor() {
    this.animationController = new AnimationController();
  }

  initializeAnimations(container: HTMLElement) {
    this.animationController.fadeIn('.projects-title', 0, 1000);
    this.animationController.staggeredReveal('.project-card', 300);
  }

  setupHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      const hoverEffect = this.animationController.hoverEffect(card);
      
      card.addEventListener('mouseenter', hoverEffect.enter);
      card.addEventListener('mouseleave', hoverEffect.leave);
    });
  }

  cleanup() {
    this.animationController.cleanup();
  }
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<ProjectsSection | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    projectsSectionRef.current = new ProjectsSection();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && projectsSectionRef.current) {
            projectsSectionRef.current.initializeAnimations(entry.target as HTMLElement);
            setTimeout(() => {
              if (projectsSectionRef.current) {
                projectsSectionRef.current.setupHoverEffects();
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
      if (projectsSectionRef.current) {
        projectsSectionRef.current.cleanup();
      }
      observer.disconnect();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Full Stack',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Socket.io.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Web App',
      featured: true,
    },
    {
      id: 3,
      title: 'AI-Powered Analytics Dashboard',
      description: 'An intelligent analytics dashboard that provides insights using machine learning algorithms. Features data visualization, predictive analytics, and automated reporting.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'FastAPI', 'React', 'TensorFlow', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'AI/ML',
      featured: true,
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      description: 'A secure mobile banking application with biometric authentication, transaction history, and real-time notifications. Built with React Native and secure backend APIs.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Node.js', 'JWT', 'MongoDB', 'Push Notifications'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Mobile',
      featured: false,
    },
    {
      id: 5,
      title: 'Social Media Platform',
      description: 'A modern social media platform with real-time messaging, content sharing, and social interactions. Features include posts, stories, and live chat functionality.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Node.js', 'GraphQL', 'Redis', 'AWS S3'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Social',
      featured: false,
    },
    {
      id: 6,
      title: 'DevOps Monitoring Tool',
      description: 'A comprehensive monitoring and alerting system for DevOps teams. Includes server monitoring, log aggregation, and automated incident response.',
      image: '/api/placeholder/600/400',
      technologies: ['Go', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'DevOps',
      featured: false,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="projects-title opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise in modern web technologies, 
            clean architecture, and user-centered design.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card opacity-0 group cursor-pointer ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                    <Icon
                      name="rocket"
                      size={64}
                      className="text-white opacity-50"
                      hover={true}
                      hoverScale={1.1}
                      hoverRotate={5}
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-xs font-medium rounded-full text-gray-800 dark:text-gray-200">
                      {project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-warning-400 text-warning-900 text-xs font-bold rounded-full flex items-center gap-1">
                        <Icon
                          name="star"
                          size={12}
                          className="text-warning-900"
                          hover={true}
                          hoverScale={1.2}
                        />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      <Icon name="external" size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-center py-2 px-4 rounded-lg font-medium hover:border-primary-500 hover:text-primary-500 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      <Icon name="github" size={16} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="projects-title opacity-0">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Want to see more projects?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              These are just a few highlights from my portfolio. I have many more projects 
              showcasing different technologies and problem-solving approaches.
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105">
              <span className="relative z-10">View All Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

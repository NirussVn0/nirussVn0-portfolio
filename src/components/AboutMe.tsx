'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimationController } from '@/lib/animations';

export class AboutMeSection {
  private animationController: AnimationController;

  constructor() {
    this.animationController = new AnimationController();
  }

  initializeAnimations(container: HTMLElement) {
    this.animationController.fadeIn('.about-title', 0, 1000);
    this.animationController.staggeredReveal('.about-text', 300);
    this.animationController.slideIn('.about-image', 'left', 600);
    this.animationController.staggeredReveal('.skill-item', 900);
  }

  cleanup() {
    this.animationController.cleanup();
  }
}

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<AboutMeSection | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    aboutSectionRef.current = new AboutMeSection();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && aboutSectionRef.current) {
            aboutSectionRef.current.initializeAnimations(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (aboutSectionRef.current) {
        aboutSectionRef.current.cleanup();
      }
      observer.disconnect();
    };
  }, []);

  const skills = [
    { name: 'React/Next.js', level: 95, icon: '⚛️' },
    { name: 'TypeScript', level: 90, icon: '📘' },
    { name: 'Node.js', level: 88, icon: '🟢' },
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'PostgreSQL', level: 82, icon: '🐘' },
    { name: 'Docker', level: 80, icon: '🐳' },
    { name: 'AWS', level: 78, icon: '☁️' },
    { name: 'GraphQL', level: 75, icon: '🔗' },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="about-title opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="about-image opacity-0 transform translate-x-[-100px]">
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="text-8xl">👨‍💻</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                ⭐
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-xl animate-pulse">
                🚀
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="about-text opacity-0">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                fullstack developer
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating 
                scalable, high-performance applications using modern technologies. My passion 
                lies in crafting clean, maintainable code and delivering exceptional user experiences.
              </p>
            </div>

            <div className="about-text opacity-0">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I believe in the power of continuous learning and staying up-to-date with the 
                latest industry trends. When I'm not coding, you can find me contributing to 
                open-source projects, mentoring junior developers, or exploring new technologies.
              </p>
            </div>

            <div className="about-text opacity-0">
              <div className="flex flex-wrap gap-3 mt-6">
                {['Problem Solving', 'Team Leadership', 'Agile/Scrum', 'Code Review'].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-item opacity-0 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                    {skill.name}
                  </h4>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 block">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="about-text opacity-0">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on challenging projects and collaborate with 
              talented teams. Let's discuss how we can bring your ideas to life.
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { AnimationController } from '@/lib/animations';

export class RoadmapSection {
  private animationController: AnimationController;

  constructor() {
    this.animationController = new AnimationController();
  }

  initializeAnimations(container: HTMLElement) {
    this.animationController.fadeIn('.roadmap-title', 0, 1000);
    this.animationController.staggeredReveal('.timeline-item', 300);
    this.animationController.slideIn('.timeline-line', 'left', 600);
  }

  cleanup() {
    this.animationController.cleanup();
  }
}

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapSectionRef = useRef<RoadmapSection | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    roadmapSectionRef.current = new RoadmapSection();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && roadmapSectionRef.current) {
            roadmapSectionRef.current.initializeAnimations(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (roadmapSectionRef.current) {
        roadmapSectionRef.current.cleanup();
      }
      observer.disconnect();
    };
  }, []);

  const milestones = [
    {
      year: '2024',
      title: 'Senior Fullstack Developer',
      company: 'Tech Innovation Corp',
      description: 'Leading development of scalable web applications using Next.js, TypeScript, and cloud technologies. Mentoring junior developers and architecting microservices solutions.',
      achievements: [
        'Led team of 5 developers',
        'Reduced app load time by 60%',
        'Implemented CI/CD pipeline',
        'Mentored 3 junior developers'
      ],
      icon: '🚀',
      color: 'from-blue-500 to-purple-600',
      current: true,
    },
    {
      year: '2022',
      title: 'Fullstack Developer',
      company: 'Digital Solutions Ltd',
      description: 'Developed and maintained multiple client projects using React, Node.js, and PostgreSQL. Collaborated with design teams to create responsive user interfaces.',
      achievements: [
        'Built 15+ client projects',
        'Improved code coverage to 90%',
        'Optimized database queries',
        'Implemented real-time features'
      ],
      icon: '💻',
      color: 'from-green-500 to-blue-500',
      current: false,
    },
    {
      year: '2020',
      title: 'Frontend Developer',
      company: 'Creative Web Agency',
      description: 'Specialized in creating interactive and responsive web applications using React and Vue.js. Worked closely with UX/UI designers to implement pixel-perfect designs.',
      achievements: [
        'Delivered 20+ responsive websites',
        'Mastered modern CSS frameworks',
        'Implemented accessibility standards',
        'Collaborated with design team'
      ],
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      current: false,
    },
    {
      year: '2019',
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      description: 'Started my professional journey learning modern web technologies. Contributed to various projects while building foundational skills in JavaScript and React.',
      achievements: [
        'Learned React and Node.js',
        'Built first production app',
        'Contributed to open source',
        'Completed coding bootcamp'
      ],
      icon: '🌱',
      color: 'from-yellow-500 to-orange-500',
      current: false,
    },
  ];

  const futureGoals = [
    {
      title: 'Technical Leadership',
      description: 'Advance to technical leadership roles, guiding architecture decisions and team development.',
      icon: '👑',
    },
    {
      title: 'Open Source Contribution',
      description: 'Contribute more actively to open source projects and maintain popular libraries.',
      icon: '🌍',
    },
    {
      title: 'AI/ML Integration',
      description: 'Deepen expertise in AI/ML technologies and integrate them into web applications.',
      icon: '🤖',
    },
    {
      title: 'Mentorship Program',
      description: 'Establish a mentorship program to help aspiring developers enter the tech industry.',
      icon: '🎓',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="roadmap-title opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Career Roadmap
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            My journey through the world of software development, from junior developer 
            to senior fullstack engineer, and the exciting path ahead.
          </p>
        </div>

        <div className="relative">
          <div className="timeline-line opacity-0 absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600 h-full"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`timeline-item opacity-0 flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative">
                    {milestone.current && (
                      <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                        Current
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center text-2xl`}>
                        {milestone.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                        <p className="text-blue-400 font-medium">{milestone.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {milestone.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {milestone.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg`}>
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                </div>

                <div className="flex-1 md:block hidden"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="roadmap-title opacity-0">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">
              Future Goals & Aspirations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {futureGoals.map((goal, index) => (
                <div
                  key={goal.title}
                  className="timeline-item opacity-0 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {goal.icon}
                  </div>
                  <h4 className="text-white font-semibold mb-3">{goal.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="roadmap-title opacity-0">
            <h3 className="text-2xl font-bold text-white mb-6">
              Ready to Build the Future Together?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always excited about new challenges and opportunities to grow. 
              Let's connect and create something amazing together.
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              <span className="relative z-10">Let's Connect</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

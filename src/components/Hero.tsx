'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimationController, CursorTrail } from '@/lib/animations';

export class HeroSection {
  private animationController: AnimationController;
  private cursorTrail: CursorTrail | null = null;

  constructor() {
    this.animationController = new AnimationController();
  }

  initializeAnimations(container: HTMLElement) {
    this.animationController.fadeIn('.hero-title', 0, 1200);
    this.animationController.fadeIn('.hero-subtitle', 300, 1000);
    this.animationController.slideIn('.hero-cta', 'left', 600);
    this.animationController.staggeredReveal('.hero-social', 900);
  }

  initializeCursorTrail(container: HTMLElement) {
    this.cursorTrail = new CursorTrail(container);
  }

  cleanup() {
    this.animationController.cleanup();
    if (this.cursorTrail) {
      this.cursorTrail.destroy();
    }
  }
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HeroSection | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    heroSectionRef.current = new HeroSection();
    heroSectionRef.current.initializeAnimations(containerRef.current);
    heroSectionRef.current.initializeCursorTrail(containerRef.current);

    return () => {
      if (heroSectionRef.current) {
        heroSectionRef.current.cleanup();
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform -rotate-12 scale-150"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="hero-title opacity-0">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Senior{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Fullstack
            </span>
            <br />
            Developer
          </h1>
        </div>

        <div className="hero-subtitle opacity-0">
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with modern technologies,
            clean code, and innovative solutions.
          </p>
        </div>

        <div className="hero-cta opacity-0 transform translate-x-[-100px]">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-8 py-4 border-2 border-gray-400 text-gray-300 font-semibold rounded-full transition-all duration-300 hover:border-white hover:text-white hover:shadow-lg hover:shadow-white/10">
              Get In Touch
            </button>
          </div>
        </div>

        <div className="hero-social opacity-0">
          <div className="flex justify-center space-x-6">
            {[
              { name: 'GitHub', icon: '🔗' },
              { name: 'LinkedIn', icon: '💼' },
              { name: 'Twitter', icon: '🐦' },
              { name: 'Email', icon: '📧' },
            ].map((social, index) => (
              <a
                key={social.name}
                href="#"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:rotate-12"
                aria-label={social.name}
              >
                <span className="text-xl">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  );
}

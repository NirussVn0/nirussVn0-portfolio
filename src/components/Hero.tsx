'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimationController, CursorTrail } from '@/lib/animations';
import { AdvancedAnimationController } from '@/lib/advanced-animations';
import { TimelineAnimationSystem } from '@/lib/timeline-animations';
import { performanceOptimizer } from '@/lib/performance-optimizer';
import { Icon } from '@/components/icons';
import { TextReveal, AnimatedHeading } from '@/components/TextAnimations';
import { Magnetic, Parallax, CursorFollower, InteractiveButton } from '@/components/MouseInteractions';
import { DecorativeLine } from '@/components/SVGAnimations';

export class HeroSection {
  private animationController: AnimationController;
  private advancedController: AdvancedAnimationController;
  private timelineSystem: TimelineAnimationSystem;
  private cursorTrail: CursorTrail | null = null;

  constructor() {
    this.animationController = new AnimationController();
    this.advancedController = new AdvancedAnimationController();
    this.timelineSystem = new TimelineAnimationSystem();
  }

  initializeAnimations(container: HTMLElement) {
    if (!performanceOptimizer.shouldAnimate()) {
      return;
    }

    // Create a sophisticated timeline sequence
    const heroTimeline = this.timelineSystem.createSequentialTimeline([
      {
        target: '.hero-background',
        properties: { opacity: [0, 1], scale: [1.1, 1] },
        duration: 1500,
        ease: 'outExpo'
      },
      {
        target: '.hero-title',
        properties: { opacity: [0, 1], translateY: [50, 0] },
        duration: 1200,
        delay: 300,
        ease: 'outExpo'
      },
      {
        target: '.hero-subtitle',
        properties: { opacity: [0, 1], translateY: [30, 0] },
        duration: 1000,
        delay: 600,
        ease: 'outExpo'
      },
      {
        target: '.hero-cta',
        properties: { opacity: [0, 1], translateY: [20, 0], scale: [0.9, 1] },
        duration: 800,
        delay: 900,
        ease: 'outBack'
      },
      {
        target: '.hero-social',
        properties: { opacity: [0, 1], translateY: [20, 0] },
        duration: 600,
        delay: 1200,
        ease: 'outExpo'
      }
    ], {
      onBegin: () => console.log('Hero animation sequence started'),
      onComplete: () => console.log('Hero animation sequence completed'),
      onStepComplete: (step) => console.log(`Hero step ${step} completed`)
    });

    heroTimeline.play();

    // Add scroll-triggered animations for elements that come into view
    this.advancedController.createScrollTrigger('.hero-decorative', () => {
      this.advancedController.createDrawableAnimation('.hero-line', {
        duration: 2000,
        drawDirection: 'forward'
      });
    });
  }

  initializeCursorTrail(container: HTMLElement) {
    this.cursorTrail = new CursorTrail(container);
  }

  cleanup() {
    this.animationController.cleanup();
    this.advancedController.cleanup();
    this.timelineSystem.cleanup();
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
    <>
      <CursorFollower
        size={24}
        color="rgba(59, 130, 246, 0.6)"
        blur={2}
        mixBlendMode="difference"
      />

      <section
        ref={containerRef}
        className="hero-background relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 opacity-0"
      >
        <div className="absolute inset-0 opacity-20">
          <Parallax strength={0.02} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12 scale-150"></div>
          </Parallax>
          <Parallax strength={0.03} reverse className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform -rotate-12 scale-150"></div>
          </Parallax>
        </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="hero-title opacity-0">
          <AnimatedHeading
            level={1}
            effect="reveal"
            duration={1200}
            delay={300}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Senior Fullstack Developer
          </AnimatedHeading>
        </div>

        <div className="hero-subtitle opacity-0">
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            <TextReveal
              splitBy="words"
              staggerDelay={80}
              animateFrom="center"
              delay={600}
              duration={800}
            >
              Crafting exceptional digital experiences with modern technologies, clean code, and innovative solutions.
            </TextReveal>
          </p>
        </div>

        {/* Decorative Line */}
        <div className="hero-decorative opacity-0 mb-8">
          <DecorativeLine
            pattern="wavy"
            width={200}
            height={4}
            className="mx-auto text-primary-400"
            trigger="scroll"
            duration={1500}
            delay={1000}
          />
        </div>

        <div className="hero-cta opacity-0 transform translate-x-[-100px]">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Magnetic strength={0.3} radius={120}>
              <InteractiveButton
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-semibold rounded-full"
                magneticStrength={0.2}
                rippleColor="rgba(255, 255, 255, 0.3)"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon name="rocket" size={18} />
                  View My Work
                </span>
              </InteractiveButton>
            </Magnetic>

            <Magnetic strength={0.2} radius={100}>
              <InteractiveButton
                className="px-8 py-4 border-2 border-gray-400 text-gray-300 font-semibold rounded-full hover:border-white hover:text-white"
                magneticStrength={0.15}
                rippleColor="rgba(255, 255, 255, 0.2)"
              >
                <span className="flex items-center gap-2">
                  <Icon name="email" size={18} />
                  Get In Touch
                </span>
              </InteractiveButton>
            </Magnetic>
          </div>
        </div>

        <div className="hero-social opacity-0">
          <div className="flex justify-center space-x-6">
            {[
              { name: 'GitHub', icon: 'github', href: 'https://github.com/NirussVn0' },
              { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/niruss-dev' },
              { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com/niruss_dev' },
              { name: 'Email', icon: 'email', href: 'mailto:hello@niruss.dev' },
            ].map((social, index) => (
              <Magnetic key={social.name} strength={0.4} radius={60}>
                <a
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="group w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:scale-110 hover:rotate-12 border border-white/20 hover:border-white/40"
                  aria-label={social.name}
                >
                  <Icon
                    name={social.icon}
                    size={20}
                    hover={true}
                    hoverScale={1.2}
                    hoverRotate={12}
                    className="transition-all duration-300"
                  />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>

      <Magnetic strength={0.2} radius={80}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </Magnetic>

      <Parallax strength={0.05} className="absolute top-20 left-20">
        <div className="w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </Parallax>
      <Parallax strength={0.03} reverse className="absolute bottom-20 right-20">
        <div className="w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </Parallax>
    </section>
    </>
  );
}

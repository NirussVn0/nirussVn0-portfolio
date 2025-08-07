import { animate, stagger, timeline, utils } from 'animejs';

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
  loop?: boolean | number;
  autoplay?: boolean;
}

export interface TextAnimationOptions extends AnimationOptions {
  splitBy?: 'chars' | 'words' | 'lines';
  staggerDelay?: number;
  animateFrom?: 'start' | 'center' | 'end';
}

export interface MorphAnimationOptions extends AnimationOptions {
  morphPath?: string;
  morphPoints?: number;
}

export interface DrawableAnimationOptions extends AnimationOptions {
  strokeDasharray?: string;
  strokeDashoffset?: number;
  drawDirection?: 'forward' | 'backward';
}

export class AdvancedAnimationController {
  private animations: any[] = [];
  private timelines: any[] = [];
  private observers: IntersectionObserver[] = [];

  // Text Animation Effects
  createTextReveal(target: string | HTMLElement, options: TextAnimationOptions = {}): any {
    const {
      splitBy = 'chars',
      staggerDelay = 50,
      duration = 800,
      delay = 0,
      ease = 'outExpo',
      animateFrom = 'start'
    } = options;

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return null;

    // Split text into individual elements
    const text = element.textContent || '';
    const splitText = this.splitText(text, splitBy);
    
    element.innerHTML = splitText.map(item => 
      `<span class="split-text" style="display: inline-block; opacity: 0; transform: translateY(50px);">${item}</span>`
    ).join('');

    const splitElements = element.querySelectorAll('.split-text');
    
    const animation = animate(splitElements, {
      opacity: [0, 1],
      translateY: [50, 0],
      duration,
      delay: stagger(staggerDelay, { 
        from: animateFrom === 'center' ? 'center' : animateFrom === 'end' ? 'last' : 'first' 
      }),
      ease,
    });

    this.animations.push(animation);
    return animation;
  }

  createTypewriterEffect(target: string | HTMLElement, options: TextAnimationOptions = {}): any {
    const {
      duration = 2000,
      delay = 0,
      ease = 'linear'
    } = options;

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return null;

    const text = element.textContent || '';
    element.textContent = '';
    
    let currentIndex = 0;
    const chars = text.split('');
    
    const animation = animate({
      duration,
      delay,
      ease,
      update: (anim) => {
        const progress = anim.progress / 100;
        const targetIndex = Math.floor(progress * chars.length);
        
        if (targetIndex > currentIndex) {
          element.textContent = chars.slice(0, targetIndex + 1).join('');
          currentIndex = targetIndex;
        }
      }
    });

    this.animations.push(animation);
    return animation;
  }

  // SVG Drawing Animations
  createDrawableAnimation(target: string | HTMLElement, options: DrawableAnimationOptions = {}): any {
    const {
      duration = 2000,
      delay = 0,
      ease = 'outExpo',
      drawDirection = 'forward'
    } = options;

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element || element.tagName !== 'path') return null;

    const path = element as SVGPathElement;
    const pathLength = path.getTotalLength();
    
    // Set initial state
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = drawDirection === 'forward' ? `${pathLength}` : '0';

    const animation = animate(path, {
      strokeDashoffset: drawDirection === 'forward' ? [pathLength, 0] : [0, pathLength],
      duration,
      delay,
      ease,
    });

    this.animations.push(animation);
    return animation;
  }

  createMorphAnimation(target: string | HTMLElement, options: MorphAnimationOptions = {}): any {
    const {
      morphPath,
      duration = 1000,
      delay = 0,
      ease = 'outExpo'
    } = options;

    if (!morphPath) return null;

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element || element.tagName !== 'path') return null;

    const animation = animate(element, {
      d: morphPath,
      duration,
      delay,
      ease,
    });

    this.animations.push(animation);
    return animation;
  }

  // Timeline Management
  createTimeline(): any {
    const tl = timeline({
      autoplay: false,
    });
    
    this.timelines.push(tl);
    return tl;
  }

  createSynchronizedSequence(animations: Array<{ target: string | HTMLElement; options: AnimationOptions }>): any {
    const tl = this.createTimeline();
    
    animations.forEach(({ target, options }, index) => {
      tl.add({
        targets: target,
        ...options,
      }, index * (options.delay || 0));
    });

    return tl;
  }

  // Advanced Interaction Effects
  createMagneticHover(target: string | HTMLElement, strength: number = 0.3): void {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      animate(element, {
        translateX: deltaX,
        translateY: deltaY,
        duration: 300,
        ease: 'outQuad',
      });
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      animate(element, {
        translateX: 0,
        translateY: 0,
        duration: 500,
        ease: 'outElastic',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  }

  createRippleEffect(target: string | HTMLElement): void {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('div');
      
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      element.appendChild(ripple);

      animate(ripple, {
        scale: [0, 1],
        opacity: [0.3, 0],
        duration: 600,
        ease: 'outQuad',
        complete: () => {
          ripple.remove();
        }
      });
    };

    element.addEventListener('click', handleClick);
  }

  // Scroll-triggered animations
  createScrollTrigger(target: string | HTMLElement, animationFn: () => any, options: IntersectionObserverInit = {}): void {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animationFn();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    });

    observer.observe(element);
    this.observers.push(observer);
  }

  // Utility methods
  private splitText(text: string, splitBy: 'chars' | 'words' | 'lines'): string[] {
    switch (splitBy) {
      case 'chars':
        return text.split('');
      case 'words':
        return text.split(' ');
      case 'lines':
        return text.split('\n');
      default:
        return text.split('');
    }
  }

  // Cleanup
  cleanup(): void {
    this.animations.forEach(animation => {
      if (animation.pause) animation.pause();
    });
    
    this.timelines.forEach(timeline => {
      if (timeline.pause) timeline.pause();
    });

    this.observers.forEach(observer => {
      observer.disconnect();
    });

    this.animations = [];
    this.timelines = [];
    this.observers = [];
  }
}

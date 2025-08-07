export interface PerformanceConfig {
  respectReducedMotion: boolean;
  maxConcurrentAnimations: number;
  throttleMouseEvents: boolean;
  throttleDelay: number;
  enableGPUAcceleration: boolean;
  enableWillChange: boolean;
  enableContainment: boolean;
}

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private config: PerformanceConfig;
  private activeAnimations: Set<any> = new Set();
  private reducedMotionEnabled: boolean = false;
  private throttledCallbacks: Map<string, number> = new Map();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  constructor() {
    this.config = {
      respectReducedMotion: true,
      maxConcurrentAnimations: 10,
      throttleMouseEvents: true,
      throttleDelay: 16, // ~60fps
      enableGPUAcceleration: true,
      enableWillChange: true,
      enableContainment: true
    };

    this.initializeReducedMotionDetection();
    this.setupPerformanceOptimizations();
  }

  private initializeReducedMotionDetection(): void {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotionEnabled = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      this.reducedMotionEnabled = e.matches;
      if (this.reducedMotionEnabled && this.config.respectReducedMotion) {
        this.pauseAllAnimations();
      }
    });
  }

  private setupPerformanceOptimizations(): void {
    if (typeof window === 'undefined') return;

    // Enable GPU acceleration for common animation properties
    if (this.config.enableGPUAcceleration) {
      this.enableGPUAcceleration();
    }

    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }

  private enableGPUAcceleration(): void {
    const style = document.createElement('style');
    style.textContent = `
      .gpu-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      .will-change-transform {
        will-change: transform;
      }
      
      .will-change-opacity {
        will-change: opacity;
      }
      
      .contain-layout {
        contain: layout;
      }
      
      .contain-paint {
        contain: paint;
      }
      
      .contain-strict {
        contain: strict;
      }
    `;
    document.head.appendChild(style);
  }

  private setupPerformanceMonitoring(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure' && entry.duration > 16) {
            console.warn(`Slow animation detected: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });
    }
  }

  // Animation management
  shouldAnimate(): boolean {
    if (this.config.respectReducedMotion && this.reducedMotionEnabled) {
      return false;
    }
    return this.activeAnimations.size < this.config.maxConcurrentAnimations;
  }

  registerAnimation(animation: any): boolean {
    if (!this.shouldAnimate()) {
      return false;
    }

    this.activeAnimations.add(animation);
    
    // Auto-cleanup when animation completes
    if (animation.finished) {
      animation.finished.then(() => {
        this.unregisterAnimation(animation);
      });
    }

    return true;
  }

  unregisterAnimation(animation: any): void {
    this.activeAnimations.delete(animation);
  }

  pauseAllAnimations(): void {
    this.activeAnimations.forEach(animation => {
      if (animation.pause) {
        animation.pause();
      }
    });
  }

  resumeAllAnimations(): void {
    if (this.shouldAnimate()) {
      this.activeAnimations.forEach(animation => {
        if (animation.play) {
          animation.play();
        }
      });
    }
  }

  // Throttling utilities
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.config.throttleDelay,
    key?: string
  ): T {
    const throttleKey = key || func.name || 'anonymous';
    
    return ((...args: Parameters<T>) => {
      const now = Date.now();
      const lastCall = this.throttledCallbacks.get(throttleKey) || 0;
      
      if (now - lastCall >= delay) {
        this.throttledCallbacks.set(throttleKey, now);
        return func.apply(this, args);
      }
    }) as T;
  }

  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.config.throttleDelay
  ): T {
    let timeoutId: NodeJS.Timeout;
    
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    }) as T;
  }

  // Element optimization
  optimizeElement(element: HTMLElement, options: {
    enableGPU?: boolean;
    willChange?: string[];
    containment?: 'layout' | 'paint' | 'strict';
  } = {}): void {
    const {
      enableGPU = this.config.enableGPUAcceleration,
      willChange = [],
      containment
    } = options;

    if (enableGPU) {
      element.classList.add('gpu-accelerated');
    }

    if (this.config.enableWillChange && willChange.length > 0) {
      element.style.willChange = willChange.join(', ');
      
      // Auto-cleanup will-change after animation
      setTimeout(() => {
        element.style.willChange = 'auto';
      }, 5000);
    }

    if (this.config.enableContainment && containment) {
      element.classList.add(`contain-${containment}`);
    }
  }

  // Intersection Observer for performance
  createOptimizedIntersectionObserver(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    const optimizedCallback = this.throttle(callback, 100, 'intersection-observer');
    
    return new IntersectionObserver(optimizedCallback, {
      rootMargin: '50px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
      ...options
    });
  }

  // Memory management
  cleanupElement(element: HTMLElement): void {
    // Remove will-change
    element.style.willChange = 'auto';
    
    // Remove optimization classes
    element.classList.remove('gpu-accelerated', 'will-change-transform', 'will-change-opacity');
    element.classList.remove('contain-layout', 'contain-paint', 'contain-strict');
    
    // Clear any stored references
    delete (element as any).__animationCleanup;
    delete (element as any).__magneticCleanup;
    delete (element as any).__rippleCleanup;
    delete (element as any).__hoverCleanup;
  }

  // Animation factory with performance checks
  createOptimizedAnimation(
    target: string | HTMLElement | HTMLElement[],
    properties: Record<string, any>,
    options: any = {}
  ): any | null {
    if (!this.shouldAnimate()) {
      // Return a mock animation object for reduced motion
      return {
        play: () => {},
        pause: () => {},
        finished: Promise.resolve(),
        progress: 100
      };
    }

    // Optimize target elements
    const elements = Array.isArray(target) ? target : 
                    typeof target === 'string' ? document.querySelectorAll(target) : [target];
    
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        this.optimizeElement(el, {
          willChange: Object.keys(properties).filter(prop => 
            ['transform', 'opacity', 'filter'].includes(prop)
          )
        });
      }
    });

    // Import animate function dynamically to avoid issues
    return import('animejs').then(({ animate }) => {
      const animation = animate({
        targets: target,
        ...properties,
        ...options,
        begin: () => {
          performance.mark('animation-start');
          options.begin?.();
        },
        complete: () => {
          performance.mark('animation-end');
          performance.measure('animation-duration', 'animation-start', 'animation-end');
          
          // Cleanup optimizations
          elements.forEach(el => {
            if (el instanceof HTMLElement) {
              this.cleanupElement(el);
            }
          });
          
          this.unregisterAnimation(animation);
          options.complete?.();
        }
      });

      this.registerAnimation(animation);
      return animation;
    });
  }

  // Configuration
  updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): PerformanceConfig {
    return { ...this.config };
  }

  // Performance metrics
  getPerformanceMetrics(): {
    activeAnimations: number;
    reducedMotionEnabled: boolean;
    memoryUsage?: number;
  } {
    const metrics = {
      activeAnimations: this.activeAnimations.size,
      reducedMotionEnabled: this.reducedMotionEnabled,
    };

    // Add memory usage if available
    if ('memory' in performance) {
      (metrics as any).memoryUsage = (performance as any).memory.usedJSHeapSize;
    }

    return metrics;
  }

  // Cleanup
  destroy(): void {
    this.pauseAllAnimations();
    this.activeAnimations.clear();
    this.throttledCallbacks.clear();
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();

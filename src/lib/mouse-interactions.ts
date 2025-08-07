import { animate } from 'animejs';

export interface CursorFollowerOptions {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  delay?: number;
  mixBlendMode?: string;
}

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  duration?: number;
  ease?: string;
}

export interface RippleOptions {
  color?: string;
  duration?: number;
  maxScale?: number;
  opacity?: number;
}

export interface ParallaxOptions {
  strength?: number;
  reverse?: boolean;
  smoothness?: number;
}

export class MouseInteractionSystem {
  private cursorFollower: HTMLElement | null = null;
  private magneticElements: Map<HTMLElement, MagneticOptions> = new Map();
  private parallaxElements: Map<HTMLElement, ParallaxOptions> = new Map();
  private isInitialized: boolean = false;
  private mousePosition = { x: 0, y: 0 };
  private targetPosition = { x: 0, y: 0 };
  private animationFrame: number | null = null;

  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.setupGlobalMouseTracking();
    this.isInitialized = true;
  }

  private setupGlobalMouseTracking(): void {
    const updateMousePosition = (e: MouseEvent) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
    };

    document.addEventListener('mousemove', updateMousePosition);
    this.startAnimationLoop();
  }

  private startAnimationLoop(): void {
    const animate = () => {
      this.updateCursorFollower();
      this.updateParallaxElements();
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  // Cursor Follower
  createCursorFollower(options: CursorFollowerOptions = {}): HTMLElement {
    const {
      size = 20,
      color = '#3b82f6',
      opacity = 0.6,
      blur = 0,
      delay = 0.1,
      mixBlendMode = 'normal'
    } = options;

    if (this.cursorFollower) {
      this.cursorFollower.remove();
    }

    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'cursor-follower';
    this.cursorFollower.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${opacity};
      filter: blur(${blur}px);
      mix-blend-mode: ${mixBlendMode};
      transform: translate(-50%, -50%);
      transition: transform ${delay}s ease-out;
    `;

    document.body.appendChild(this.cursorFollower);
    return this.cursorFollower;
  }

  private updateCursorFollower(): void {
    if (!this.cursorFollower) return;

    // Smooth following with easing
    this.targetPosition.x += (this.mousePosition.x - this.targetPosition.x) * 0.1;
    this.targetPosition.y += (this.mousePosition.y - this.targetPosition.y) * 0.1;

    this.cursorFollower.style.left = `${this.targetPosition.x}px`;
    this.cursorFollower.style.top = `${this.targetPosition.y}px`;
  }

  // Magnetic Hover Effects
  addMagneticEffect(element: HTMLElement, options: MagneticOptions = {}): void {
    const {
      strength = 0.3,
      radius = 100,
      duration = 300,
      ease = 'outQuad'
    } = options;

    this.magneticElements.set(element, options);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const factor = (radius - distance) / radius;
        const moveX = deltaX * strength * factor;
        const moveY = deltaY * strength * factor;

        animate(element, {
          translateX: moveX,
          translateY: moveY,
          duration,
          ease
        });
      }
    };

    const handleMouseLeave = () => {
      animate(element, {
        translateX: 0,
        translateY: 0,
        duration: duration * 1.5,
        ease: 'outElastic'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Store cleanup functions
    (element as any).__magneticCleanup = () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  // Ripple Effects
  addRippleEffect(element: HTMLElement, options: RippleOptions = {}): void {
    const {
      color = 'rgba(255, 255, 255, 0.3)',
      duration = 600,
      maxScale = 2,
      opacity = 0.3
    } = options;

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('div');
      
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        opacity: ${opacity};
      `;

      // Ensure element has relative positioning
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }
      element.style.overflow = 'hidden';

      element.appendChild(ripple);

      animate(ripple, {
        scale: [0, maxScale],
        opacity: [opacity, 0],
        duration,
        ease: 'outQuad',
        complete: () => {
          ripple.remove();
        }
      });
    };

    element.addEventListener('click', handleClick);

    // Store cleanup function
    (element as any).__rippleCleanup = () => {
      element.removeEventListener('click', handleClick);
    };
  }

  // Parallax Mouse Movement
  addParallaxEffect(element: HTMLElement, options: ParallaxOptions = {}): void {
    const {
      strength = 0.05,
      reverse = false,
      smoothness = 0.1
    } = options;

    this.parallaxElements.set(element, options);
  }

  private updateParallaxElements(): void {
    this.parallaxElements.forEach((options, element) => {
      const {
        strength = 0.05,
        reverse = false,
        smoothness = 0.1
      } = options;

      const rect = element.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (this.mousePosition.x - centerX) * strength;
      const deltaY = (this.mousePosition.y - centerY) * strength;

      const moveX = reverse ? -deltaX : deltaX;
      const moveY = reverse ? -deltaY : deltaY;

      // Get current transform
      const currentTransform = element.style.transform || '';
      const currentX = parseFloat(currentTransform.match(/translateX\(([^)]+)px\)/)?.[1] || '0');
      const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)px\)/)?.[1] || '0');

      // Smooth interpolation
      const newX = currentX + (moveX - currentX) * smoothness;
      const newY = currentY + (moveY - currentY) * smoothness;

      element.style.transform = `translateX(${newX}px) translateY(${newY}px)`;
    });
  }

  // Cursor State Management
  setCursorState(state: 'default' | 'hover' | 'click' | 'disabled'): void {
    if (!this.cursorFollower) return;

    const states = {
      default: { scale: 1, opacity: 0.6 },
      hover: { scale: 1.5, opacity: 0.8 },
      click: { scale: 0.8, opacity: 1 },
      disabled: { scale: 0.5, opacity: 0.3 }
    };

    const stateConfig = states[state];
    
    animate(this.cursorFollower, {
      scale: stateConfig.scale,
      opacity: stateConfig.opacity,
      duration: 200,
      ease: 'outQuad'
    });
  }

  // Hover State Management
  addHoverStateManagement(element: HTMLElement): void {
    const handleMouseEnter = () => {
      this.setCursorState('hover');
      element.style.cursor = 'none';
    };

    const handleMouseLeave = () => {
      this.setCursorState('default');
      element.style.cursor = 'auto';
    };

    const handleMouseDown = () => {
      this.setCursorState('click');
    };

    const handleMouseUp = () => {
      this.setCursorState('hover');
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);

    // Store cleanup function
    (element as any).__hoverCleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
    };
  }

  // Cleanup methods
  removeMagneticEffect(element: HTMLElement): void {
    this.magneticElements.delete(element);
    if ((element as any).__magneticCleanup) {
      (element as any).__magneticCleanup();
      delete (element as any).__magneticCleanup;
    }
  }

  removeRippleEffect(element: HTMLElement): void {
    if ((element as any).__rippleCleanup) {
      (element as any).__rippleCleanup();
      delete (element as any).__rippleCleanup;
    }
  }

  removeParallaxEffect(element: HTMLElement): void {
    this.parallaxElements.delete(element);
  }

  removeHoverStateManagement(element: HTMLElement): void {
    if ((element as any).__hoverCleanup) {
      (element as any).__hoverCleanup();
      delete (element as any).__hoverCleanup;
    }
  }

  destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.cursorFollower) {
      this.cursorFollower.remove();
      this.cursorFollower = null;
    }

    this.magneticElements.clear();
    this.parallaxElements.clear();
    this.isInitialized = false;
  }
}

export const mouseInteractionSystem = new MouseInteractionSystem();

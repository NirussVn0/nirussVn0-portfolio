'use client';

import React, { useEffect, useRef } from 'react';
import { AdvancedAnimationController } from '@/lib/advanced-animations';

interface DrawablePathProps {
  d: string;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  duration?: number;
  delay?: number;
  direction?: 'forward' | 'backward';
  trigger?: 'immediate' | 'scroll' | 'hover';
  loop?: boolean;
}

export function DrawablePath({
  d,
  className = '',
  strokeWidth = 2,
  stroke = 'currentColor',
  fill = 'none',
  duration = 2000,
  delay = 0,
  direction = 'forward',
  trigger = 'scroll',
  loop = false
}: DrawablePathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationController = useRef(new AdvancedAnimationController());

  useEffect(() => {
    if (!pathRef.current) return;

    const startAnimation = () => {
      animationController.current.createDrawableAnimation(pathRef.current!, {
        duration,
        delay,
        drawDirection: direction,
        loop
      });
    };

    switch (trigger) {
      case 'immediate':
        startAnimation();
        break;
      case 'scroll':
        animationController.current.createScrollTrigger(
          svgRef.current!,
          startAnimation,
          { threshold: 0.3 }
        );
        break;
      case 'hover':
        const handleMouseEnter = () => startAnimation();
        svgRef.current?.addEventListener('mouseenter', handleMouseEnter);
        return () => {
          svgRef.current?.removeEventListener('mouseenter', handleMouseEnter);
          animationController.current.cleanup();
        };
    }

    return () => {
      animationController.current.cleanup();
    };
  }, [duration, delay, direction, trigger, loop]);

  return (
    <svg ref={svgRef} className={className} viewBox="0 0 100 100">
      <path
        ref={pathRef}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderColor?: string;
  duration?: number;
  delay?: number;
  trigger?: 'immediate' | 'scroll' | 'hover';
}

export function AnimatedBorder({
  children,
  className = '',
  borderWidth = 2,
  borderColor = 'currentColor',
  duration = 2000,
  delay = 0,
  trigger = 'scroll'
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationController = useRef(new AdvancedAnimationController());

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Create SVG overlay for border animation
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathData = `M ${borderWidth/2} ${borderWidth/2} 
                     L ${rect.width - borderWidth/2} ${borderWidth/2} 
                     L ${rect.width - borderWidth/2} ${rect.height - borderWidth/2} 
                     L ${borderWidth/2} ${rect.height - borderWidth/2} Z`;
    
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', borderColor);
    path.setAttribute('stroke-width', borderWidth.toString());
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');

    svg.appendChild(path);
    container.appendChild(svg);

    const startAnimation = () => {
      animationController.current.createDrawableAnimation(path, {
        duration,
        delay,
        drawDirection: 'forward'
      });
    };

    switch (trigger) {
      case 'immediate':
        startAnimation();
        break;
      case 'scroll':
        animationController.current.createScrollTrigger(
          container,
          startAnimation,
          { threshold: 0.3 }
        );
        break;
      case 'hover':
        const handleMouseEnter = () => startAnimation();
        container.addEventListener('mouseenter', handleMouseEnter);
        return () => {
          container.removeEventListener('mouseenter', handleMouseEnter);
          svg.remove();
          animationController.current.cleanup();
        };
    }

    return () => {
      svg.remove();
      animationController.current.cleanup();
    };
  }, [borderWidth, borderColor, duration, delay, trigger]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  );
}

interface MorphingIconProps {
  paths: string[];
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  loop?: boolean;
  trigger?: 'immediate' | 'scroll' | 'hover' | 'click';
}

export function MorphingIcon({
  paths,
  className = '',
  size = 24,
  duration = 1000,
  delay = 0,
  loop = false,
  trigger = 'hover'
}: MorphingIconProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationController = useRef(new AdvancedAnimationController());
  const currentPathIndex = useRef(0);

  useEffect(() => {
    if (!pathRef.current || paths.length < 2) return;

    const morphToNext = () => {
      const nextIndex = (currentPathIndex.current + 1) % paths.length;
      const nextPath = paths[nextIndex];
      
      animationController.current.createMorphAnimation(pathRef.current!, {
        morphPath: nextPath,
        duration,
        delay
      });
      
      currentPathIndex.current = nextIndex;
      
      if (loop) {
        setTimeout(morphToNext, duration + delay + 500);
      }
    };

    const startAnimation = () => {
      morphToNext();
    };

    switch (trigger) {
      case 'immediate':
        startAnimation();
        break;
      case 'scroll':
        animationController.current.createScrollTrigger(
          svgRef.current!,
          startAnimation,
          { threshold: 0.5 }
        );
        break;
      case 'hover':
        const handleMouseEnter = () => startAnimation();
        svgRef.current?.addEventListener('mouseenter', handleMouseEnter);
        return () => {
          svgRef.current?.removeEventListener('mouseenter', handleMouseEnter);
          animationController.current.cleanup();
        };
      case 'click':
        const handleClick = () => startAnimation();
        svgRef.current?.addEventListener('click', handleClick);
        return () => {
          svgRef.current?.removeEventListener('click', handleClick);
          animationController.current.cleanup();
        };
    }

    return () => {
      animationController.current.cleanup();
    };
  }, [paths, duration, delay, loop, trigger]);

  return (
    <svg 
      ref={svgRef}
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={`${className} ${trigger === 'click' || trigger === 'hover' ? 'cursor-pointer' : ''}`}
    >
      <path
        ref={pathRef}
        d={paths[0]}
        fill="currentColor"
      />
    </svg>
  );
}

interface DecorativeLineProps {
  className?: string;
  width?: number;
  height?: number;
  pattern?: 'straight' | 'wavy' | 'zigzag' | 'curved';
  duration?: number;
  delay?: number;
  trigger?: 'immediate' | 'scroll';
}

export function DecorativeLine({
  className = '',
  width = 200,
  height = 4,
  pattern = 'straight',
  duration = 1500,
  delay = 0,
  trigger = 'scroll'
}: DecorativeLineProps) {
  const lineRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationController = useRef(new AdvancedAnimationController());

  const getPathData = () => {
    switch (pattern) {
      case 'wavy':
        return `M 0 ${height/2} Q ${width/4} 0 ${width/2} ${height/2} T ${width} ${height/2}`;
      case 'zigzag':
        return `M 0 ${height/2} L ${width/4} 0 L ${width/2} ${height/2} L ${3*width/4} 0 L ${width} ${height/2}`;
      case 'curved':
        return `M 0 ${height/2} Q ${width/2} 0 ${width} ${height/2}`;
      default:
        return `M 0 ${height/2} L ${width} ${height/2}`;
    }
  };

  useEffect(() => {
    if (!lineRef.current) return;

    const startAnimation = () => {
      animationController.current.createDrawableAnimation(lineRef.current!, {
        duration,
        delay,
        drawDirection: 'forward'
      });
    };

    if (trigger === 'immediate') {
      startAnimation();
    } else {
      animationController.current.createScrollTrigger(
        svgRef.current!,
        startAnimation,
        { threshold: 0.5 }
      );
    }

    return () => {
      animationController.current.cleanup();
    };
  }, [duration, delay, trigger, pattern]);

  return (
    <svg 
      ref={svgRef}
      width={width} 
      height={height} 
      className={className}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        ref={lineRef}
        d={getPathData()}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

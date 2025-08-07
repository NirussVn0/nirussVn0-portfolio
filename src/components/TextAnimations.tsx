'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { AdvancedAnimationController } from '@/lib/advanced-animations';

interface TextRevealProps {
  children: string;
  className?: string;
  splitBy?: 'chars' | 'words' | 'lines';
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  animateFrom?: 'start' | 'center' | 'end';
  trigger?: 'immediate' | 'scroll';
}

export function TextReveal({
  children,
  className = '',
  splitBy = 'chars',
  staggerDelay = 50,
  duration = 800,
  delay = 0,
  animateFrom = 'start',
  trigger = 'scroll'
}: TextRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const animationController = useRef(new AdvancedAnimationController());

  useEffect(() => {
    if (!textRef.current) return;

    const startAnimation = () => {
      animationController.current.createTextReveal(textRef.current!, {
        splitBy,
        staggerDelay,
        duration,
        delay,
        animateFrom
      });
    };

    if (trigger === 'immediate') {
      startAnimation();
    } else {
      animationController.current.createScrollTrigger(
        textRef.current,
        startAnimation,
        { threshold: 0.1 }
      );
    }

    return () => {
      animationController.current.cleanup();
    };
  }, [splitBy, staggerDelay, duration, delay, animateFrom, trigger]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
}

interface TypewriterProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  trigger?: 'immediate' | 'scroll';
}

export function Typewriter({
  children,
  className = '',
  duration = 2000,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  trigger = 'scroll'
}: TypewriterProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const animationController = useRef(new AdvancedAnimationController());

  useEffect(() => {
    if (!textRef.current) return;

    const startAnimation = () => {
      // Add cursor if enabled
      if (cursor) {
        const cursorElement = document.createElement('span');
        cursorElement.textContent = cursorChar;
        cursorElement.className = 'typewriter-cursor';
        cursorElement.style.animation = 'blink 1s infinite';
        textRef.current!.appendChild(cursorElement);
      }

      animationController.current.createTypewriterEffect(textRef.current!, {
        duration,
        delay
      });
    };

    if (trigger === 'immediate') {
      startAnimation();
    } else {
      animationController.current.createScrollTrigger(
        textRef.current,
        startAnimation,
        { threshold: 0.1 }
      );
    }

    return () => {
      animationController.current.cleanup();
    };
  }, [duration, delay, cursor, cursorChar, trigger]);

  return (
    <>
      <span ref={textRef} className={className}>
        {children}
      </span>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .typewriter-cursor {
          animation: blink 1s infinite;
        }
      `}</style>
    </>
  );
}

interface AnimatedHeadingProps {
  children: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  effect?: 'reveal' | 'typewriter' | 'slide-up' | 'fade-in';
  delay?: number;
  duration?: number;
}

export function AnimatedHeading({
  children,
  level = 1,
  className = '',
  effect = 'reveal',
  delay = 0,
  duration = 1000
}: AnimatedHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseClasses = {
    1: 'text-4xl md:text-6xl font-bold',
    2: 'text-3xl md:text-5xl font-bold',
    3: 'text-2xl md:text-4xl font-semibold',
    4: 'text-xl md:text-3xl font-semibold',
    5: 'text-lg md:text-2xl font-medium',
    6: 'text-base md:text-xl font-medium'
  };

  const combinedClassName = `${baseClasses[level]} ${className}`;

  switch (effect) {
    case 'typewriter':
      return (
        <Tag className={combinedClassName}>
          <Typewriter duration={duration} delay={delay}>
            {children}
          </Typewriter>
        </Tag>
      );
    case 'reveal':
      return (
        <Tag className={combinedClassName}>
          <TextReveal 
            splitBy="chars" 
            staggerDelay={50} 
            duration={duration} 
            delay={delay}
          >
            {children}
          </TextReveal>
        </Tag>
      );
    case 'slide-up':
      return (
        <Tag className={`${combinedClassName} animate-slide-up`} style={{ animationDelay: `${delay}ms` }}>
          {children}
        </Tag>
      );
    case 'fade-in':
      return (
        <Tag className={`${combinedClassName} animate-fade-in`} style={{ animationDelay: `${delay}ms` }}>
          {children}
        </Tag>
      );
    default:
      return <Tag className={combinedClassName}>{children}</Tag>;
  }
}

interface StaggeredListProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  effect?: 'slide-up' | 'fade-in' | 'scale-in';
}

export function StaggeredList({
  items,
  className = '',
  itemClassName = '',
  staggerDelay = 100,
  duration = 600,
  delay = 0,
  effect = 'slide-up'
}: StaggeredListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const animationController = useRef(new AdvancedAnimationController());

  useEffect(() => {
    if (!listRef.current) return;

    const listItems = listRef.current.querySelectorAll('li');
    
    const startAnimation = () => {
      const animationProps = {
        duration,
        delay: (el: Element, i: number) => delay + (i * staggerDelay),
        ease: 'outExpo'
      };

      switch (effect) {
        case 'slide-up':
          animationController.current.animations.push(
            animate(listItems, {
              ...animationProps,
              opacity: [0, 1],
              translateY: [30, 0]
            })
          );
          break;
        case 'fade-in':
          animationController.current.animations.push(
            animate(listItems, {
              ...animationProps,
              opacity: [0, 1]
            })
          );
          break;
        case 'scale-in':
          animationController.current.animations.push(
            animate(listItems, {
              ...animationProps,
              opacity: [0, 1],
              scale: [0.8, 1]
            })
          );
          break;
      }
    };

    animationController.current.createScrollTrigger(
      listRef.current,
      startAnimation,
      { threshold: 0.1 }
    );

    return () => {
      animationController.current.cleanup();
    };
  }, [staggerDelay, duration, delay, effect]);

  return (
    <ul ref={listRef} className={className}>
      {items.map((item, index) => (
        <li 
          key={index} 
          className={`opacity-0 ${itemClassName}`}
          style={{ transform: effect === 'slide-up' ? 'translateY(30px)' : effect === 'scale-in' ? 'scale(0.8)' : 'none' }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

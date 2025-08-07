'use client';

import React, { useEffect, useRef } from 'react';
import { mouseInteractionSystem } from '@/lib/mouse-interactions';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  duration?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.3,
  radius = 100,
  duration = 300,
  className = ''
}: MagneticProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    mouseInteractionSystem.initialize();
    mouseInteractionSystem.addMagneticEffect(elementRef.current, {
      strength,
      radius,
      duration
    });

    return () => {
      if (elementRef.current) {
        mouseInteractionSystem.removeMagneticEffect(elementRef.current);
      }
    };
  }, [strength, radius, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface RippleProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  maxScale?: number;
  opacity?: number;
  className?: string;
}

export function Ripple({
  children,
  color = 'rgba(255, 255, 255, 0.3)',
  duration = 600,
  maxScale = 2,
  opacity = 0.3,
  className = ''
}: RippleProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    mouseInteractionSystem.addRippleEffect(elementRef.current, {
      color,
      duration,
      maxScale,
      opacity
    });

    return () => {
      if (elementRef.current) {
        mouseInteractionSystem.removeRippleEffect(elementRef.current);
      }
    };
  }, [color, duration, maxScale, opacity]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  strength?: number;
  reverse?: boolean;
  smoothness?: number;
  className?: string;
}

export function Parallax({
  children,
  strength = 0.05,
  reverse = false,
  smoothness = 0.1,
  className = ''
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    mouseInteractionSystem.initialize();
    mouseInteractionSystem.addParallaxEffect(elementRef.current, {
      strength,
      reverse,
      smoothness
    });

    return () => {
      if (elementRef.current) {
        mouseInteractionSystem.removeParallaxEffect(elementRef.current);
      }
    };
  }, [strength, reverse, smoothness]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface CursorFollowerProps {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  delay?: number;
  mixBlendMode?: string;
}

export function CursorFollower({
  size = 20,
  color = '#3b82f6',
  opacity = 0.6,
  blur = 0,
  delay = 0.1,
  mixBlendMode = 'normal'
}: CursorFollowerProps) {
  useEffect(() => {
    mouseInteractionSystem.initialize();
    const follower = mouseInteractionSystem.createCursorFollower({
      size,
      color,
      opacity,
      blur,
      delay,
      mixBlendMode
    });

    return () => {
      if (follower) {
        follower.remove();
      }
    };
  }, [size, color, opacity, blur, delay, mixBlendMode]);

  return null;
}

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  magneticStrength?: number;
  rippleColor?: string;
  hoverScale?: number;
}

export function InteractiveButton({
  children,
  onClick,
  className = '',
  magneticStrength = 0.2,
  rippleColor = 'rgba(255, 255, 255, 0.3)',
  hoverScale = 1.05
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    mouseInteractionSystem.initialize();
    
    // Add magnetic effect
    mouseInteractionSystem.addMagneticEffect(buttonRef.current, {
      strength: magneticStrength,
      radius: 80,
      duration: 300
    });

    // Add ripple effect
    mouseInteractionSystem.addRippleEffect(buttonRef.current, {
      color: rippleColor,
      duration: 600,
      maxScale: 2
    });

    // Add hover state management
    mouseInteractionSystem.addHoverStateManagement(buttonRef.current);

    return () => {
      if (buttonRef.current) {
        mouseInteractionSystem.removeMagneticEffect(buttonRef.current);
        mouseInteractionSystem.removeRippleEffect(buttonRef.current);
        mouseInteractionSystem.removeHoverStateManagement(buttonRef.current);
      }
    };
  }, [magneticStrength, rippleColor]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden transition-transform duration-300 hover:scale-${Math.round(hoverScale * 100)} ${className}`}
    >
      {children}
    </button>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
}

export function FloatingElement({
  children,
  className = '',
  intensity = 10,
  speed = 2000
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let animationId: number;

    const float = () => {
      const time = Date.now() * 0.001;
      const x = Math.sin(time * speed * 0.001) * intensity;
      const y = Math.cos(time * speed * 0.0008) * intensity * 0.5;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
      animationId = requestAnimationFrame(float);
    };

    float();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [intensity, speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  speed = 300
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const rotateX = deltaY * maxTilt;
      const rotateY = -deltaX * maxTilt;
      
      card.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Set transition
    card.style.transition = `transform ${speed}ms ease-out`;

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed]);

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  );
}

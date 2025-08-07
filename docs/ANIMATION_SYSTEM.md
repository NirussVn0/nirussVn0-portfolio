# Advanced Animation System Documentation

## Overview

This portfolio features a sophisticated animation system built with Anime.js v4, providing advanced text effects, SVG animations, timeline management, and mouse interactions with performance optimization.

## Core Components

### 1. Advanced Animation Controller (`/src/lib/advanced-animations.ts`)

The main controller for complex animations with the following features:

#### Text Animations
- **Text Reveal**: Character-by-character or word-by-word reveals
- **Typewriter Effect**: Realistic typing animation
- **Staggered Animations**: Coordinated multi-element animations

```typescript
// Text reveal example
animationController.createTextReveal('.title', {
  splitBy: 'chars',
  staggerDelay: 50,
  duration: 800,
  animateFrom: 'center'
});

// Typewriter effect
animationController.createTypewriterEffect('.subtitle', {
  duration: 2000,
  delay: 500
});
```

#### SVG Drawing Animations
- **Path Drawing**: Animate SVG path strokes
- **Morphing**: Transform between different SVG shapes
- **Decorative Elements**: Animated borders and lines

```typescript
// SVG path drawing
animationController.createDrawableAnimation('.svg-path', {
  duration: 2000,
  drawDirection: 'forward'
});

// Shape morphing
animationController.createMorphAnimation('.morph-path', {
  morphPath: 'M10,10 L90,90 Z',
  duration: 1000
});
```

### 2. Timeline Animation System (`/src/lib/timeline-animations.ts`)

Advanced timeline management for complex animation sequences:

#### Sequential Timelines
```typescript
const timeline = timelineSystem.createSequentialTimeline([
  {
    target: '.element1',
    properties: { opacity: [0, 1] },
    duration: 1000
  },
  {
    target: '.element2',
    properties: { translateY: [50, 0] },
    duration: 800,
    delay: 200
  }
], {
  onComplete: () => console.log('Sequence complete')
});
```

#### Synchronized Animations
```typescript
const syncedTimeline = timelineSystem.createSyncedAnimations([
  {
    name: 'background',
    targets: '.bg',
    properties: { scale: [1.1, 1] },
    syncPoint: 0
  },
  {
    name: 'content',
    targets: '.content',
    properties: { opacity: [0, 1] },
    syncPoint: 500
  }
]);
```

### 3. Mouse Interaction System (`/src/lib/mouse-interactions.ts`)

Advanced mouse-based interactions:

#### Magnetic Effects
```typescript
mouseSystem.addMagneticEffect(element, {
  strength: 0.3,
  radius: 100,
  duration: 300
});
```

#### Cursor Following
```typescript
const follower = mouseSystem.createCursorFollower({
  size: 24,
  color: '#3b82f6',
  blur: 2,
  mixBlendMode: 'difference'
});
```

#### Ripple Effects
```typescript
mouseSystem.addRippleEffect(button, {
  color: 'rgba(255, 255, 255, 0.3)',
  duration: 600,
  maxScale: 2
});
```

### 4. Performance Optimization (`/src/lib/performance-optimizer.ts`)

Ensures smooth animations with accessibility support:

#### Features
- **Reduced Motion Support**: Respects `prefers-reduced-motion`
- **Animation Limiting**: Prevents too many concurrent animations
- **GPU Acceleration**: Automatic hardware acceleration
- **Memory Management**: Proper cleanup and optimization

```typescript
// Check if animations should run
if (performanceOptimizer.shouldAnimate()) {
  // Run animation
}

// Optimize element for animation
performanceOptimizer.optimizeElement(element, {
  willChange: ['transform', 'opacity'],
  enableGPU: true
});
```

## React Components

### Text Animation Components

#### TextReveal
```jsx
<TextReveal 
  splitBy="chars" 
  staggerDelay={50} 
  animateFrom="center"
>
  Your text here
</TextReveal>
```

#### Typewriter
```jsx
<Typewriter 
  duration={2000} 
  cursor={true}
  trigger="scroll"
>
  Typing animation text
</Typewriter>
```

#### AnimatedHeading
```jsx
<AnimatedHeading 
  level={1} 
  effect="reveal" 
  duration={1200}
>
  Your heading
</AnimatedHeading>
```

### SVG Animation Components

#### DrawablePath
```jsx
<DrawablePath 
  d="M10,10 L90,90" 
  duration={2000}
  trigger="scroll"
  className="text-blue-500"
/>
```

#### DecorativeLine
```jsx
<DecorativeLine 
  pattern="wavy" 
  width={200} 
  height={4}
  trigger="scroll"
/>
```

### Mouse Interaction Components

#### Magnetic
```jsx
<Magnetic strength={0.3} radius={100}>
  <button>Magnetic Button</button>
</Magnetic>
```

#### Parallax
```jsx
<Parallax strength={0.05} reverse={false}>
  <div>Parallax content</div>
</Parallax>
```

#### InteractiveButton
```jsx
<InteractiveButton
  magneticStrength={0.2}
  rippleColor="rgba(255,255,255,0.3)"
  onClick={handleClick}
>
  Click me
</InteractiveButton>
```

## Configuration

### Animation Parameters

Most animations accept these common parameters:

- `duration`: Animation duration in milliseconds (default: 1000)
- `delay`: Delay before animation starts (default: 0)
- `ease`: Easing function (default: 'outExpo')
- `trigger`: When to start ('immediate', 'scroll', 'hover')

### Performance Settings

```typescript
performanceOptimizer.updateConfig({
  respectReducedMotion: true,
  maxConcurrentAnimations: 10,
  throttleMouseEvents: true,
  enableGPUAcceleration: true
});
```

## Best Practices

### 1. Performance
- Use `will-change` sparingly and clean up after animations
- Limit concurrent animations
- Respect user preferences for reduced motion
- Use GPU-accelerated properties (transform, opacity)

### 2. Accessibility
- Always provide fallbacks for reduced motion
- Ensure animations don't interfere with screen readers
- Use semantic HTML with proper ARIA labels

### 3. User Experience
- Keep animations purposeful and not distracting
- Use consistent timing and easing
- Provide visual feedback for interactions

## Troubleshooting

### Common Issues

1. **Animations not starting**: Check if `performanceOptimizer.shouldAnimate()` returns true
2. **Performance issues**: Reduce concurrent animations or enable GPU acceleration
3. **Scroll triggers not working**: Ensure elements are in viewport and have proper intersection observer setup

### Debug Mode

Enable debug logging:
```typescript
// In development
if (process.env.NODE_ENV === 'development') {
  console.log('Animation metrics:', performanceOptimizer.getPerformanceMetrics());
}
```

## Browser Support

- Modern browsers with ES6+ support
- CSS transforms and transitions
- Intersection Observer API
- Performance Observer API (optional)

## Dependencies

- Anime.js v4.x
- React 18+
- TypeScript 5+

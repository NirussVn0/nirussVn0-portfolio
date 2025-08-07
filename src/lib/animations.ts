import { animate, stagger } from 'animejs';

export class AnimationController {
  private animations: any[] = [];

  fadeIn(target: string | HTMLElement, delay = 0, duration = 1000) {
    const animation = animate({
      targets: target,
      opacity: [0, 1],
      translateY: [30, 0],
      duration,
      delay,
      easing: 'easeOutExpo',
    });
    this.animations.push(animation);
    return animation;
  }

  slideIn(target: string | HTMLElement, direction = 'left', delay = 0) {
    const translateProperty = direction === 'left' ? 'translateX' : 'translateY';
    const translateValue = direction === 'left' ? [-100, 0] : [100, 0];

    const animation = animate({
      targets: target,
      [translateProperty]: translateValue,
      opacity: [0, 1],
      duration: 1200,
      delay,
      easing: 'easeOutExpo',
    });
    this.animations.push(animation);
    return animation;
  }

  staggeredReveal(target: string | HTMLElement, delay = 0) {
    const animation = animate({
      targets: target,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      delay: stagger(100, { start: delay }),
      easing: 'easeOutExpo',
    });
    this.animations.push(animation);
    return animation;
  }

  hoverEffect(target: string | HTMLElement) {
    return {
      enter: () =>
        animate({
          targets: target,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad',
        }),
      leave: () =>
        animate({
          targets: target,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad',
        }),
    };
  }

  cleanup() {
    this.animations.forEach((animation) => {
      if (animation.pause) animation.pause();
    });
    this.animations = [];
  }
}

export class CursorTrail {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Array<{
    x: number;
    y: number;
    life: number;
    maxLife: number;
  }> = [];
  private animationId: number | null = null;

  constructor(container: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    
    this.resize();
    this.bindEvents();
    this.animate();
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private bindEvents() {
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.addParticle(e.clientX, e.clientY);
    });
  }

  private addParticle(x: number, y: number) {
    this.particles.push({
      x,
      y,
      life: 0,
      maxLife: 30,
    });
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles = this.particles.filter((particle) => {
      particle.life++;
      const alpha = 1 - particle.life / particle.maxLife;
      
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = '#3b82f6';
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
      
      return particle.life < particle.maxLife;
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.canvas.remove();
  }
}

import { animate, stagger } from 'animejs';

export interface TimelineStep {
  target: string | HTMLElement | HTMLElement[];
  properties: Record<string, any>;
  duration?: number;
  delay?: number;
  ease?: string;
  offset?: string | number;
}

export interface TimelineCallbacks {
  onBegin?: () => void;
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
  onStepComplete?: (stepIndex: number) => void;
}

export class TimelineAnimationSystem {
  private timelines: any[] = [];
  private globalTime: number = 0;
  private isPlaying: boolean = false;

  createSequentialTimeline(steps: TimelineStep[], callbacks?: TimelineCallbacks): any {
    let currentDelay = 0;
    const animations: any[] = [];

    callbacks?.onBegin?.();

    steps.forEach((step, index) => {
      const stepDelay = currentDelay + (step.delay || 0);

      const animation = animate(step.target, {
        ...step.properties,
        duration: step.duration || 1000,
        delay: stepDelay,
        ease: step.ease || 'outExpo',
        complete: () => {
          callbacks?.onStepComplete?.(index);
          if (index === steps.length - 1) {
            callbacks?.onComplete?.();
          }
        }
      });

      animations.push(animation);
      currentDelay += (step.duration || 1000);
    });

    const timeline = {
      animations,
      play: () => animations.forEach(anim => anim.play?.()),
      pause: () => animations.forEach(anim => anim.pause?.()),
      restart: () => animations.forEach(anim => anim.restart?.())
    };

    this.timelines.push(timeline);
    return timeline;
  }

  createParallelTimeline(steps: TimelineStep[], callbacks?: TimelineCallbacks): any {
    const animations: any[] = [];
    let completedCount = 0;

    callbacks?.onBegin?.();

    steps.forEach((step, index) => {
      const animation = animate(step.target, {
        ...step.properties,
        duration: step.duration || 1000,
        delay: step.delay || 0,
        ease: step.ease || 'outExpo',
        complete: () => {
          callbacks?.onStepComplete?.(index);
          completedCount++;
          if (completedCount === steps.length) {
            callbacks?.onComplete?.();
          }
        }
      });

      animations.push(animation);
    });

    const timeline = {
      animations,
      play: () => animations.forEach(anim => anim.play?.()),
      pause: () => animations.forEach(anim => anim.pause?.()),
      restart: () => animations.forEach(anim => anim.restart?.())
    };

    this.timelines.push(timeline);
    return timeline;
  }

  createStaggeredTimeline(
    targets: string | HTMLElement | HTMLElement[],
    properties: Record<string, any>,
    staggerOptions: {
      delay?: number;
      from?: 'first' | 'last' | 'center' | number;
      direction?: 'normal' | 'reverse';
      grid?: [number, number];
    } = {},
    callbacks?: TimelineCallbacks
  ): any {
    const {
      delay = 100,
      from = 'first',
      direction = 'normal',
      grid
    } = staggerOptions;

    callbacks?.onBegin?.();

    const staggerConfig: any = { from };
    if (grid) staggerConfig.grid = grid;
    if (direction === 'reverse') staggerConfig.direction = 'reverse';

    const animation = animate(targets, {
      ...properties,
      delay: stagger(delay, staggerConfig),
      ease: properties.ease || 'outExpo',
      complete: callbacks?.onComplete
    });

    const timeline = {
      animations: [animation],
      play: () => animation.play?.(),
      pause: () => animation.pause?.(),
      restart: () => animation.restart?.()
    };

    this.timelines.push(timeline);
    return timeline;
  }

  createMasterTimeline(childTimelines: any[], callbacks?: TimelineCallbacks): any {
    callbacks?.onBegin?.();

    let currentDelay = 0;
    childTimelines.forEach((childTl, index) => {
      setTimeout(() => {
        if (childTl.play) {
          childTl.play();
        }
        if (index === childTimelines.length - 1) {
          callbacks?.onComplete?.();
        }
      }, currentDelay);

      currentDelay += 500; // Offset each child timeline by 500ms
    });

    const timeline = {
      animations: childTimelines,
      play: () => childTimelines.forEach((tl: any) => tl.play?.()),
      pause: () => childTimelines.forEach((tl: any) => tl.pause?.()),
      restart: () => childTimelines.forEach((tl: any) => tl.restart?.())
    };

    this.timelines.push(timeline);
    return timeline;
  }

  // Synchronized animation system
  createSyncedAnimations(
    animationGroups: Array<{
      name: string;
      targets: string | HTMLElement | HTMLElement[];
      properties: Record<string, any>;
      duration?: number;
      syncPoint?: number; // Time in ms when this animation should start
    }>,
    callbacks?: TimelineCallbacks
  ): any {
    callbacks?.onBegin?.();
    const animations: any[] = [];
    let completedCount = 0;

    animationGroups.forEach((group) => {
      const animation = animate(group.targets, {
        ...group.properties,
        duration: group.duration || 1000,
        delay: group.syncPoint || 0,
        ease: group.properties.ease || 'outExpo',
        complete: () => {
          completedCount++;
          if (completedCount === animationGroups.length) {
            callbacks?.onComplete?.();
          }
        }
      });

      animations.push(animation);
    });

    const timeline = {
      animations,
      play: () => animations.forEach(anim => anim.play?.()),
      pause: () => animations.forEach(anim => anim.pause?.()),
      restart: () => animations.forEach(anim => anim.restart?.())
    };

    this.timelines.push(timeline);
    return timeline;
  }

  // Complex choreography system
  createChoreography(
    scenes: Array<{
      name: string;
      duration: number;
      animations: TimelineStep[];
      onEnter?: () => void;
      onExit?: () => void;
    }>,
    callbacks?: TimelineCallbacks
  ): any {
    callbacks?.onBegin?.();

    let currentTime = 0;
    const allAnimations: any[] = [];

    scenes.forEach((scene, sceneIndex) => {
      // Scene enter callback
      if (scene.onEnter) {
        setTimeout(scene.onEnter, currentTime);
      }

      // Scene animations
      scene.animations.forEach((step) => {
        const animation = animate(step.target, {
          ...step.properties,
          duration: step.duration || 1000,
          delay: currentTime + (step.delay || 0),
          ease: step.ease || 'outExpo'
        });
        allAnimations.push(animation);
      });

      // Scene exit callback
      if (scene.onExit) {
        setTimeout(scene.onExit, currentTime + scene.duration);
      }

      currentTime += scene.duration;
    });

    // Call complete callback after all scenes
    setTimeout(() => {
      callbacks?.onComplete?.();
    }, currentTime);

    const timeline = {
      animations: allAnimations,
      play: () => allAnimations.forEach(anim => anim.play?.()),
      pause: () => allAnimations.forEach(anim => anim.pause?.()),
      restart: () => allAnimations.forEach(anim => anim.restart?.())
    };

    this.timelines.push(timeline);
    return timeline;
  }

  // Time control methods
  play(): void {
    this.isPlaying = true;
    this.timelines.forEach(tl => {
      if (tl.play) tl.play();
    });
  }

  pause(): void {
    this.isPlaying = false;
    this.timelines.forEach(tl => {
      if (tl.pause) tl.pause();
    });
  }

  restart(): void {
    this.globalTime = 0;
    this.timelines.forEach(tl => {
      if (tl.restart) tl.restart();
    });
    this.isPlaying = true;
  }

  seek(time: number): void {
    this.globalTime = time;
    this.timelines.forEach(tl => {
      if (tl.seek) tl.seek(time);
    });
  }

  setSpeed(speed: number): void {
    this.timelines.forEach(tl => {
      if (tl.speed) tl.speed = speed;
    });
  }

  // Utility methods
  getCurrentTime(): number {
    return this.globalTime;
  }

  isTimelinePlaying(): boolean {
    return this.isPlaying;
  }

  getTimelineProgress(): number {
    const activeTl = this.timelines[this.timelines.length - 1];
    return activeTl?.progress || 0;
  }

  // Cleanup
  cleanup(): void {
    this.timelines.forEach(tl => {
      if (tl.pause) tl.pause();
    });
    this.timelines = [];
    this.globalTime = 0;
    this.isPlaying = false;
  }

  // Advanced features
  createConditionalTimeline(
    condition: () => boolean,
    trueSteps: TimelineStep[],
    falseSteps: TimelineStep[],
    callbacks?: TimelineCallbacks
  ): any {
    const steps = condition() ? trueSteps : falseSteps;
    return this.createSequentialTimeline(steps, callbacks);
  }

  createLoopingTimeline(
    steps: TimelineStep[],
    loopCount: number = -1, // -1 for infinite
    callbacks?: TimelineCallbacks
  ): any {
    const tl = this.createSequentialTimeline(steps, {
      ...callbacks,
      onComplete: () => {
        if (loopCount === -1 || loopCount > 1) {
          if (loopCount > 1) loopCount--;
          tl.restart();
        }
        callbacks?.onComplete?.();
      }
    });

    return tl;
  }
}

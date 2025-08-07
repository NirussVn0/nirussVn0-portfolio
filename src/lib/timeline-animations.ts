import { animate, timeline, stagger } from 'animejs';

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
    const tl = timeline({
      autoplay: false,
      begin: callbacks?.onBegin,
      update: (anim) => {
        this.globalTime = anim.currentTime;
        callbacks?.onUpdate?.(anim.progress);
      },
      complete: callbacks?.onComplete
    });

    steps.forEach((step, index) => {
      const stepAnimation = {
        targets: step.target,
        ...step.properties,
        duration: step.duration || 1000,
        delay: step.delay || 0,
        easing: step.ease || 'easeOutExpo',
        complete: () => callbacks?.onStepComplete?.(index)
      };

      if (step.offset !== undefined) {
        tl.add(stepAnimation, step.offset);
      } else {
        tl.add(stepAnimation);
      }
    });

    this.timelines.push(tl);
    return tl;
  }

  createParallelTimeline(steps: TimelineStep[], callbacks?: TimelineCallbacks): any {
    const tl = timeline({
      autoplay: false,
      begin: callbacks?.onBegin,
      update: (anim) => {
        this.globalTime = anim.currentTime;
        callbacks?.onUpdate?.(anim.progress);
      },
      complete: callbacks?.onComplete
    });

    steps.forEach((step, index) => {
      const stepAnimation = {
        targets: step.target,
        ...step.properties,
        duration: step.duration || 1000,
        delay: step.delay || 0,
        easing: step.ease || 'easeOutExpo',
        complete: () => callbacks?.onStepComplete?.(index)
      };

      // Add all steps at the same time (parallel execution)
      tl.add(stepAnimation, 0);
    });

    this.timelines.push(tl);
    return tl;
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

    const tl = timeline({
      autoplay: false,
      begin: callbacks?.onBegin,
      update: (anim) => {
        this.globalTime = anim.currentTime;
        callbacks?.onUpdate?.(anim.progress);
      },
      complete: callbacks?.onComplete
    });

    const staggerConfig: any = { from };
    if (grid) staggerConfig.grid = grid;
    if (direction === 'reverse') staggerConfig.direction = 'reverse';

    tl.add({
      targets,
      ...properties,
      delay: stagger(delay, staggerConfig),
      easing: properties.ease || 'easeOutExpo'
    });

    this.timelines.push(tl);
    return tl;
  }

  createMasterTimeline(childTimelines: any[], callbacks?: TimelineCallbacks): any {
    const masterTl = timeline({
      autoplay: false,
      begin: callbacks?.onBegin,
      update: (anim) => {
        this.globalTime = anim.currentTime;
        callbacks?.onUpdate?.(anim.progress);
      },
      complete: callbacks?.onComplete
    });

    childTimelines.forEach((childTl, index) => {
      masterTl.add({
        targets: {},
        duration: 1,
        begin: () => {
          childTl.play();
        }
      }, index * 500); // Offset each child timeline by 500ms
    });

    this.timelines.push(masterTl);
    return masterTl;
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
    const tl = timeline({
      autoplay: false,
      begin: callbacks?.onBegin,
      update: (anim) => {
        this.globalTime = anim.currentTime;
        callbacks?.onUpdate?.(anim.progress);
      },
      complete: callbacks?.onComplete
    });

    animationGroups.forEach((group) => {
      const animation = {
        targets: group.targets,
        ...group.properties,
        duration: group.duration || 1000,
        easing: group.properties.ease || 'easeOutExpo'
      };

      tl.add(animation, group.syncPoint || 0);
    });

    this.timelines.push(tl);
    return tl;
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
    const masterTl = timeline({
      autoplay: false,
      begin: callbacks?.onBegin,
      update: (anim) => {
        this.globalTime = anim.currentTime;
        callbacks?.onUpdate?.(anim.progress);
      },
      complete: callbacks?.onComplete
    });

    let currentTime = 0;

    scenes.forEach((scene, sceneIndex) => {
      // Scene enter callback
      if (scene.onEnter) {
        masterTl.add({
          targets: {},
          duration: 1,
          begin: scene.onEnter
        }, currentTime);
      }

      // Scene animations
      const sceneTl = timeline({ autoplay: false });
      scene.animations.forEach((step) => {
        sceneTl.add({
          targets: step.target,
          ...step.properties,
          duration: step.duration || 1000,
          delay: step.delay || 0,
          easing: step.ease || 'easeOutExpo'
        }, step.offset || 0);
      });

      masterTl.add({
        targets: {},
        duration: scene.duration,
        begin: () => sceneTl.play()
      }, currentTime);

      // Scene exit callback
      if (scene.onExit) {
        masterTl.add({
          targets: {},
          duration: 1,
          begin: scene.onExit
        }, currentTime + scene.duration);
      }

      currentTime += scene.duration;
    });

    this.timelines.push(masterTl);
    return masterTl;
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

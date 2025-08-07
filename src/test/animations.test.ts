import { AnimationController } from '@/lib/animations';

describe('AnimationController', () => {
  let animationController: AnimationController;

  beforeEach(() => {
    animationController = new AnimationController();
  });

  afterEach(() => {
    animationController.cleanup();
  });

  test('should create AnimationController instance', () => {
    expect(animationController).toBeInstanceOf(AnimationController);
  });

  test('should have fadeIn method', () => {
    expect(typeof animationController.fadeIn).toBe('function');
  });

  test('should have slideIn method', () => {
    expect(typeof animationController.slideIn).toBe('function');
  });

  test('should have staggeredReveal method', () => {
    expect(typeof animationController.staggeredReveal).toBe('function');
  });

  test('should have hoverEffect method', () => {
    expect(typeof animationController.hoverEffect).toBe('function');
  });

  test('should have cleanup method', () => {
    expect(typeof animationController.cleanup).toBe('function');
  });
});

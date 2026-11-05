import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * Initializes Lenis smooth scrolling and binds it with GSAP ScrollTrigger.
 * Respects prefers-reduced-motion by disabling smooth wheel scrolling.
 */
export function initScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    autoRaf: false,
    smoothWheel: !prefersReducedMotion,
  });

  // Keep ScrollTrigger informed of Lenis scroll position
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Drive Lenis via GSAP ticker
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  // Turn off GSAP lag smoothing for tight scroll lockstep
  gsap.ticker.lagSmoothing(0);

  // Listen to OS reduced motion preference changes
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', (event) => {
    if (lenisInstance) {
      lenisInstance.options.smoothWheel = !event.matches;
    }
  });

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

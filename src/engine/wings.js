import gsap from 'gsap';
import { getLenis } from './scroll.js';

// Kinematic scale boundaries
const IDLE_TIMESCALE = 0.3;
const MAX_TIMESCALE = 1.8;

// Shared registry of active butterflies
const registeredButterflies = new Set();

let smoothedVelocity = 0;
let currentTimeScale = IDLE_TIMESCALE;
let isTickerInitialized = false;

/**
 * Initializes the single shared GSAP ticker callback for all butterflies.
 * Primary velocity source is lenis.velocity, smoothed with a lerp.
 */
function ensureSharedTicker() {
  if (isTickerInitialized) return;
  isTickerInitialized = true;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  gsap.ticker.add(() => {
    const isReducedMotion = motionQuery.matches;

    if (isReducedMotion) {
      currentTimeScale = IDLE_TIMESCALE;
    } else {
      const lenis = getLenis();
      // Primary source: lenis.velocity
      const rawVelocity = Math.abs(lenis ? lenis.velocity : 0);

      // Responsive lerp to smooth out frame-by-frame spikes
      smoothedVelocity += (rawVelocity - smoothedVelocity) * 0.12;

      // Map smoothed velocity to timeScale (0.3 idle up to 1.8 peak)
      const targetTimeScale = Math.min(
        MAX_TIMESCALE,
        Math.max(IDLE_TIMESCALE, IDLE_TIMESCALE + smoothedVelocity * 0.12)
      );

      // Smooth damping back to idle when scrolling stops (decay half-life ~0.2s)
      const dampFactor = targetTimeScale < currentTimeScale ? 0.08 : 0.16;
      currentTimeScale += (targetTimeScale - currentTimeScale) * dampFactor;
    }

    // Apply the synchronized timeScale to all registered active butterflies
    for (const butterfly of registeredButterflies) {
      if (butterfly.state === 'normal') {
        butterfly.wingTimeline.timeScale(currentTimeScale);
      } else if (butterfly.state === 'injured') {
        butterfly.wingTimeline.timeScale(0.12); // Weak, faint spasms
      }
    }
  });
}

/**
 * Creates and registers an articulated butterfly instance.
 * Uses scaleX only for wing flaps. Animate only transform and opacity.
 *
 * @param {Element|string} rootElement - SVG group element of the butterfly
 * @param {Object} options - Configuration options
 * @returns {Object} Butterfly instance controller
 */
export function createButterfly(rootElement, options = {}) {
  const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
  if (!root) {
    console.warn(`[Wings] Root element not found: ${rootElement}`);
    return null;
  }

  ensureSharedTicker();

  const leftWing = root.querySelector('.wing-left') || root.querySelector('#wing-left');
  const rightWing = root.querySelector('.wing-right') || root.querySelector('#wing-right');
  const floatGroup = root.querySelector('.butterfly-float') || root;

  // Set transform origins at body hinge axis (0, 0)
  if (leftWing) gsap.set(leftWing, { transformOrigin: '0px 0px' });
  if (rightWing) gsap.set(rightWing, { transformOrigin: '0px 0px' });

  // 1. Wing flap animation using scaleX only (no 3D, no filters)
  const wingTimeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
  });

  if (leftWing && rightWing) {
    wingTimeline.to([leftWing, rightWing], {
      scaleX: 0.18,
      duration: 0.3,
      ease: 'sine.inOut',
    });
  }

  wingTimeline.timeScale(IDLE_TIMESCALE);

  // 2. Gentle idle float (small y and rotation sine drift, transform only)
  // Runs continuously even when user is not scrolling
  const floatTween = gsap.to(floatGroup, {
    y: '+=10',
    rotation: 3,
    duration: 2.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  const butterflyRecord = {
    root,
    leftWing,
    rightWing,
    floatGroup,
    wingTimeline,
    floatTween,
    state: 'normal',
    setState(newState) {
      this.state = newState;
      if (newState === 'injured') {
        wingTimeline.timeScale(0.12);
        floatTween.pause();
      } else {
        wingTimeline.timeScale(currentTimeScale);
        floatTween.play();
      }
    },
    destroy() {
      wingTimeline.kill();
      floatTween.kill();
      registeredButterflies.delete(this);
    },
  };

  registeredButterflies.add(butterflyRecord);
  return butterflyRecord;
}

/**
 * Returns current wing timeScale for Debug HUD telemetry.
 */
export function getWingTimeScale() {
  return currentTimeScale;
}

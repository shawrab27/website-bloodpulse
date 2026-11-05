import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE master GSAP timeline, paused and scrubbed across the full scroll distance.
 * 9 labels (s1 through s9) are placed at equal spacing.
 * Scenes hook their tweens to this timeline relative to their labels.
 */
export const masterTimeline = gsap.timeline({
  paused: true,
  defaults: {
    ease: 'none',
  },
});

export const SCENE_LABELS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'];

// Add labels s1..s9 at equal intervals (0 to 8)
SCENE_LABELS.forEach((label, index) => {
  masterTimeline.addLabel(label, index);
});

// Spacer tween maintains timeline duration until scenes add tweens
masterTimeline.to({}, { duration: SCENE_LABELS.length - 1 }, 0);

let masterScrollTrigger = null;

/**
 * Initializes ScrollTrigger scrub for the master timeline.
 * Respects prefers-reduced-motion (disables scrub).
 */
export function initMasterTimeline() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  masterScrollTrigger = ScrollTrigger.create({
    animation: masterTimeline,
    trigger: '#scroll-track',
    start: 'top top',
    end: 'bottom bottom',
    scrub: prefersReducedMotion ? false : true,
    invalidateOnRefresh: true,
  });

  // Dynamically update scrub if reduced motion preference changes
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', (event) => {
    if (masterScrollTrigger) {
      masterScrollTrigger.vars.scrub = event.matches ? false : true;
      masterScrollTrigger.refresh();
    }
  });

  return masterTimeline;
}

/**
 * Returns current active label based on timeline progress.
 */
export function getCurrentLabel() {
  const time = masterTimeline.time();
  for (let i = SCENE_LABELS.length - 1; i >= 0; i--) {
    if (time >= i - 0.05) {
      return SCENE_LABELS[i];
    }
  }
  return SCENE_LABELS[0];
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE master GSAP timeline, paused and scrubbed across the full scroll distance.
 * 9 labels (s1 through s9) are placed at equal spacing.
 * Scenes will hook their tweens to this timeline in subsequent phases.
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

  // Phase 1 Test Scene: Butterfly 1 starts at center (960, 540)
  // During first 10% of scroll (time 0 to 0.8 of total duration 8), moves slowly downward
  const butterfly1 = document.getElementById('butterfly-1');
  if (butterfly1) {
    gsap.set(butterfly1, { x: 960, y: 540 });

    masterTimeline.to(
      butterfly1,
      {
        y: 660,
        duration: 0.8,
        ease: 'none',
      },
      0
    );
  }

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

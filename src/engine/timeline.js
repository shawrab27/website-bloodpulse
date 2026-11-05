import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE master GSAP timeline, ALWAYS paused and driven EXCLUSIVELY by ScrollTrigger scrub.
 * In every mode (normal and reduced-motion), this timeline NEVER autoplays or animates on its own.
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
 * ALWAYS uses scrub: true so progress is 100% tied to scroll distance in all modes.
 */
export function initMasterTimeline() {
  masterScrollTrigger = ScrollTrigger.create({
    animation: masterTimeline,
    trigger: '#scroll-track',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true, // Always true in every mode — never false, never autoplay
    invalidateOnRefresh: true,
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

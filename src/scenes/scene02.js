import gsap from 'gsap';

let sirenTween = null;

/**
 * Initializes continuous siren pulse animation (allowed un-scrolled animation).
 * Respects prefers-reduced-motion: flashes no faster than 1 per second.
 */
export function initSirenPulse() {
  const sirenGlow = document.getElementById('siren-glow');
  const sirenRing = document.getElementById('siren-ring');
  if (!sirenGlow || !sirenRing) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Under reduced-motion: <= 1 pulse per second (duration 0.6s each way = 1.2s cycle)
  const pulseDuration = prefersReducedMotion ? 0.6 : 0.2;

  if (sirenTween) sirenTween.kill();

  sirenTween = gsap.to([sirenGlow, sirenRing], {
    opacity: 0.9,
    duration: pulseDuration,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', (event) => {
    initSirenPulse();
  });
}

/**
 * Initializes Scene 02 (Accident):
 * - Butterfly 1 descends toward the ground line near y=900.
 * - Ambulance enters from the LEFT with siren light pulsing.
 * - Ambulance reaches butterfly and strikes it.
 * - Butterfly tilts, is pushed forward, then falls to ground.
 *
 * @param {gsap.core.Timeline} timeline - The global master timeline.
 */
export function initScene02(timeline) {
  const ambulance = document.getElementById('ambulance');
  const butterfly1 = document.getElementById('butterfly-1');
  const impactFlash = document.getElementById('impact-flash');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize un-scrolled siren pulse
  initSirenPulse();

  // 1. Butterfly 1 descends further toward street level before the strike
  timeline.to(
    butterfly1,
    {
      x: 880,
      y: 770,
      rotation: 2,
      duration: 0.5,
      ease: 'sine.inOut',
    },
    's2'
  );

  // 2. Ambulance rushes in from the LEFT (x < 0 to x: 440)
  timeline.fromTo(
    ambulance,
    { x: -600, y: 726 },
    {
      x: 440,
      y: 726,
      duration: 0.65,
      ease: 'power1.in',
    },
    's2'
  );

  // 3. Impact at s2+=0.65:
  if (impactFlash) {
    timeline.fromTo(
      impactFlash,
      { opacity: 0, scale: 0.8 },
      {
        opacity: prefersReducedMotion ? 0.3 : 0.6,
        scale: prefersReducedMotion ? 1.0 : 1.2,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      },
      's2+=0.65'
    );
  }

  // - Butterfly tilts and is pushed forward (gentle tilt in reduced-motion, no violent shake)
  timeline.to(
    butterfly1,
    {
      x: prefersReducedMotion ? 780 : 740,
      y: 750,
      rotation: prefersReducedMotion ? -12 : -40,
      duration: 0.12,
      ease: 'power2.out',
    },
    's2+=0.65'
  );

  // - Butterfly tumbles down toward the ground
  timeline.to(
    butterfly1,
    {
      x: 560,
      y: 880,
      rotation: prefersReducedMotion ? 25 : 55,
      duration: 0.23,
      ease: 'power2.in',
    },
    's2+=0.77'
  );

  // 4. Ambulance continues rolling through the impact
  timeline.to(
    ambulance,
    {
      x: 600,
      duration: 0.35,
      ease: 'none',
    },
    's2+=0.65'
  );
}

import gsap from 'gsap';

/**
 * Initializes Scene 02 (Accident):
 * - Butterfly 1 descends toward the ground line near y=900.
 * - Ambulance enters from the LEFT with red siren light pulsing.
 * - Ambulance reaches butterfly and strikes it.
 * - Small impact: butterfly tilts quickly, is pushed forward, then falls.
 *
 * @param {gsap.core.Timeline} timeline - The global master timeline.
 */
export function initScene02(timeline) {
  const ambulance = document.getElementById('ambulance');
  const sirenGlow = document.getElementById('siren-glow');
  const sirenRing = document.getElementById('siren-ring');
  const butterfly1 = document.getElementById('butterfly-1');
  const impactFlash = document.getElementById('impact-flash');

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

  // 3. Siren light pulsing (opacity only)
  timeline.to(
    [sirenGlow, sirenRing],
    {
      opacity: 1,
      duration: 0.09,
      repeat: 6,
      yoyo: true,
      ease: 'power1.inOut',
    },
    's2'
  );

  // 4. Impact at s2+=0.65:
  // - Subtle crimson impact flash
  if (impactFlash) {
    timeline.fromTo(
      impactFlash,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 0.6,
        scale: 1.2,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      },
      's2+=0.65'
    );
  }

  // - Butterfly tilts and is pushed forward
  timeline.to(
    butterfly1,
    {
      x: 740,
      y: 750,
      rotation: -40,
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
      rotation: 55,
      duration: 0.23,
      ease: 'power2.in',
    },
    's2+=0.77'
  );

  // 5. Ambulance continues rolling through the impact
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

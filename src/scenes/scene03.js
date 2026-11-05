import gsap from 'gsap';

/**
 * Initializes Scene 03 (Aftermath):
 * - Ambulance keeps driving and exits off-stage to the RIGHT (x > 1920).
 * - Butterfly 1 ends lying on the ground in the BOTTOM-LEFT area (x: 360, y: 885).
 * - Butterfly is tilted with wings moving very weakly (injured state).
 * - Final frame: calm empty street with butterfly 1 lying down (ready for Scene 4).
 *
 * @param {gsap.core.Timeline} timeline - The global master timeline.
 */
export function initScene03(timeline) {
  const ambulance = document.getElementById('ambulance');
  const sirenGlow = document.getElementById('siren-glow');
  const sirenRing = document.getElementById('siren-ring');
  const butterfly1 = document.getElementById('butterfly-1');

  // 1. Ambulance speeds off to the RIGHT, exiting the 1920x1080 stage completely
  timeline.to(
    ambulance,
    {
      x: 2200,
      duration: 1.0,
      ease: 'power1.out',
    },
    's3'
  );

  // 2. Siren light fades out into the distance
  timeline.to(
    [sirenGlow, sirenRing],
    {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.out',
    },
    's3'
  );

  // 3. Butterfly 1 slides and settles into the bottom-left corner of the stage
  timeline.to(
    butterfly1,
    {
      x: 360,
      y: 885,
      rotation: 70,
      duration: 0.45,
      ease: 'power1.out',
    },
    's3'
  );
}

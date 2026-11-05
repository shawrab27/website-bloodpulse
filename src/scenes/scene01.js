import gsap from 'gsap';

/**
 * Initializes Scene 01 (Normalcy):
 * - Butterfly 1 in stage center with slow idle flapping.
 * - BloodPulse logo and 3 CTA buttons near bottom.
 * - On first scroll, hero text and buttons fade out.
 * - Butterfly 1 gently begins descending toward street level.
 *
 * @param {gsap.core.Timeline} timeline - The global master timeline.
 */
export function initScene01(timeline) {
  const butterfly1 = document.getElementById('butterfly-1');
  const heroOverlay = document.getElementById('scene-01-hero');
  const groundLine = document.getElementById('ground-line');
  const stageBg = document.getElementById('stage-bg-rect');
  const ambulance = document.getElementById('ambulance');

  // Set initial spatial coordinates
  if (butterfly1) {
    gsap.set(butterfly1, { x: 960, y: 540, rotation: 0, opacity: 1 });
  }

  if (ambulance) {
    // Hidden beyond stage left before Scene 2 entry
    gsap.set(ambulance, { x: -600, y: 726, opacity: 1 });
  }

  if (heroOverlay) {
    gsap.set(heroOverlay, { opacity: 1 });
  }

  if (groundLine) {
    gsap.set(groundLine, { opacity: 0 });
  }

  // 1. On first scroll, logo and CTA buttons fade out (opacity only)
  timeline.to(
    heroOverlay,
    {
      opacity: 0,
      duration: 0.45,
      ease: 'power1.out',
    },
    's1'
  );

  // 2. Subtle background tint transition toward soft grey-pink street tone
  if (stageBg) {
    timeline.to(
      stageBg,
      {
        fill: '#FFF1F0',
        duration: 0.5,
        ease: 'power1.out',
      },
      's1+=0.45'
    );
  }

  // 3. Ground line fades in as perspective shifts toward street level
  if (groundLine) {
    timeline.to(
      groundLine,
      {
        opacity: 0.45,
        duration: 0.5,
        ease: 'power1.out',
      },
      's1+=0.45'
    );
  }

  // 4. Butterfly 1 drifts downward toward street level (transitioning to Scene 2 entry)
  timeline.to(
    butterfly1,
    {
      x: 920,
      y: 720,
      rotation: -5,
      duration: 0.55,
      ease: 'sine.inOut',
    },
    's1+=0.45'
  );
}

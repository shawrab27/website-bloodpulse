import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import screenBloodhubUrl from '../assets/img/screen-bloodhub.webp';

gsap.registerPlugin(MotionPathPlugin);

let isImagePreloaded = false;

/**
 * Lazy-loads the WebP screenshot into the SVG image tag when scroll nears Scene 4.
 */
export function preloadScreenBloodhub() {
  if (isImagePreloaded) return;
  const imageElement = document.getElementById('phone-screen-image');
  if (imageElement) {
    imageElement.setAttribute('href', screenBloodhubUrl);
    isImagePreloaded = true;
  }
}

/**
 * Initializes Scene 04 (Witness Arrival):
 * - Start frame: Empty calm street, Butterfly 1 lying injured bottom-left (x: 360, y: 885).
 * - Butterfly 2 enters from the TOP (y < 0) along a graceful curved trajectory.
 * - Decelerates and hovers gently near Butterfly 1, tilting toward it in concern.
 * - Butterfly 1 remains resting on the ground with weak spasms.
 *
 * @param {gsap.core.Timeline} timeline - The global master timeline.
 */
export function initScene04(timeline) {
  const butterfly2 = document.getElementById('butterfly-2');
  if (!butterfly2) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initial offscreen position above the stage
  gsap.set(butterfly2, { x: 720, y: -120, rotation: -10, opacity: 0 });

  // 1. Lazy-load WebP screenshot when approaching Scene 4
  timeline.call(preloadScreenBloodhub, null, 's4-=0.2');

  // 2. Butterfly 2 enters and swoops down along a smooth curved path
  timeline.to(
    butterfly2,
    {
      opacity: 1,
      duration: 0.15,
      ease: 'power1.out',
    },
    's4'
  );

  if (prefersReducedMotion) {
    // Accessible fade & slide without complex curved motion
    timeline.to(
      butterfly2,
      {
        x: 450,
        y: 810,
        rotation: -25,
        duration: 0.8,
        ease: 'power1.out',
      },
      's4'
    );
  } else {
    // Organic curved entry using MotionPath
    timeline.to(
      butterfly2,
      {
        motionPath: {
          path: [
            { x: 720, y: -120 },
            { x: 620, y: 340 },
            { x: 520, y: 640 },
            { x: 450, y: 810 },
          ],
          curviness: 1.2,
          autoRotate: false,
        },
        rotation: -26,
        duration: 0.75,
        ease: 'power1.out',
      },
      's4'
    );
  }

  // 3. Hovers gently close to Butterfly 1, tilting toward it
  timeline.to(
    butterfly2,
    {
      x: 445,
      y: 805,
      rotation: -30,
      duration: 0.25,
      ease: 'sine.inOut',
    },
    's4+=0.75'
  );
}

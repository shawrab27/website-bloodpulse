import gsap from 'gsap';
import { preloadScreenBloodhub } from './scene04.js';

/**
 * NAMED ADJUSTABLE CONSTANTS:
 * Coordinates where Butterfly 2 hovers in front of the phone next to the "Search for Donor" card.
 * Phone center x is ~1150 (bounds: x=948 to 1352, y=110 to 970, height=860).
 */
export const SEARCH_DONOR_HOVER_X = 930;
export const SEARCH_DONOR_HOVER_Y = 510;
export const SEARCH_DONOR_ROTATION = 8;

/**
 * Initializes Scene 05 (The Digital Lifeline):
 * - Start frame: Butterfly 1 bottom-left (360, 885), Butterfly 2 near it (445, 805).
 * - Smartphone chassis elevates from below the stage (y: 1200 -> 110) to center-right.
 * - Screen shows the real app WebP (BloodPulse top bar & 3 segments: Search for Donor, Emergency Blood, Blood Campaigns).
 * - Butterfly 2 flies up and hovers next to the "Search for Donor" segment.
 * - Butterfly 1 remains visible on the ground in the bottom-left.
 *
 * @param {gsap.core.Timeline} timeline - The global master timeline.
 */
export function initScene05(timeline) {
  const phone = document.getElementById('phone-container');
  const butterfly2 = document.getElementById('butterfly-2');

  // Ensure image is loaded
  preloadScreenBloodhub();

  // Set initial position of phone below the canvas
  if (phone) {
    gsap.set(phone, { x: 948, y: 1200, opacity: 1 });
  }

  // 1. Phone rises from below the stage to center-right (center x=1150, height=860)
  if (phone) {
    timeline.to(
      phone,
      {
        y: 110,
        duration: 0.7,
        ease: 'power2.out',
      },
      's5'
    );
  }

  // 2. Butterfly 2 ascends in front of the phone, positioning beside the "Search for Donor" card
  if (butterfly2) {
    timeline.to(
      butterfly2,
      {
        x: SEARCH_DONOR_HOVER_X,
        y: SEARCH_DONOR_HOVER_Y,
        rotation: SEARCH_DONOR_ROTATION,
        duration: 0.75,
        ease: 'sine.inOut',
      },
      's5+=0.2'
    );

    // Subtle gentle hovering drift beside the card through the end of s5
    timeline.to(
      butterfly2,
      {
        y: '+=6',
        rotation: SEARCH_DONOR_ROTATION - 3,
        duration: 0.25,
        ease: 'sine.inOut',
      },
      's5+=0.75'
    );
  }
}

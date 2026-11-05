import gsap from 'gsap';
import { masterTimeline, getCurrentLabel } from './timeline.js';
import { getLenis } from './scroll.js';

/**
 * Debug HUD:
 * Toggled with key 'D' (hidden by default).
 * Displays scroll progress %, current active label, FPS, and scroll velocity.
 */
export function initDebugHud() {
  const hud = document.getElementById('debug-hud');
  if (!hud) return;

  const valProgress = document.getElementById('hud-progress');
  const valLabel = document.getElementById('hud-label');
  const valFps = document.getElementById('hud-fps');
  const valVelocity = document.getElementById('hud-velocity');

  // Toggle HUD with 'D' key
  window.addEventListener('keydown', (event) => {
    // Avoid toggling when user types in inputs or textareas
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

    if (event.key === 'd' || event.key === 'D') {
      hud.classList.toggle('hud-hidden');
    }
  });

  // Track FPS
  let frames = 0;
  let lastTime = performance.now();
  let currentFps = 60;

  gsap.ticker.add(() => {
    // Only update DOM if HUD is visible
    if (hud.classList.contains('hud-hidden')) return;

    frames++;
    const now = performance.now();
    if (now - lastTime >= 500) {
      currentFps = Math.round((frames * 1000) / (now - lastTime));
      frames = 0;
      lastTime = now;
    }

    // Scroll progress %
    const progress = masterTimeline.progress();
    if (valProgress) {
      valProgress.textContent = `${(progress * 100).toFixed(1)}%`;
    }

    // Current scene label
    if (valLabel) {
      valLabel.textContent = getCurrentLabel();
    }

    // FPS
    if (valFps) {
      valFps.textContent = `${currentFps}`;
    }

    // Scroll velocity from Lenis
    const lenis = getLenis();
    if (valVelocity) {
      const velocity = lenis ? Math.round(lenis.velocity) : 0;
      valVelocity.textContent = `${velocity} px/s`;
    }
  });
}

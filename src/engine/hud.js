import gsap from 'gsap';
import { masterTimeline, getCurrentLabel } from './timeline.js';
import { getLenis } from './scroll.js';
import { getWing1TimeScale, getWing2TimeScale } from './wings.js';

/**
 * Debug HUD:
 * Toggled with key 'D' (hidden by default).
 * Displays scroll progress %, current active label, FPS, scroll velocity, wing speeds,
 * and autoplay check status.
 */
export function initDebugHud() {
  const hud = document.getElementById('debug-hud');
  if (!hud) return;

  const valProgress = document.getElementById('hud-progress');
  const valLabel = document.getElementById('hud-label');
  const valFps = document.getElementById('hud-fps');
  const valVelocity = document.getElementById('hud-velocity');
  const valWings = document.getElementById('hud-wings');
  const valWings2 = document.getElementById('hud-wings-2');
  const valAutoplay = document.getElementById('hud-autoplay');

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

  // Autoplay check tracking
  let lastProgress = masterTimeline.progress();
  let progressStableSince = performance.now();
  let isAutoplayFailing = false;

  gsap.ticker.add(() => {
    const lenis = getLenis();
    const velocity = lenis ? Math.abs(lenis.velocity) : 0;
    const progress = masterTimeline.progress();
    const now = performance.now();

    // Check if progress changed while scroll velocity is zero
    const progressDelta = Math.abs(progress - lastProgress);
    const isStationary = velocity < 0.1;

    if (isStationary) {
      if (progressDelta > 0.0001) {
        // Progress changed without scroll velocity -> Autoplay detected!
        isAutoplayFailing = true;
        progressStableSince = now;
      } else if (now - progressStableSince >= 2000) {
        // Has remained unchanged for at least 2 full seconds while velocity is 0
        isAutoplayFailing = false;
      }
    } else {
      // User is scrolling
      progressStableSince = now;
    }

    lastProgress = progress;

    // Only update DOM if HUD is visible
    if (hud.classList.contains('hud-hidden')) return;

    frames++;
    if (now - lastTime >= 500) {
      currentFps = Math.round((frames * 1000) / (now - lastTime));
      frames = 0;
      lastTime = now;
    }

    // Scroll progress %
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
    if (valVelocity) {
      valVelocity.textContent = `${Math.round(velocity)} px/s`;
    }

    // Wing flapping timeScales
    if (valWings) {
      valWings.textContent = `${getWing1TimeScale().toFixed(2)}x`;
    }
    if (valWings2) {
      valWings2.textContent = `${getWing2TimeScale().toFixed(2)}x`;
    }

    // Autoplay Check
    if (valAutoplay) {
      if (isAutoplayFailing) {
        valAutoplay.textContent = 'FAIL';
        valAutoplay.style.color = '#EF4444';
      } else {
        valAutoplay.textContent = 'OK';
        valAutoplay.style.color = '#4ADE80';
      }
    }
  });
}

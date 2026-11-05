import gsap from 'gsap';

export const mm = gsap.matchMedia();

/**
 * Calculates and updates the CSS variable --stage-scale to fit 1920x1080 design canvas.
 */
export function updateStageScale() {
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  document.documentElement.style.setProperty('--stage-scale', scale.toString());
}

/**
 * Sets up gsap.matchMedia with desktop, tablet, and mobile breakpoints.
 * Desktop runs full interactive stage.
 * Tablet and Mobile display a clean "coming soon" message for Phase 0.
 */
export function initDeviceBreakpoints() {
  // Initial scale calculation & resize binding
  updateStageScale();
  window.addEventListener('resize', updateStageScale);

  const fallbackEl = document.getElementById('device-fallback');
  const stageViewportEl = document.getElementById('stage-viewport');
  const fallbackTextEl = fallbackEl ? fallbackEl.querySelector('.fallback-text') : null;

  mm.add(
    {
      isDesktop: '(min-width: 1024px)',
      isTablet: '(min-width: 600px) and (max-width: 1023px)',
      isMobile: '(max-width: 599px)',
    },
    (context) => {
      const { isDesktop, isTablet, isMobile } = context.conditions;

      if (isDesktop) {
        if (fallbackEl) fallbackEl.style.display = 'none';
        if (stageViewportEl) stageViewportEl.style.display = 'flex';
      } else {
        // Tablet or Mobile fallback
        if (stageViewportEl) stageViewportEl.style.display = 'none';
        if (fallbackEl) {
          fallbackEl.style.display = 'flex';
          const deviceName = isTablet ? 'Tablet' : 'Mobile';
          if (fallbackTextEl) {
            fallbackTextEl.textContent = `${deviceName} experience is coming soon. Please explore on a desktop display (1024px+).`;
          }
        }
      }
    }
  );

  return mm;
}

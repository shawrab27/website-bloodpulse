import './styles/tokens.css';
import './styles/base.css';
import './styles/stage.css';

import { initScroll } from './engine/scroll.js';
import { initMasterTimeline } from './engine/timeline.js';
import { initDeviceBreakpoints } from './engine/device.js';
import { initDebugHud } from './engine/hud.js';
import { createButterfly } from './engine/wings.js';

// Initialize core engine
document.addEventListener('DOMContentLoaded', () => {
  initScroll();
  initMasterTimeline();
  initDeviceBreakpoints();
  initDebugHud();

  // Initialize Butterfly 1 with velocity-coupled wing kinematics and idle float
  const butterfly1 = createButterfly('#butterfly-1');

  console.log('BloodPulse website engine initialized [Phase 1]. Press "D" to toggle Debug HUD.');
});
